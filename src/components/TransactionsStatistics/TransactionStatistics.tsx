import { getTransactionStatisticsOfTheSelectedMonth } from "@/actions/transaction.action";
import StatisticsCard from "./stats-card"

async function getData(){
  return (await getTransactionStatisticsOfTheSelectedMonth("Mar")).data
}
async function TransactionStatistics() {
  const initialData = await getData();
  return (
    <StatisticsCard initialData={initialData} />
  )
}

export default TransactionStatistics