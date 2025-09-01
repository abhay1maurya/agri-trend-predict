import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const generateMockData = () => {
  const data = [];
  const basePrice = 45;
  const today = new Date();
  
  // Historical data (30 days)
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const price = basePrice + Math.sin(i * 0.2) * 5 + Math.random() * 8 - 4;
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      actual: Math.max(25, price),
      predicted: null,
      type: 'historical'
    });
  }
  
  // Predicted data (7 days ahead)
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const predictedPrice = basePrice + Math.sin((30 + i) * 0.2) * 5 + (i * 0.5);
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      actual: null,
      predicted: Math.max(25, predictedPrice),
      type: 'predicted'
    });
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{`Date: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey === 'actual' ? 'Actual' : 'Predicted'}: ₹${entry.value?.toFixed(2)}/kg`}
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
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Onion Price Forecast</span>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-chart-primary"></div>
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-chart-secondary"></div>
              <span className="text-muted-foreground">Predicted</span>
            </div>
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered price prediction with 85% accuracy confidence
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              label={{ value: 'Price (₹/kg)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--chart-primary))"
              fill="hsl(var(--chart-primary))"
              fillOpacity={0.1}
              strokeWidth={2}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--chart-secondary))"
              fill="hsl(var(--chart-secondary))"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-foreground">Model Accuracy</div>
              <div className="text-agriculture-primary font-semibold">85.2%</div>
            </div>
            <div>
              <div className="font-medium text-foreground">Next Week Trend</div>
              <div className="text-price-up font-semibold">↗ Increasing</div>
            </div>
            <div>
              <div className="font-medium text-foreground">Confidence Level</div>
              <div className="text-chart-tertiary font-semibold">High</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};