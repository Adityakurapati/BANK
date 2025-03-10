"use client"

import * as React from "react"
import {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        CartesianGrid,
        ResponsiveContainer,
        Legend
} from "recharts"
import {
        Chart,
        ChartContainer,
        ChartTooltip,
        ChartTooltipContent,
        ChartLegend,
        ChartLegendContent
} from "@/components/ui/chart"

export function SpendingChart() {
        // Sample spending data for the last 6 months
        const data = [
                {
                        month: "Jan",
                        Groceries: 12400,
                        Entertainment: 5800,
                        Bills: 9200,
                        Shopping: 7500,
                        Other: 3600
                },
                {
                        month: "Feb",
                        Groceries: 11800,
                        Entertainment: 6200,
                        Bills: 9000,
                        Shopping: 8400,
                        Other: 4200
                },
                {
                        month: "Mar",
                        Groceries: 12900,
                        Entertainment: 5300,
                        Bills: 9500,
                        Shopping: 6800,
                        Other: 3900
                },
                {
                        month: "Apr",
                        Groceries: 13200,
                        Entertainment: 6100,
                        Bills: 9300,
                        Shopping: 7100,
                        Other: 4500
                },
                {
                        month: "May",
                        Groceries: 12600,
                        Entertainment: 5900,
                        Bills: 9400,
                        Shopping: 8200,
                        Other: 4100
                },
                {
                        month: "Jun",
                        Groceries: 13400,
                        Entertainment: 6400,
                        Bills: 9100,
                        Shopping: 7800,
                        Other: 3800
                }
        ]

        // Format currency values for tooltip
        const formatCurrency = (value) => {
                return `₹${value.toLocaleString()}`
        }

        return (
                <ChartContainer className="w-full h-full">
                        <Chart className="w-full h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="month" />
                                                <YAxis
                                                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                                                        width={60}
                                                />
                                                <ChartTooltip
                                                        content={
                                                                <ChartTooltipContent
                                                                        formatter={(value, name) => [formatCurrency(value), name]}
                                                                />
                                                        }
                                                />
                                                <Legend
                                                        content={<ChartLegendContent />}
                                                        layout="horizontal"
                                                        verticalAlign="top"
                                                        align="right"
                                                        wrapperStyle={{ paddingBottom: "20px" }}
                                                />
                                                <Bar dataKey="Groceries" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="Entertainment" fill="#10b981" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="Bills" fill="#f97316" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="Shopping" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="Other" fill="#a3a3a3" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                </ResponsiveContainer>
                        </Chart>
                </ChartContainer>
        )
}