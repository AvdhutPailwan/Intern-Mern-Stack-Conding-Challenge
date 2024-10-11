"use client"
import React, { useState } from 'react'
import { DataTable } from './TransactionTable/data-table'
import { columns } from './TransactionTable/columns'
import TransactionStatistics from './TransactionsStatistics/TransactionStatistics'
import BarChartClientComponent from './BarChart/BarChartClientComponent'
import PieChartClientComponent from './PieChart/PieChartClientComponent'
import { getAllRoutesDataCombined } from '@/actions/transaction.action'


function Dashboard({initData}) {
  function formatBarChartData(dta) {
    const chartData = {
      labels: dta.map(item => item.range),
      datasets: [{
        label: 'Number of Items',
        data: dta.map(item => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(15,148,173,0.2)',
          'rgba(255,145,134,0.2)',
          'rgba(200, 100, 32, 0.2)'
        ],
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1,
      }]
    }
    return chartData;
  }
  function formatPieChartData(initialData) {
    const chartData = {
      labels: initialData.map(item => item.category),
      datasets: [{
        label: 'Number of Items',
        data: initialData.map(item => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(15,148,173,0.8)',
          'rgba(255,145,134,0.8)',
          'rgba(200, 100, 32, 0.8)',
          'rgba(0, 0, 0, 0.8)',
          'rgba(12, 51, 115, 0.8)',
          'rgba(8, 176, 159, 0.8)',
          'rgba(84, 201, 75, 0.8)'
        ],
        hoverOffset: 4,
      }]
    }
    return chartData
  }
  const [initialData, setInitialData] = useState(initData);
  const [selectedMonth,setSelectedMonth] = useState("Mar");
  async function handleMonthChange(e) {
    setSelectedMonth(e);
    const data = (await getAllRoutesDataCombined(e)).data;
    setInitialData(data);
  }
  return (
    <>
      <div className="col-start-3 col-span-8"><div className="container mx-auto py-10">
        <DataTable columns={columns} data={initialData.tableData.transactions} selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      </div></div>
      <div className="col-start-3 col-span-8"><TransactionStatistics initialData={initialData.statisticsData} selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} /></div>
      <div className="col-start-3 col-span-8"><BarChartClientComponent initialData={formatBarChartData(initialData.barChartData)} selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} /></div>
      <div className="col-start-3 col-span-8"><PieChartClientComponent initialData={formatPieChartData(initialData.pieChartData)} selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} /></div>
    </>
  )
}

export default Dashboard