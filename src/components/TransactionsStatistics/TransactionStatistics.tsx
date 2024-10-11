"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DropdownMonths from '../DropdownMonths/DropdownMonths'
import { TransactionStatisticsDataResponse } from '@/lib/interfaces';

interface TransactionStatisticsProps {
  initialData: TransactionStatisticsDataResponse,
  selectedMonth: string,
  handleMonthChange: (value: string) => void
}
function TransactionStatistics({ initialData, selectedMonth,
  handleMonthChange }: TransactionStatisticsProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Statistics</CardTitle>
        <DropdownMonths selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      </CardHeader>
      <CardContent>
        <p>Total Sale Amount : {Math.round((initialData.totalSaleAmount + Number.EPSILON) * 100) / 100}</p>
      </CardContent>
      <CardContent>
        <p>Total Number of Items Sold : {initialData.totalNumberOfItemsSold}</p>
      </CardContent>
      <CardContent>
        <p>Total Number of Items Not Sold : {initialData.totalNumberOfItemsNotSold}</p>
      </CardContent>
    </Card>
  )
}

export default TransactionStatistics