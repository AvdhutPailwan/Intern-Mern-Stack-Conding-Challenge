"use client"
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DropdownMonths from '../DropdownMonths/DropdownMonths'
import { getTransactionStatisticsOfTheSelectedMonth } from '@/actions/transaction.action';
import { TransactionStatisticsDataResponse } from '@/lib/interfaces';

interface StatisticsCardProps {
  initialData: TransactionStatisticsDataResponse
}
function StatisticsCard({ initialData }: StatisticsCardProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("Mar");
  const [data, setData] = useState<TransactionStatisticsDataResponse>(initialData);
  async function handleMonthChange(e) {
    setSelectedMonth(e);
    const dataOfTheMonth = await getTransactionStatisticsOfTheSelectedMonth(e);
    setData(dataOfTheMonth.data);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Statistics</CardTitle>
        <DropdownMonths selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      </CardHeader>
      <CardContent>
        <p>Total Sale Amount : {Math.round((data.totalSaleAmount + Number.EPSILON) * 100) / 100}</p>
      </CardContent>
      <CardContent>
        <p>Total Number of Items Sold : {data.totalNumberOfItemsSold}</p>
      </CardContent>
      <CardContent>
        <p>Total Number of Items Not Sold : {data.totalNumberOfItemsNotSold}</p>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard