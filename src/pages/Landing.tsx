import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Sparkles,
  BarChart3,
  Shield,
  Zap,
  Brain,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: "Track Expenses",
      description: "Monitor every transaction automatically and categorize spending effortlessly",
    },
    {
      icon: Sparkles,
      title: "AI Insights",
      description: "Get personalized recommendations powered by advanced AI algorithms",
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Beautiful charts and graphs that make your financial data easy to understand",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level security to keep your financial information safe",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Stay informed with instant notifications and live data synchronization",
    },
    {
      icon: Brain,
      title: "Smart Budgeting",
      description: "AI-powered budget suggestions that adapt to your spending patterns",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "FinanceAI helped me save over $5,000 in just three months. The insights are incredibly accurate!",
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      content: "The best finance app I've ever used. The AI recommendations are spot-on and easy to follow.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "Finally, a finance manager that understands my spending habits. Absolutely game-changing!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>
              Contact
            </Button>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-gradient-hero text-primary text-sm font-medium">
                  AI-Powered Finance Management
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Smarter Insights.
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Better Finances.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Take control of your financial future with AI-powered insights,
                automated tracking, and intelligent budgeting tools.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src={heroImage}
                alt="Finance Dashboard"
                className="rounded-3xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Master Your Money
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed to simplify your financial life
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Thousands</h2>
            <p className="text-xl text-muted-foreground">
              See what our users are saying
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-card">
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center space-y-6 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Finances?</h2>
          <p className="text-xl opacity-90">
            Join thousands of users who are already managing their money smarter
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/signup")}
          >
            Start Free Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">FinanceAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered personal finance management for a better financial future
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-foreground" onClick={() => navigate("/about")}>About</li>
                <li className="cursor-pointer hover:text-foreground" onClick={() => navigate("/contact")}>Contact</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 FinanceAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
