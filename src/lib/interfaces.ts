import { Transaction } from "@/models/transaction.model";

export interface TransactionBarChartDataResponse{
  range: string
  count: number
}
export interface TransactionTableDataResponse{
  transactions: Transaction[];
  countOfTransactions: number;
  pageNumber: number;
  perPageTransactions: number;
}
export interface TransactionPieChartDataResponse{
  category: string
  count: number
}
export interface TransactionStatisticsDataResponse{
  totalSaleAmount: number
  totalNumberOfItemsSold: number
  totalNumberOfItemsNotSold: number
}
export interface CustomResponse {
  status: "OK" | "ERR";
  message?: string;
  data?:
    | TransactionTableDataResponse
    | TransactionBarChartDataResponse[]
    | TransactionPieChartDataResponse[]
    | TransactionStatisticsDataResponse
}