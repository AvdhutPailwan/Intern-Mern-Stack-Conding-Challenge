"use server";
import TransactionModel from "@/models/transaction.model";
import dbConnect from "@/lib/mongodb";
import {
  CombinedDataResponse,
  CustomResponse,
  TransactionBarChartDataResponse,
  TransactionPieChartDataResponse,
  TransactionStatisticsDataResponse,
  TransactionTableDataResponse,
} from "@/lib/interfaces";
import { MonthToNumber, monthNameToNumber } from "@/lib/data";

function MapMonthNameToNumber(month: string) {
  return monthNameToNumber[month as keyof MonthToNumber];
}
export async function getTransactionsOfTheSelectedMonthForTable(
  selectedMonth: string = "Mar",
  // pageNumber: number = 1,
  // perPageTransactions: number = 10,
  search: string = ""
) {
  // if (perPageTransactions < 1 || perPageTransactions < 1) {
  //   const response: CustomResponse = {
  //     status: "ERR",
  //     message: `Invalid Page Number or Per Page Transaction!`,
  //   };
  //   return response;
  // }
  await dbConnect();
  const monthSelected = MapMonthNameToNumber(selectedMonth);
  try {
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { price: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const transactionsOfTheSelectedMonth = await TransactionModel.aggregate([
      {
        $project: {
          _id: 0,
          month: { $month: "$dateOfSale" },
          id: 1,
          title: 1,
          price: 1,
          description: 1,
          category: 1,
          image: 1,
          sold: 1,
          dateOfSale: 1,
        },
      },
      {
        $match: {
          month: monthSelected,
          ...searchQuery,
        },
      },
      {
        $project: {
          id: 1,
          title: 1,
          price: 1,
          description: 1,
          category: 1,
          image: 1,
          sold: 1,
          dateOfSale: 1
        }
      }
    ])
      // .skip((pageNumber - 1) * perPageTransactions)
      // .limit(perPageTransactions);

    const res: TransactionTableDataResponse = {
      transactions: transactionsOfTheSelectedMonth,
      countOfTransactions: transactionsOfTheSelectedMonth.length,
      // pageNumber,
      // perPageTransactions,
    };

    const response: CustomResponse = {
      status: "OK",
      data: res,
    };
    return response;
  } catch (error) {
    const response: CustomResponse = {
      status: "ERR",
      message: `Error while getting transaction details for the table\n${error.message}`,
    };
    return response;
  }
}

export async function getTransactionStatisticsOfTheSelectedMonth(
  selectedMonth: string
) {
  await dbConnect();
  const monthSelected = MapMonthNameToNumber(selectedMonth);
  try {
    const transactions = await TransactionModel.aggregate([
      {
        $project: {
          _id: 0,
          month: { $month: "$dateOfSale" },
          price: 1,
          sold: 1,
        },
      },
      {
        $match: {
          month: monthSelected,
        },
      },
    ]);
    const itemsSold = transactions.filter((transaction) => {
      return transaction.sold;
    });

    const res: TransactionStatisticsDataResponse = {
      totalNumberOfItemsSold: itemsSold.length,
      totalNumberOfItemsNotSold: transactions.length - itemsSold.length,
      totalSaleAmount: itemsSold.reduce(
        (accumulator, transaction) => accumulator + transaction.price,
        0
      ),
    };

    const response: CustomResponse = {
      status: "OK",
      data: res,
    };
    return response;
  } catch (error) {
    const response: CustomResponse = {
      status: "ERR",
      message: `Error while fetching transaction statistics\n${error.message}`,
    };
    return response;
  }
}

export async function getTransactionDataForBarChartOfTheSelectedMonth(
  selectedMonth: string = "Mar"
) {
  await dbConnect();
  const monthSelected = MapMonthNameToNumber(selectedMonth);
  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];
  try {
    const rangeCounts: TransactionBarChartDataResponse[] = priceRanges.map(
      (range) => ({
        range: range.range,
        count: 0,
      })
    );
    const transactions = await TransactionModel.aggregate([
      {
        $project: {
          _id: 0,
          month: { $month: "$dateOfSale" },
          price: 1,
        },
      },
      {
        $match: {
          month: monthSelected,
        },
      },
    ]);
    transactions.forEach((transaction) => {
      const price = transaction.price;
      priceRanges.forEach((range, index) => {
        if (price >= range.min && price <= range.max) {
          rangeCounts[index].count++;
        }
      });
    });
    const response: CustomResponse = {
      status: "OK",
      data: rangeCounts,
    };
    return response;
  } catch (error) {
    const response: CustomResponse = {
      status: "ERR",
      message: `Error while fetching transaction details for bar chart\n${error.message}`,
    };
    return response;
  }
}
export async function getTransactionDataForPieChartOfTheSelectedMonth(
  selectedMonth: string = "Mar"
) {
  await dbConnect();
  const monthSelected = MapMonthNameToNumber(selectedMonth);
  try {
    const transactions: TransactionPieChartDataResponse[] =
      await TransactionModel.aggregate([
        {
          $project: {
            _id: 0,
            month: { $month: "$dateOfSale" },
            category: 1,
          },
        },
        {
          $match: {
            month: monthSelected,
          },
        },
        {
          $group: {
            _id: "$category",
            count: { $count: {} },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ]);
    const response: CustomResponse = {
      status: "OK",
      data: transactions,
    };
    return response;
  } catch (error) {
    const response: CustomResponse = {
      status: "ERR",
      message: `Error while fetching transaction details for pie chart\n${error.message}`,
    };
    return response;
  }
}

export async function getAllRoutesDataCombined(
  selectedMonth: string = "Mar",
  pageNumber: number = 1,
  perPageTransactions: number = 10,
  search: string = ""
) {
  const responseFromTable = (
    await getTransactionsOfTheSelectedMonthForTable(
      selectedMonth,
      pageNumber,
      perPageTransactions,
      search
    )
  ).data;
  const responseFromStatistics = (
    await getTransactionStatisticsOfTheSelectedMonth(selectedMonth)
  ).data;
  const responseFromBarChart = (
    await getTransactionDataForBarChartOfTheSelectedMonth(selectedMonth)
  ).data;
  const responseFromPieChart = (
    await getTransactionDataForPieChartOfTheSelectedMonth(selectedMonth)
  ).data;

  if (
    !responseFromTable ||
    !responseFromStatistics ||
    !responseFromBarChart ||
    !responseFromPieChart
  ) {
    const response: CustomResponse = {
      status: "ERR",
      message: "Error while getting all routes combined data",
    };
    return response;
  }
  const data: CombinedDataResponse = {
    tableData: responseFromTable,
    statisticsData: responseFromStatistics,
    barChartData: responseFromBarChart,
    pieChartData: responseFromPieChart,
  };
  const response: CustomResponse = {
    status: "OK",
    data: data,
  };
  return response;
}
