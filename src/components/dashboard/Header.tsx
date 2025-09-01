import { TrendingUp, BarChart3, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-agriculture-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriTrend Predict</h1>
                <p className="text-sm text-muted-foreground">Agricultural Price Forecasting System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <AlertCircle className="h-4 w-4 mr-2" />
                Alerts
              </Button>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">Ministry of Agriculture</div>
              <div className="text-xs text-muted-foreground">Price Monitoring Division</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};