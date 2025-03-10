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
        // Chart,
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
                <div>
                        Spending CHarts
                </div>
        )
}