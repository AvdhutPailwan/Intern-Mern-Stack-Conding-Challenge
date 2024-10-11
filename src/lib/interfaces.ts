import { Transaction } from "@/models/transaction.model";

export interface TransactionBarChartDataResponse {
  range: string;
  count: number;
}
export interface TransactionTableDataResponse {
  transactions: Transaction[];
  countOfTransactions: number;
  // pageNumber: number;
  // perPageTransactions: number;
}
export interface TransactionPieChartDataResponse {
  category: string;
  count: number;
}
export interface TransactionStatisticsDataResponse {
  totalSaleAmount: number;
  totalNumberOfItemsSold: number;
  totalNumberOfItemsNotSold: number;
}

export interface CombinedDataResponse {
  tableData?:
    | TransactionTableDataResponse
    | TransactionBarChartDataResponse[]
    | TransactionPieChartDataResponse[]
    | TransactionStatisticsDataResponse
    | CombinedDataResponse;
  statisticsData?:
    | TransactionTableDataResponse
    | TransactionBarChartDataResponse[]
    | TransactionPieChartDataResponse[]
    | TransactionStatisticsDataResponse
    | CombinedDataResponse;
  barChartData?:
    | TransactionTableDataResponse
    | TransactionBarChartDataResponse[]
    | TransactionPieChartDataResponse[]
    | TransactionStatisticsDataResponse
    | CombinedDataResponse;
  pieChartData?:
    | TransactionTableDataResponse
    | TransactionBarChartDataResponse[]
    | TransactionPieChartDataResponse[]
    | TransactionStatisticsDataResponse
    | CombinedDataResponse;
}
export interface CustomResponse {
  status: "OK" | "ERR";
  message?: string;
  data?:
    | TransactionTableDataResponse
    | TransactionBarChartDataResponse[]
    | TransactionPieChartDataResponse[]
    | TransactionStatisticsDataResponse
    | CombinedDataResponse;
}
