import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { GraphData } from "@/types/graph"

interface UtilizationChartProps {
  title: string
  data: GraphData
  color?: string
}

const transformDataForChart = (data: GraphData) => {
  return data.labels.map((label, index) => ({
    time: label,
    value: data.values[index] || 0
  }))
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    color: string
    dataKey: string
    fill: string
    formatter?: Function
    name: string
    payload: {
      time: string
      value: number
    }
    stroke: string
    strokeDasharray: string
    type: string
    unit: string
    value: number
  }>
  label?: string
  title: string
}

const CustomTooltip = ({ active, payload, label, title }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    const value = data.value
    const timeLabel = label || data.payload.time

    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3 min-w-32">
        <p className="text-sm font-medium text-foreground mb-1">{title}</p>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.color }}
          />
          <span className="text-xs text-muted-foreground">{timeLabel}</span>
        </div>
        <p className="text-lg font-bold text-foreground mt-1">
          {typeof value === 'number' ? value.toFixed(1) : value}%
        </p>
      </div>
    )
  }

  return null
}

export function UtilizationChart({ 
  title, 
  data,
  color = "oklch(0.5242 0.1452 149.7568)"
}: UtilizationChartProps) {
  const chartData = transformDataForChart(data)
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="50%" stopColor={color} stopOpacity={0.4}/>
                  <stop offset="100%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis hide />
              <Tooltip 
                content={<CustomTooltip title={title} />}
                cursor={{
                  stroke: color,
                  strokeWidth: 1,
                  strokeDasharray: "5 5"
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
