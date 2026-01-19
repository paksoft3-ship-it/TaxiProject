'use client';

import { useState } from 'react';
import {
  Settings,
  Building2,
  CreditCard,
  Bell,
  Mail,
  Globe,
  Shield,
  Palette,
  Save,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  Clock,
  Banknote,
  Percent,
  Users,
  Car,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SettingsTab = 'general' | 'pricing' | 'notifications' | 'appearance';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Form state
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'PrimeTaxi & Tours',
    email: 'info@primetaxi.is',
    phone: '+354 555 0000',
    address: 'Laugavegur 1, 101 Reykjavík, Iceland',
    timezone: 'Atlantic/Reykjavik',
    currency: 'ISK',
    language: 'en',
  });

  const [pricingSettings, setPricingSettings] = useState({
    baseTaxiFare: 2500,
    perKmRate: 350,
    waitingPerMinute: 100,
    airportSurcharge: 1500,
    nightSurcharge: 20,
    weekendSurcharge: 15,
    minBookingAmount: 3000,
    cancellationFee: 5000,
    tourDepositPercent: 30,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNewBooking: true,
    emailBookingConfirmed: true,
    emailBookingCancelled: true,
    emailPaymentReceived: true,
    smsNewBooking: false,
    smsDriverAssigned: true,
    pushNewBooking: true,
    pushDriverNearby: true,
    dailySummary: true,
    weeklySummary: true,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system',
    primaryColor: '#f2cc0d',
    accentColor: '#1e293b',
    compactMode: false,
    showDriverPhotos: true,
  });

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const tabs = [
    { id: 'general' as const, label: 'General', icon: Building2 },
    { id: 'pricing' as const, label: 'Pricing', icon: CreditCard },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Settings
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage your application preferences and configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all',
            saveStatus === 'saved'
              ? 'bg-green-500 text-white'
              : 'bg-primary text-black hover:bg-yellow-400 shadow-primary/20'
          )}
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Saving...
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <Check className="size-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <nav className="lg:w-64 flex lg:flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left',
                activeTab === tab.id
                  ? 'bg-primary text-black shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700'
              )}
            >
              <tab.icon className="size-5" />
              <span className="flex-1">{tab.label}</span>
              <ChevronRight className={cn('size-4 hidden lg:block', activeTab === tab.id ? 'opacity-100' : 'opacity-0')} />
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Company Information</h3>
                <p className="text-sm text-slate-500">Basic information about your business</p>
              </div>

              <div className="grid gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Building2 className="size-4 text-slate-400" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.companyName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Mail className="size-4 text-slate-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={generalSettings.email}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Phone className="size-4 text-slate-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <MapPin className="size-4 text-slate-400" />
                    Business Address
                  </label>
                  <input
                    type="text"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Clock className="size-4 text-slate-400" />
                      Timezone
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    >
                      <option value="Atlantic/Reykjavik">Iceland (GMT+0)</option>
                      <option value="Europe/London">London (GMT+0/+1)</option>
                      <option value="Europe/Paris">Paris (GMT+1/+2)</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Banknote className="size-4 text-slate-400" />
                      Currency
                    </label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    >
                      <option value="ISK">ISK - Icelandic Króna</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Globe className="size-4 text-slate-400" />
                      Language
                    </label>
                    <select
                      value={generalSettings.language}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    >
                      <option value="en">English</option>
                      <option value="is">Íslenska</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Settings */}
          {activeTab === 'pricing' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Pricing Configuration</h3>
                <p className="text-sm text-slate-500">Set your taxi and tour pricing rates</p>
              </div>

              {/* Taxi Pricing */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Car className="size-5" />
                  Taxi Pricing (ISK)
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Base Fare</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.baseTaxiFare}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, baseTaxiFare: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">ISK</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Per Kilometer</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.perKmRate}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, perKmRate: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">ISK</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Waiting (per min)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.waitingPerMinute}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, waitingPerMinute: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">ISK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Surcharges */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Percent className="size-5" />
                  Surcharges
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Airport Surcharge</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.airportSurcharge}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, airportSurcharge: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">ISK</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Night Surcharge (22:00-06:00)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.nightSurcharge}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, nightSurcharge: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-8 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Weekend Surcharge</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.weekendSurcharge}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, weekendSurcharge: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-8 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Settings */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="size-5" />
                  Booking & Payment
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Minimum Booking</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.minBookingAmount}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, minBookingAmount: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">ISK</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cancellation Fee</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.cancellationFee}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, cancellationFee: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">ISK</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tour Deposit</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricingSettings.tourDepositPercent}
                        onChange={(e) => setPricingSettings({ ...pricingSettings, tourDepositPercent: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 pr-8 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Notification Preferences</h3>
                <p className="text-sm text-slate-500">Configure how you receive alerts and updates</p>
              </div>

              {/* Email Notifications */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="size-5" />
                  Email Notifications
                </h4>
                <div className="space-y-4">
                  {[
                    { key: 'emailNewBooking', label: 'New booking received', description: 'Get notified when a new booking is made' },
                    { key: 'emailBookingConfirmed', label: 'Booking confirmed', description: 'Notification when booking is confirmed' },
                    { key: 'emailBookingCancelled', label: 'Booking cancelled', description: 'Alert when a booking is cancelled' },
                    { key: 'emailPaymentReceived', label: 'Payment received', description: 'Confirmation when payment is successful' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.description}</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/50 transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* SMS Notifications */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Phone className="size-5" />
                  SMS Notifications
                </h4>
                <div className="space-y-4">
                  {[
                    { key: 'smsNewBooking', label: 'New booking SMS', description: 'Receive SMS for new bookings' },
                    { key: 'smsDriverAssigned', label: 'Driver assigned', description: 'SMS when driver is assigned to booking' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.description}</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/50 transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary Reports */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Clock className="size-5" />
                  Summary Reports
                </h4>
                <div className="space-y-4">
                  {[
                    { key: 'dailySummary', label: 'Daily summary', description: 'Receive daily activity summary at end of day' },
                    { key: 'weeklySummary', label: 'Weekly summary', description: 'Receive weekly performance report' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.description}</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/50 transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Appearance</h3>
                <p className="text-sm text-slate-500">Customize the look and feel of your dashboard</p>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'light', label: 'Light', icon: '☀️' },
                    { value: 'dark', label: 'Dark', icon: '🌙' },
                    { value: 'system', label: 'System', icon: '💻' },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: theme.value })}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                        appearanceSettings.theme === theme.value
                          ? 'border-primary bg-primary/10'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
                      )}
                    >
                      <span className="text-2xl">{theme.icon}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Colors */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Brand Colors</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-mono focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={appearanceSettings.accentColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={appearanceSettings.accentColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-mono focus:border-primary focus:ring-primary dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Options */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Display Options</h4>
                {[
                  { key: 'compactMode', label: 'Compact mode', description: 'Use smaller spacing and fonts' },
                  { key: 'showDriverPhotos', label: 'Show driver photos', description: 'Display driver profile pictures in lists' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={appearanceSettings[item.key as keyof typeof appearanceSettings] as boolean}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/50 transition-colors" />
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
