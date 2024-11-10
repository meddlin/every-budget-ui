'use client'

import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useBudget } from "@/lib/fetchers";


export default function Budget() {
    const { budget, isLoadingBudget, isErrorBudget } = useBudget();

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col min-w-96">
                <Input type="search" placeholder="Search here..."
                    className="my-8"
                />

                {budget && budget.categories ? (
                    budget.categories.map((category: any, idx: string) => (
                        <Card key={idx}>
                            <CardHeader>
                                <CardTitle>{category.name}</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    {category.budgetItems.map((budgetItem: any, bi_idx: string) => (
                                        <li key={bi_idx} className="my-4">
                                            <div>{budgetItem.name}</div>
                                            <div>Planned: {budgetItem.planned}</div>
                                            <div>Spent: {budgetItem.spent}</div>

                                            <Dialog>
                                                <DialogTrigger>View transactions</DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Transactions</DialogTitle>
                                                        <DialogDescription>
                                                            description
                                                        </DialogDescription>
                                                        <ul>
                                                            {budgetItem.transactions.map((transaction: any, t_idx: string) => (
                                                                <li key={t_idx}>
                                                                    <div>{transaction.vendor}</div>
                                                                    <div>{transaction.amount}</div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>
                    ))
                ) : 'No budget data to show.'}
            </div>
        </div>
    );
}