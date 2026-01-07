import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-card border-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">support@financeai.com</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Live Chat</h3>
                    <p className="text-muted-foreground">Available Mon-Fri, 9am-5pm EST</p>
                    <Button variant="outline" className="mt-3">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-gradient-hero">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Need Quick Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Check out our comprehensive FAQ section and documentation
                </p>
                <Button variant="outline">View Help Center</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
