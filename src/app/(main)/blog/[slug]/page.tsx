import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, Facebook, Twitter, Linkedin, BookmarkPlus } from 'lucide-react';

// Sample blog posts data
const blogPosts: Record<string, {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorImage: string;
  publishedAt: string;
  readTime: string;
}> = {
  'best-time-northern-lights-iceland': {
    id: '1',
    slug: 'best-time-northern-lights-iceland',
    title: 'The Best Time to See Northern Lights in Iceland',
    excerpt: 'Planning to chase the Aurora Borealis? Learn when and where to see the magical Northern Lights during your Iceland visit.',
    content: `
# The Best Time to See Northern Lights in Iceland

The Northern Lights, or Aurora Borealis, are one of nature's most spectacular displays. Iceland is one of the best places in the world to witness this phenomenon, thanks to its location just below the Arctic Circle and its dark winter skies.

## When to See Northern Lights

The Northern Lights season in Iceland runs from **September to mid-April**. During these months, the nights are dark enough to see the aurora when it appears.

### Best Months
- **September-October**: Autumn equinox brings longer nights
- **February-March**: Statistically high aurora activity
- **December-January**: Longest nights, but often cloudy

## Best Viewing Conditions

To see the Northern Lights, you need:
1. **Dark skies** - Away from city lights
2. **Clear weather** - No clouds blocking the view
3. **Solar activity** - Check the KP index (3+ is good)

## Best Locations in Iceland

### Near Reykjavik
- Grótta Lighthouse
- Seltjarnarnes Peninsula
- Kleifarvatn Lake

### Further Afield
- Thingvellir National Park (30 min from Reykjavik)
- Vik (South Coast)
- Jökulsárlón Glacier Lagoon

## Our Northern Lights Tours

At PrimeTaxi & Tours, we offer private Northern Lights hunting tours with experienced local guides who know the best spots and monitor conditions closely.

**Tour Highlights:**
- Professional aurora-hunting guides
- Warm, comfortable vehicles
- Hot chocolate and blankets provided
- Photography tips and assistance
- Multiple location visits if needed
- Flexible departure based on conditions

Book your private Northern Lights tour today and maximize your chances of witnessing this incredible natural phenomenon!
    `,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk0iDzJFS5IZBLpTWewxYw5leR1y4O_MbUU9RqbyLUXfcDTSHIl9UvOKrkFzRPhKW93Ymc7cqjsAKqXnhU9ANQYFVqes9U79cSo5651HXzfZui3bXewJwgDMmnM9waJ7KMi1FqJH4parVXHGn6TZX_OY8FMzQ6YPGc2Tt88nEHQAj_yacHyR3o-WfEsWvurjLI_bKTKYszNFsBGsDqCcKPb-F7CZVemjISx36raDWENU0D_3FG5_jDaJTKjjx1kvmldOsntIBJ5ys1',
    category: 'Travel Tips',
    author: 'Jónas Gunnarsson',
    authorImage: '',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
  },
  'golden-circle-complete-guide': {
    id: '2',
    slug: 'golden-circle-complete-guide',
    title: 'The Complete Guide to Iceland\'s Golden Circle',
    excerpt: 'Everything you need to know about visiting Thingvellir, Geysir, and Gullfoss - Iceland\'s most famous attractions.',
    content: `
# The Complete Guide to Iceland's Golden Circle

The Golden Circle is Iceland's most popular tourist route, and for good reason. This 300km loop from Reykjavik takes you through some of the country's most stunning landscapes and historically significant sites.

## The Three Main Stops

### 1. Thingvellir National Park (UNESCO World Heritage Site)

Thingvellir holds immense historical and geological significance:
- **Historical**: Site of the world's oldest parliament (Althing), founded in 930 AD
- **Geological**: Where the North American and Eurasian tectonic plates meet
- **Natural Beauty**: Beautiful lake, waterfalls, and walking trails

**Time needed**: 1-2 hours minimum

### 2. Geysir Geothermal Area

Home to the original geyser that gave its name to all others:
- **Strokkur**: Erupts every 5-10 minutes, shooting water 20-40 meters high
- **Geysir**: The original, now mostly dormant
- **Hot springs**: Colorful bubbling pools throughout the area

**Time needed**: 30-60 minutes

### 3. Gullfoss Waterfall

One of Iceland's most powerful and beautiful waterfalls:
- **Two-tiered cascade**: Drops 32 meters into a dramatic canyon
- **Viewing platforms**: Multiple levels for different perspectives
- **Rainbow sightings**: Common on sunny days

**Time needed**: 30-60 minutes

## Tips for Your Visit

### Self-Drive vs. Tour
- **Self-drive**: Flexibility to explore at your own pace
- **Private tour**: Local knowledge, comfort, no driving stress

### Best Time to Visit
- **Summer**: Midnight sun, green landscapes
- **Winter**: Fewer crowds, possible Northern Lights

## Book Your Golden Circle Tour

Our private Golden Circle tours offer:
- Door-to-door pickup from your accommodation
- Knowledgeable local driver-guides
- Flexible itinerary based on your interests
- Comfortable, modern vehicles
- All-day adventure (8 hours)

Experience the Golden Circle in comfort and style with PrimeTaxi & Tours!
    `,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    category: 'Destinations',
    author: 'Sigríður Ólafsdóttir',
    authorImage: '',
    publishedAt: '2024-01-10',
    readTime: '8 min read',
  },
};

// Generate static params for known slugs
export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = Object.values(blogPosts)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[400px] lg:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full mb-4">
              <Tag className="size-3" />
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-slate-600 flex items-center justify-center">
                  <User className="size-4 text-white" />
                </div>
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-8">
            {/* Share Sidebar */}
            <aside className="hidden lg:flex flex-col gap-3 sticky top-24 h-fit">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Share</span>
              <button className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="size-4" />
              </button>
              <button className="size-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Twitter className="size-4" />
              </button>
              <button className="size-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                <Linkedin className="size-4" />
              </button>
              <button className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                <BookmarkPlus className="size-4" />
              </button>
            </aside>

            {/* Article Content */}
            <article className="flex-1 prose prose-lg dark:prose-invert max-w-none">
              <div
                className="text-slate-700 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />').replace(/^# (.*)$/gm, '<h1 class="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">$1</h1>').replace(/^## (.*)$/gm, '<h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">$1</h2>').replace(/^### (.*)$/gm, '<h3 class="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>').replace(/^- (.*)$/gm, '<li class="ml-4">$1</li>') }}
              />
            </article>
          </div>

          {/* Mobile Share */}
          <div className="lg:hidden flex items-center justify-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <span className="text-sm font-medium text-slate-500">Share:</span>
            <button className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Facebook className="size-4" />
            </button>
            <button className="size-10 rounded-full bg-sky-500 text-white flex items-center justify-center">
              <Twitter className="size-4" />
            </button>
            <button className="size-10 rounded-full bg-blue-700 text-white flex items-center justify-center">
              <Linkedin className="size-4" />
            </button>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-primary rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-black mb-2">Ready to Explore Iceland?</h3>
            <p className="text-slate-800 mb-6">Book your private tour or transfer with us today.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/booking"
                className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Book Now
              </Link>
              <Link
                href="/tours"
                className="px-6 py-3 bg-white/30 text-black font-bold rounded-xl hover:bg-white/50 transition-colors"
              >
                View Tours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 px-4 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">{relatedPost.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
