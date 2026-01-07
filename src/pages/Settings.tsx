import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                  HS
                </AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Hemanth Sinha" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="hemanthsinha2004@example.com" />
              </div>
            </div>

            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Appearance Card */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Theme</div>
                <div className="text-sm text-muted-foreground">
                  {theme === "dark" ? "Dark mode" : "Light mode"}
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Budget Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Get notified when approaching budget limits
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">AI Insights</div>
                <div className="text-sm text-muted-foreground">
                  Receive personalized financial recommendations
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Transaction Updates</div>
                <div className="text-sm text-muted-foreground">
                  Email notifications for new transactions
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
