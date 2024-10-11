import { getTransactionsOfTheSelectedMonthForTable } from '@/actions/transaction.action'
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';

async function getData() {
  const data = (await getTransactionsOfTheSelectedMonthForTable("Mar")).data;
  return data;
}
async function TransactionTable() {
  const data = await getData();
  // console.log(data);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.transactions} getTransactionsOfTheSelectedMonthForTable={getTransactionsOfTheSelectedMonthForTable} />
    </div>
  )
}

export default TransactionTable