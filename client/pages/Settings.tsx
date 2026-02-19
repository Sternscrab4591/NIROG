import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Save, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Personal Information */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input value={user?.name || ""} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input type="email" value={user?.email || ""} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input placeholder="Enter your phone number" />
              </div>

            </div>
          </div>


        {/* Permissions */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Permissions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Health Data Access</p>
                <p className="text-sm text-foreground/60">Allow app to access health information</p>
              </div>
              <Checkbox checked defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-foreground/60">Access device location for analysis</p>
              </div>
              <Checkbox />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Calendar Access</p>
                <p className="text-sm text-foreground/60">Access calendar for activity tracking</p>
              </div>
              <Checkbox />
            </div>
          </div>
        </div>

        {/* Privacy & Notifications */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Privacy & Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Health Notifications</p>
                <p className="text-sm text-foreground/60">Receive health-related alerts</p>
              </div>
              <Checkbox
                checked={notifications}
                onCheckedChange={(checked) =>
                  setNotifications(checked === true)
                }
              />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Data Sharing with Researchers</p>
                <p className="text-sm text-foreground/60">Anonymously share health data</p>
              </div>
              <Checkbox
                checked={dataSharing}
                onCheckedChange={(checked) =>
                  setDataSharing(checked === true)
                }
              />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-foreground/60">Help improve our services</p>
              </div>
              <Checkbox
                checked={analyticsEnabled}
                onCheckedChange={(checked) =>
                  setAnalyticsEnabled(checked === true)
                }
              />
            </div>
          </div>
        </div>

        {/* Health App Integration */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock size={20} />
            Connected Health Apps
          </h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-between">
              <span>Apple Health</span>
              <span className="text-xs text-foreground/60">Not connected</span>
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Google Fit</span>
              <span className="text-xs text-foreground/60">Not connected</span>
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Samsung Health</span>
              <span className="text-xs text-foreground/60">Not connected</span>
            </Button>
          </div>
        </div>

        {/* Account & Security */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Account & Security</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 dark:text-red-400">
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
