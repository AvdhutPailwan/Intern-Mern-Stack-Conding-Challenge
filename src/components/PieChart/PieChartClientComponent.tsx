"use client"
import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js"
import DropdownMonths from '../DropdownMonths/DropdownMonths';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';


ChartJS.register(
  Tooltip, Legend, ArcElement
)
interface PieChartClientComponentProps {
  initialData: any,
  selectedMonth : string,
  handleMonthChange: (value: string) => void
}
function PieChartClientComponent({ initialData, selectedMonth, handleMonthChange }: PieChartClientComponentProps) {
  
  return (
    <div className='my-5'>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Bar Chart</CardTitle>
          <DropdownMonths selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
        </CardHeader>
        <CardContent>
            <Pie data={initialData} />
        </CardContent>
      </Card>
    </div>
  )
}

export default PieChartClientComponent;