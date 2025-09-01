import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  unit: string;
  commodity: string;
}

const MetricCard = ({ title, value, change, unit, commodity }: MetricCardProps) => {
  const isPositive = change > 0;
  const isStable = Math.abs(change) < 1;
  
  const getTrendIcon = () => {
    if (isStable) return <Minus className="h-4 w-4" />;
    return isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };
  
  const getTrendColor = () => {
    if (isStable) return "text-price-stable";
    return isPositive ? "text-price-up" : "text-price-down";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-xs font-medium">{Math.abs(change)}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-foreground">₹{value}</div>
          <div className="text-xs text-muted-foreground">{unit} • {commodity}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricsGrid = () => {
  const metrics = [
    {
      title: "Onion Avg Price",
      value: "45.30",
      change: 12.5,
      unit: "per kg",
      commodity: "Maharashtra"
    },
    {
      title: "Pulses (Arhar)",
      value: "120.85",
      change: -3.2,
      unit: "per kg",
      commodity: "Uttar Pradesh"
    },
    {
      title: "Potato Price",
      value: "28.60",
      change: 0.8,
      unit: "per kg",
      commodity: "West Bengal"
    },
    {
      title: "Market Volatility",
      value: "15.2",
      change: 8.4,
      unit: "index",
      commodity: "National Avg"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};