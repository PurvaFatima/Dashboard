import { useState } from 'react';
import { useTheme } from "../components/theme-provider"
import { Moon, Sun } from "lucide-react"

const Settings = () => {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Later add logic to save settings (e.g., API call)
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-4">
      {/* CHANGED: added dark mode background + text */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

        {/* Profile Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
              {/* CHANGED: input background + border for dark mode */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              {/* CHANGED: input background + border for dark mode */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </section>

        {/* Theme Section */}
<section className="mb-8">
  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
  <div className="flex items-center">
    <label className="mr-4 text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      {theme === "light" ? (
        <>
          <Sun className="h-5 w-5" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  </div>
</section>


        {/* Notifications Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Push Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() => handleNotificationChange('sms')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">SMS Notifications</span>
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
