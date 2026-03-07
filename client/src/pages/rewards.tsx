import { AppLayout } from "@/components/layout/AppLayout";
import { Gift, ExternalLink, Ticket, Zap } from "lucide-react";

export default function RewardsPage() {
  const rewards = [
    { title: "$10 Amazon Gift Card", cost: 1500, category: "Voucher", color: "bg-orange-50 text-orange-600" },
    { title: "20% off EcoStore", cost: 500, category: "Discount", color: "bg-blue-50 text-blue-600" },
    { title: "Plant 5 Extra Trees", cost: 800, category: "Donation", color: "bg-emerald-50 text-emerald-600" },
    { title: "Free Premium Pickup", cost: 1000, category: "Service", color: "bg-purple-50 text-purple-600" }
  ];

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground flex items-center gap-3">
            <Gift className="w-8 h-8 text-primary" />
            Rewards Center
          </h1>
          <p className="text-muted-foreground mt-2">Redeem your eco-points for real-world rewards.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-inner">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-2xl font-black text-primary font-display">1,250</span>
          <span className="font-semibold text-primary/70">pts</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-border shadow-md shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${reward.color}`}>
                {reward.category}
              </div>
              <Ticket className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold font-display text-foreground mb-4">{reward.title}</h3>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold text-lg text-muted-foreground">
                {reward.cost} pts
              </span>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-foreground text-background hover:bg-primary transition-colors">
                Redeem <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
