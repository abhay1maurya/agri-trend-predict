import { Activity } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">AgriTrend Predict</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Agricultural Price Forecasting</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Government of India</div>
            <div className="text-xs text-muted-foreground">Ministry of Agriculture & Farmers Welfare</div>
          </div>
        </div>
      </div>
    </header>
  );
};