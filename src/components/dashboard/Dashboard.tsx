import { Header } from "./Header";
import { MetricsGrid } from "./MetricsGrid";
import { PriceChart } from "./PriceChart";
import { CommodityTable } from "./CommodityTable";
import heroImage from "@/assets/agri-dashboard-hero.jpg";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-agricultural">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="relative bg-cover bg-center bg-blend-overlay"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI-Powered Agricultural Price Forecasting
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-white/90">
                Empowering policymakers with predictive analytics for stable food markets
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">22</div>
                  <div className="text-sm opacity-90">Commodities Tracked</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">550+</div>
                  <div className="text-sm opacity-90">Market Centers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm opacity-90">Prediction Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Metrics Overview */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Market Overview</h2>
            <MetricsGrid />
          </section>

          {/* Charts and Data */}
          <section className="grid gap-6 lg:grid-cols-3">
            <PriceChart />
            <CommodityTable />
          </section>
        </div>
      </main>
    </div>
  );
};