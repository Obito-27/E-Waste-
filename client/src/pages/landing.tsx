import { useAuth } from "@/lib/auth";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Leaf, Scan, Globe, Shield, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Landing() {
  const { user, login } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) setLocation("/dashboard");
  }, [user, setLocation]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-primary/20 flex flex-col">
      <nav className="fixed top-0 w-full glass-card z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl emerald-gradient flex items-center justify-center shadow-lg shadow-primary/30">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-display tracking-tight text-foreground">
            EcoCycle
          </span>
        </div>
        <button 
          onClick={login}
          className="px-6 py-2.5 rounded-full font-semibold bg-white border-2 border-border text-foreground hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          Sign In
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Powered by Gemini 1.5 AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-8 text-foreground leading-[1.1]">
            Turn your E-Waste into <br className="hidden md:block"/>
            <span className="text-gradient">Real Global Impact</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Snap a photo of your old electronics. Our AI identifies it instantly, schedules a pickup, and calculates your environmental impact.
          </p>

          <button 
            onClick={login}
            className="group px-8 py-4 rounded-2xl font-bold text-lg text-white emerald-gradient shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Start Recycling Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32"
        >
          {[
            { 
              icon: Scan, 
              title: "AI Detection", 
              desc: "Upload an image and let Gemini 1.5 instantly categorize and weigh your e-waste." 
            },
            { 
              icon: Globe, 
              title: "Track Impact", 
              desc: "Watch your contribution grow with real-time stats on CO2, water, and trees." 
            },
            { 
              icon: Shield, 
              title: "Secure Disposal", 
              desc: "Verified recycling partners ensure your electronics are disposed of safely." 
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* landing page hero background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/5 blur-[120px]" />
      </div>
    </div>
  );
}
