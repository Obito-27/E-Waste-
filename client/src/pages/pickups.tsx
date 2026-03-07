import { AppLayout } from "@/components/layout/AppLayout";
import { usePickups } from "@/hooks/use-eco";
import { Truck, Calendar, Weight, MapPin, Search } from "lucide-react";
import { Link } from "wouter";

export default function PickupsPage() {
  const { data: pickups, isLoading } = usePickups();

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">My Pickups</h1>
          <p className="text-muted-foreground mt-2">Track the status of your recycling requests.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search items..." 
            className="pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-lg shadow-black/5 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-24 bg-muted/50 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : !pickups || pickups.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display mb-3">No pickups found</h2>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8">
              You haven't scheduled any e-waste pickups yet. Scan an item to get started.
            </p>
            <Link 
              href="/scan" 
              className="px-8 py-4 rounded-xl font-bold text-lg text-white emerald-gradient shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all inline-block"
            >
              Scan E-Waste
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {pickups.map((pickup: any) => (
              <div key={pickup.id} className="p-6 hover:bg-muted/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {pickup.itemName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{pickup.itemName}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {new Date(pickup.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><Weight className="w-4 h-4"/> {pickup.weight} kg</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Home Address</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${
                    pickup.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                    pickup.status === 'Pending Pickup' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {pickup.status === 'Pending Pickup' && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                    {pickup.status}
                  </span>
                  {pickup.estimatedValue && (
                    <span className="text-sm font-semibold text-primary">
                      Est. Value: ₹{pickup.estimatedValue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
