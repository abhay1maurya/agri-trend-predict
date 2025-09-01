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
    currentPrice: 45.30,
    change: 12.5,
    volume: "2,450 tons",
    market: "Maharashtra",
    lastUpdated: "2 mins ago",
    prediction: "up"
  },
  {
    name: "Arhar Dal",
    currentPrice: 120.85,
    change: -3.2,
    volume: "1,200 tons",
    market: "Uttar Pradesh",
    lastUpdated: "5 mins ago",
    prediction: "down"
  },
  {
    name: "Potato",
    currentPrice: 28.60,
    change: 0.8,
    volume: "3,800 tons",
    market: "West Bengal",
    lastUpdated: "1 min ago",
    prediction: "stable"
  },
  {
    name: "Tomato",
    currentPrice: 52.40,
    change: 18.7,
    volume: "1,850 tons",
    market: "Karnataka",
    lastUpdated: "3 mins ago",
    prediction: "up"
  },
  {
    name: "Tur Dal",
    currentPrice: 115.20,
    change: -1.5,
    volume: "980 tons",
    market: "Maharashtra",
    lastUpdated: "4 mins ago",
    prediction: "down"
  }
];

const getTrendIcon = (change: number) => {
  if (Math.abs(change) < 1) return <Minus className="h-4 w-4" />;
  return change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
};

const getTrendColor = (change: number) => {
  if (Math.abs(change) < 1) return "text-price-stable";
  return change > 0 ? "text-price-up" : "text-price-down";
};

const getPredictionBadge = (prediction: "up" | "down" | "stable") => {
  const variants = {
    up: "bg-price-up/10 text-price-up border-price-up/20",
    down: "bg-price-down/10 text-price-down border-price-down/20",
    stable: "bg-price-stable/10 text-price-stable border-price-stable/20"
  };
  
  const labels = {
    up: "↗ Rising",
    down: "↘ Falling", 
    stable: "→ Stable"
  };
  
  return (
    <Badge variant="outline" className={variants[prediction]}>
      {labels[prediction]}
    </Badge>
  );
};

export const CommodityTable = () => {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Live Commodity Prices</CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time market data with AI predictions
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {commodities.map((commodity, index) => (
            <div 
              key={commodity.name} 
              className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                index === 0 ? 'rounded-t-lg' : ''
              } ${
                index === commodities.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{commodity.name}</div>
                  <div className="text-xs text-muted-foreground">{commodity.market}</div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="font-bold text-foreground">₹{commodity.currentPrice}</div>
                  <div className={`flex items-center justify-end space-x-1 text-xs ${getTrendColor(commodity.change)}`}>
                    {getTrendIcon(commodity.change)}
                    <span>{Math.abs(commodity.change)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-muted-foreground">
                  Vol: {commodity.volume}
                </div>
                {getPredictionBadge(commodity.prediction)}
              </div>
              
              <div className="text-xs text-muted-foreground mt-2">
                Updated {commodity.lastUpdated}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-muted/30 text-center">
          <div className="text-sm text-muted-foreground">
            Market data refreshes every <span className="font-medium text-agriculture-primary">30 seconds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};