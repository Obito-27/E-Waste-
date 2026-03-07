import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import ScanPage from "@/pages/scan";
import PickupsPage from "@/pages/pickups";
import ImpactPage from "@/pages/impact";
import RewardsPage from "@/pages/rewards";

// Protected Route Wrapper
const ProtectedRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>;
  }
  
  if (!user) {
    return <Redirect to="/" />;
  }
  
  return <Component />;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/scan">
        {() => <ProtectedRoute component={ScanPage} />}
      </Route>
      <Route path="/pickups">
        {() => <ProtectedRoute component={PickupsPage} />}
      </Route>
      <Route path="/impact">
        {() => <ProtectedRoute component={ImpactPage} />}
      </Route>
      <Route path="/rewards">
        {() => <ProtectedRoute component={RewardsPage} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
