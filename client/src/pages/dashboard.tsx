import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/lib/auth";
import { useUserImpact, usePickups } from "@/hooks/use-eco";
import { motion } from "framer-motion";
import { Droplets, Cloud, TreePine, ArrowRight, PackageOpen, PlusCircle } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: impact, isLoading: impactLoading } = useUserImpact(user?.uid);
  const { data: pickups, isLoading: pickupsLoading } = usePickups();

  const mockImpact = impact || {
    co2Saved: 124.5,
    waterSaved: 850,
    treesPlanted: 3,
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Welcome back, {user?.displayName?.split(' ')[0]} 👋</h1>
          <p className="text-muted-foreground mt-2 text-lg">Here's your environmental impact so far.</p>
        </div>
        <Link 
          href="/scan" 
          className="flex items-center gap-2 px-6 py-3 rounded-xl emerald-gradient text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          New Recycle Scan
        </Link>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <motion.div variants={item} className="bg-white rounded-3xl p-6 border border-border shadow-lg shadow-black/5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <Cloud className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">CO₂ Saved</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-display text-foreground">{mockImpact.co2Saved}</span>
            <span className="text-lg font-medium text-muted-foreground">kg</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white rounded-3xl p-6 border border-border shadow-lg shadow-black/5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">Water Saved</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-display text-foreground">{mockImpact.waterSaved}</span>
            <span className="text-lg font-medium text-muted-foreground">Liters</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white rounded-3xl p-6 border border-border shadow-lg shadow-black/5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-primary">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">Trees Planted</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-display text-foreground">{mockImpact.treesPlanted}</span>
            <span className="text-lg font-medium text-muted-foreground">Trees</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl border border-border shadow-lg shadow-black/5 overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <PackageOpen className="w-5 h-5 text-primary" />
            Recent Pickups
          </h2>
          <Link href="/pickups" className="text-primary font-medium hover:underline flex items-center gap-1 text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="p-6">
          {pickupsLoading ? (
            <div className="flex flex-col gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-20 bg-muted/50 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : !pickups || pickups.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No pickups yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Start recycling your e-waste to track your impact and earn rewards.</p>
              <Link href="/scan" className="text-primary font-medium hover:underline">Start Scanning</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {pickups.slice(0, 4).map((pickup: any) => (
                <div key={pickup.id} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {pickup.itemName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{pickup.itemName}</h4>
                      <p className="text-sm text-muted-foreground">{pickup.category} • {pickup.weight} kg</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      pickup.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      pickup.status === 'Pending Pickup' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {pickup.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(pickup.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
}
