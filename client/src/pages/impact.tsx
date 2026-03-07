import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/lib/auth";
import { useUserImpact } from "@/hooks/use-eco";
import { Globe, Heart, Award, Sparkles } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockChartData = [
  { name: 'Jan', co2: 12, water: 40 },
  { name: 'Feb', co2: 25, water: 80 },
  { name: 'Mar', co2: 45, water: 150 },
  { name: 'Apr', co2: 68, water: 300 },
  { name: 'May', co2: 95, water: 500 },
  { name: 'Jun', co2: 124.5, water: 850 },
];

export default function ImpactPage() {
  const { user } = useAuth();
  const { data: impact, isLoading } = useUserImpact(user?.uid);

  const stats = impact || {
    co2Saved: 124.5,
    waterSaved: 850,
    treesPlanted: 3,
    totalWeight: 18.5
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-foreground flex items-center gap-3">
          <Globe className="w-8 h-8 text-primary" />
          Your Global Impact
        </h1>
        <p className="text-muted-foreground mt-2">Every recycled item makes a tangible difference.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-3xl p-8 border border-border shadow-lg shadow-black/5 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-5xl font-black font-display mb-2">{stats.totalWeight}<span className="text-2xl text-muted-foreground font-semibold">kg</span></h2>
            <p className="text-lg font-medium text-foreground">Total E-Waste Recycled</p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              You're in the top 15% of recyclers in your area. Keep up the amazing work!
            </p>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] text-primary/5">
            <Globe className="w-64 h-64" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-8 shadow-xl relative overflow-hidden text-white">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold font-display mb-4">Level: Eco Warrior</h2>
            <div className="w-full bg-white/10 rounded-full h-3 mb-3">
              <div className="bg-primary h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-white/60 text-sm">250 points to next level (Planet Guardian)</p>
          </div>
          <div className="absolute top-0 right-0 p-8">
            <Sparkles className="w-12 h-12 text-yellow-400 opacity-50" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-border shadow-lg shadow-black/5">
        <h3 className="text-xl font-bold font-display mb-8">Impact Growth</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="co2" name="CO2 Saved (kg)" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}
