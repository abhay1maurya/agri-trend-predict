import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  unit: string;
  commodity: string;
}

const MetricCard = ({ title, value, change, unit, commodity }: MetricCardProps) => {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{unit}</div>
          </div>
          <div className={`flex items-center space-x-1 ${getTrendColor(change)}`}>
            {getTrendIcon(change)}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{commodity}</div>
      </CardContent>
    </Card>
  );
};

export const MetricsGrid = () => {
  const metrics = [
    {
      title: "Average Onion Price",
      value: "₹28.50",
      change: 2.3,
      unit: "per kg",
      commodity: "Onion (Bangalore)"
    },
    {
      title: "Wheat Price Trend",
      value: "₹22.80",
      change: -1.2,
      unit: "per kg",
      commodity: "Wheat (Delhi)"
    },
    {
      title: "Rice Market",
      value: "₹35.20",
      change: 0.8,
      unit: "per kg",
      commodity: "Rice (Mumbai)"
    },
    {
      title: "Pulse Prices",
      value: "₹68.40",
      change: -3.5,
      unit: "per kg",
      commodity: "Toor Dal (Pune)"
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