import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CommodityData {
  name: string;
  currentPrice: number;
  change: number;
  volume: string;
  market: string;
  lastUpdated: string;
  prediction: "up" | "down" | "stable";
}

const commodities: CommodityData[] = [
  {
    name: "Onion",
    currentPrice: 28.50,
    change: 2.3,
    volume: "245 MT",
    market: "Bangalore",
    lastUpdated: "2 min ago",
    prediction: "up"
  },
  {
    name: "Tomato",
    currentPrice: 35.20,
    change: -1.8,
    volume: "180 MT",
    market: "Mumbai",
    lastUpdated: "5 min ago",
    prediction: "down"
  },
  {
    name: "Potato",
    currentPrice: 22.80,
    change: 0.5,
    volume: "320 MT",
    market: "Delhi",
    lastUpdated: "3 min ago",
    prediction: "stable"
  },
  {
    name: "Rice",
    currentPrice: 45.60,
    change: 1.2,
    volume: "156 MT",
    market: "Kolkata",
    lastUpdated: "1 min ago",
    prediction: "up"
  },
  {
    name: "Wheat",
    currentPrice: 25.40,
    change: -0.8,
    volume: "280 MT",
    market: "Pune",
    lastUpdated: "4 min ago",
    prediction: "stable"
  }
];

const getTrendIcon = (change: number) => {
  if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
  if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const getTrendColor = (change: number) => {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-muted-foreground";
};

const getPredictionBadge = (prediction: "up" | "down" | "stable") => {
  switch (prediction) {
    case "up":
      return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">↗ Rising</Badge>;
    case "down":
      return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">↘ Falling</Badge>;
    case "stable":
      return <Badge variant="secondary">→ Stable</Badge>;
  }
};

export const CommodityTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Live Commodity Prices</CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time prices with AI-driven predictions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {commodities.map((commodity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-foreground">{commodity.name}</div>
                <div className="text-sm text-muted-foreground">{commodity.market}</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-foreground">₹{commodity.currentPrice}</div>
                  <div className={`flex items-center space-x-1 text-sm ${getTrendColor(commodity.change)}`}>
                    {getTrendIcon(commodity.change)}
                    <span>{Math.abs(commodity.change)}%</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{commodity.volume}</div>
                  <div className="text-xs text-muted-foreground">{commodity.lastUpdated}</div>
                </div>
                
                <div>
                  {getPredictionBadge(commodity.prediction)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Data refreshes every 5 minutes • Powered by AI forecasting models
        </div>
      </CardContent>
    </Card>
  );
};