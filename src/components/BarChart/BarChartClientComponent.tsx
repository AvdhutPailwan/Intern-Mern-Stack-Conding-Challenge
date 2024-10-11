"use client"
import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"
import DropdownMonths from '../DropdownMonths/DropdownMonths';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';


ChartJS.register(
  Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement
)
interface BarChartClientComponentProps {
  initialData: any,
  selectedMonth: string,
  handleMonthChange: (value: string) => void,
}
function BarChartClientComponent({ initialData, selectedMonth, handleMonthChange }: BarChartClientComponentProps) {
  return (
    <div className='mt-5'>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Bar Chart</CardTitle>
          <DropdownMonths selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
        </CardHeader>
        <CardContent>
          <Bar data={initialData} />
        </CardContent>
      </Card>
    </div>
  )
}

export default BarChartClientComponent;