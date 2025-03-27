// import React from 'react';
import { Shield, Bell, Wallet, User, Moon, Globe, Key } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500, 'Bio must be less than 500 characters'),
  location: z.string(),
  timezone: z.string(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    messages: z.boolean(),
    updates: z.boolean(),
  }),
});

type ProfileForm = z.infer<typeof profileSchema>;

export const Settings = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Experienced blockchain developer specializing in DeFi protocols and smart contracts.',
      location: 'Lagos, Nigeria',
      timezone: 'Africa/Lagos',
      notifications: {
        email: true,
        push: true,
        messages: true,
        updates: false,
      },
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log('Updated settings:', data);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-display font-bold mb-8">Account Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { name: 'Profile', icon: User },
              { name: 'Security', icon: Shield },
              { name: 'Notifications', icon: Bell },
              { name: 'Wallet', icon: Wallet },
              { name: 'Appearance', icon: Moon },
              { name: 'Language', icon: Globe },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-secondary-light transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Profile Section */}
          <div className="bg-secondary-light rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-accent-red">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-accent-red">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-accent-red">{errors.bio.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Timezone
                  </label>
                  <select
                    {...register('timezone')}
                    className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                    <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
                    <option value="Africa/Cairo">Africa/Cairo (GMT+2)</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register('notifications.email')}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span>Email notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register('notifications.push')}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span>Push notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register('notifications.messages')}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span>Message notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register('notifications.updates')}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span>Platform updates</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Security Section */}
          <div className="bg-secondary-light rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Security Settings</h2>
              <Key className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
                <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                <button className="btn-secondary">Enable 2FA</button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Connected Wallets</h3>
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">MetaMask</p>
                      <p className="text-sm text-gray-400">0xabcd...efgh</p>
                    </div>
                    <button className="text-accent-red hover:text-accent-red/80">Disconnect</button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Login', device: 'Chrome on Windows', time: '2 hours ago' },
                    { action: 'Password changed', device: 'Chrome on Windows', time: '5 days ago' },
                    { action: 'Login', device: 'Safari on iPhone', time: '1 week ago' },
                  ].map((activity, index) => (
                    <div key={index} className="bg-secondary p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{activity.action}</p>
                          <p className="text-sm text-gray-400">{activity.device}</p>
                        </div>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
