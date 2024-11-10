'use client'

import { CalendarIcon, CreditCard, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useTransactions } from '@/lib/fetchers';
import EditTransaction from "@/components/forms/transaction-edit"
import EditTransactionForm from "@/components/forms/transaction-edit"

// Sample data for demonstration
const transactions = [
    {
        id: 1,
        dateUpdated: "2023-06-01T10:00:00Z",
        vendor: "Grocery Store",
        amount: -75.50,
        transactionDate: "2023-05-31T15:30:00Z"
    },
    {
        id: 2,
        dateUpdated: "2023-06-02T09:15:00Z",
        vendor: "Gas Station",
        amount: -45.00,
        transactionDate: "2023-06-01T18:45:00Z"
    },
    {
        id: 3,
        dateUpdated: "2023-06-03T11:30:00Z",
        vendor: "Online Retailer",
        amount: -120.99,
        transactionDate: "2023-06-02T14:20:00Z"
    },
    {
        id: 4,
        dateUpdated: "2023-06-04T08:45:00Z",
        vendor: "Salary Deposit",
        amount: 2500.00,
        transactionDate: "2023-06-03T00:01:00Z"
    },
    {
        id: 5,
        dateUpdated: "2023-06-05T13:20:00Z",
        vendor: "Restaurant",
        amount: -65.75,
        transactionDate: "2023-06-04T20:15:00Z"
    }
]

export default function Transactions() {
    const { fetchedTransactions, isLoadingTransactions, isErrorTransactions } = useTransactions();

    // Function to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Function to format amount
    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            signDisplay: 'always'
        }).format(amount)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Bank Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">
                                <div className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    Date Updated
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Vendor
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    Amount
                                </div>
                            </TableHead>
                            <TableHead className="w-[180px]">
                                <div className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    Transaction Date
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fetchedTransactions.map((transaction: any) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{formatDate(transaction.dateUpdated)}</TableCell>
                                <TableCell>{transaction.vendor}</TableCell>
                                <TableCell className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                                    {formatAmount(transaction.amount)}
                                </TableCell>
                                <TableCell>{formatDate(transaction.transactionDate)}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger>EDIT</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Transaction</DialogTitle>
                                                {/* <DialogDescription>
                                                    description goes here
                                                </DialogDescription> */}
                                                <EditTransactionForm transaction={transaction} />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}