import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Target, Users, Heart } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">About FinanceAI</h1>
          <p className="text-xl text-muted-foreground">
            Empowering people to make smarter financial decisions
          </p>
        </div>

        {/* Mission */}
        <Card className="shadow-card border-0">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              At FinanceAI, we believe that everyone deserves access to intelligent financial
              management tools. Our mission is to democratize personal finance by combining
              cutting-edge AI technology with intuitive design, making it easy for anyone to
              understand, manage, and grow their wealth.
            </p>
          </CardContent>
        </Card>

        {/* Story */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-lg text-muted-foreground">
            Founded in 2024, FinanceAI started with a simple observation: managing personal
            finances shouldn't be complicated. Traditional banking apps were cluttered with
            features most people never used, while AI-powered insights remained locked behind
            expensive advisory services.
          </p>
          <p className="text-lg text-muted-foreground">
            We set out to change that. By leveraging the latest advances in artificial
            intelligence and machine learning, we've created a platform that learns from your
            spending patterns, understands your financial goals, and provides actionable
            recommendations that actually make a difference.
          </p>
        </div>

        {/* Values */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card border-0">
              <CardContent className="p-6 space-y-3">
                <Users className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold">User-First</h3>
                <p className="text-muted-foreground">
                  Every decision we make starts with our users. Your financial well-being
                  is our top priority.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-card border-0">
              <CardContent className="p-6 space-y-3">
                <Heart className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in clear, honest communication. No hidden fees, no confusing
                  terms—just straightforward financial guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Goals */}
        <Card className="shadow-card border-0 bg-gradient-hero">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-3xl font-bold">Looking Ahead</h2>
            <p className="text-lg text-muted-foreground">
              We're constantly evolving. Our roadmap includes exciting features like
              investment tracking, cryptocurrency integration, real-time expense sharing,
              and even more sophisticated AI-powered insights. Join us on this journey to
              redefine personal finance management.
            </p>
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
