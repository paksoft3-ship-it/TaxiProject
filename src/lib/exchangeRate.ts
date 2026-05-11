import { prisma } from '@/lib/db';

const CACHE_KEY_RATE = 'exchange_rate_isk_eur';
const CACHE_KEY_UPDATED_AT = 'exchange_rate_isk_eur_updated_at';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const FALLBACK_RATE = parseFloat(process.env.PAYPAL_ISK_TO_EUR_RATE || '150');

/**
 * Returns how many ISK equal 1 EUR, using a DB-cached rate from the ECB
 * (via Frankfurter). Refreshes at most once per hour. Falls back to the
 * PAYPAL_ISK_TO_EUR_RATE env var or 150 if the API is unreachable.
 */
export async function getISKtoEURRate(): Promise<number> {
  try {
    const [rateSetting, updatedAtSetting] = await Promise.all([
      prisma.setting.findUnique({ where: { key: CACHE_KEY_RATE } }),
      prisma.setting.findUnique({ where: { key: CACHE_KEY_UPDATED_AT } }),
    ]);

    const cachedRate = rateSetting ? parseFloat(rateSetting.value) : null;
    const lastUpdated = updatedAtSetting ? parseInt(updatedAtSetting.value, 10) : 0;
    const isStale = Date.now() - lastUpdated > CACHE_TTL_MS;

    if (cachedRate && !isStale) {
      return cachedRate;
    }

    const freshRate = await fetchFrankfurterRate();
    if (freshRate) {
      await upsertRateCache(freshRate);
      return freshRate;
    }

    // API failed — return stale cached value if available, else fallback
    return cachedRate ?? FALLBACK_RATE;
  } catch {
    return FALLBACK_RATE;
  }
}

async function fetchFrankfurterRate(): Promise<number | null> {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=EUR&to=ISK', {
      next: { revalidate: 0 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const rate = data?.rates?.ISK;
    return typeof rate === 'number' && rate > 0 ? rate : null;
  } catch {
    return null;
  }
}

async function upsertRateCache(rate: number): Promise<void> {
  const now = Date.now().toString();
  await Promise.all([
    prisma.setting.upsert({
      where: { key: CACHE_KEY_RATE },
      update: { value: rate.toString() },
      create: { key: CACHE_KEY_RATE, value: rate.toString() },
    }),
    prisma.setting.upsert({
      where: { key: CACHE_KEY_UPDATED_AT },
      update: { value: now },
      create: { key: CACHE_KEY_UPDATED_AT, value: now },
    }),
  ]);
}
