import { getTransactionsOfTheSelectedMonthForTable, getTransactionStatisticsOfTheSelectedMonth, getTransactionDataForBarChartOfTheSelectedMonth, getTransactionDataForPieChartOfTheSelectedMonth, getAllRoutesDataCombined } from "@/actions/transaction.action";
import Header from "@/components/Header/Header";
import TransactionTable from "@/components/TransactionTable/TransactionTable";


export default async function Home() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-8"><Header /></div>
        <div className="col-start-3 col-span-8"><TransactionTable /></div>
        <div className="col-start-3 col-span-8">Hello</div>
        <div className="col-start-3 col-span-8">Hello</div>
        <div className="col-start-3 col-span-8">Hello</div>
      </div>
    </>
  );
}
