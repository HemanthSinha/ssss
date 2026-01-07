import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-hero">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>
        </div>

        <Card className="shadow-elegant border-0 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
