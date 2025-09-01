import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Generate mock data for the chart
const generateMockData = () => {
  const data = [];
  const today = new Date();
  
  // Historical data (last 30 days)
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const basePrice = 28 + Math.sin(i * 0.1) * 3;
    const noise = (Math.random() - 0.5) * 2;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      actual: Math.round((basePrice + noise) * 100) / 100,
      predicted: null
    });
  }
  
  // Predicted data (next 7 days)
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const basePrice = 28 + Math.sin((30 + i) * 0.1) * 3;
    const confidence = 0.9 - (i * 0.05); // Decreasing confidence
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      actual: null,
      predicted: Math.round(basePrice * 100) / 100
    });
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
        <p className="text-sm font-medium">{`Date: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey === 'actual' ? 'Actual' : 'Predicted'}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const PriceChart = () => {
  const data = generateMockData();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">Onion Price Forecast</CardTitle>
        <p className="text-sm text-muted-foreground">
          Historical prices vs AI predictions for the next 7 days
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'Price (₹/kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
                name="Actual Price"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.3}
                strokeWidth={2}
                strokeDasharray="5,5"
                name="AI Prediction"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-lg font-semibold text-foreground">85%</div>
            <div className="text-sm text-muted-foreground">Model Accuracy</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-lg font-semibold text-green-600">↗ Upward</div>
            <div className="text-sm text-muted-foreground">7-Day Trend</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-lg font-semibold text-foreground">92%</div>
            <div className="text-sm text-muted-foreground">Confidence Level</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};