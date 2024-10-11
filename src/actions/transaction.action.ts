"use server";
import TransactionModel from "@/models/transaction.model";
import dbConnect from "@/lib/mongodb";
import {
  CustomResponse,
  TransactionStatisticsDataResponse,
  TransactionTableDataResponse,
} from "@/lib/interfaces";
import { MonthToNumber, monthNameToNumber } from "@/lib/data";

function MapMonthNameToNumber(month: string) {
  return monthNameToNumber[month as keyof MonthToNumber];
}
export async function getTransactionsOfTheSelectedMonthForTable(
  selectedMonth: string = "Mar",
  pageNumber: number = 1,
  perPageTransactions: number = 10,
  search: string = ""
) {
  if (perPageTransactions < 1 || perPageTransactions < 1) {
    const response: CustomResponse = {
      status: "ERR",
      message: `Invalid Page Number or Per Page Transaction!`,
    };
    return response;
  }
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
    ])
      .skip((pageNumber - 1) * perPageTransactions)
      .limit(perPageTransactions);

    const res: TransactionTableDataResponse = {
      transactions: transactionsOfTheSelectedMonth,
      countOfTransactions: transactionsOfTheSelectedMonth.length,
      pageNumber,
      perPageTransactions,
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
      totalNumberOfItemsNotSold:
        transactions.length - itemsSold.length,
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
