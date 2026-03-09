import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle, Zap, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summaries",
    description: "Get instant, accurate summaries of every meeting with key decisions highlighted.",
  },
  {
    icon: CheckCircle,
    title: "Smart Action Items",
    description: "Automatically extract and assign action items to team members with deadlines.",
  },
  {
    icon: Zap,
    title: "Instant Follow-ups",
    description: "Generate and send professional follow-up emails in seconds, not hours.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">MeetingMind</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>Sign In</Button>
          <Button variant="hero" onClick={() => navigate("/dashboard")}>
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Meeting Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Turn meetings into
            <span className="text-gradient block">actionable outcomes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your meeting recordings and let AI extract summaries, action items, and draft follow-up emails — so your team can focus on execution.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent mb-4">
                <feature.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 MeetingMind. Built for teams that ship.
      </footer>
    </div>
  );
};

export default Landing;
