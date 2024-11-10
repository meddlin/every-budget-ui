'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Papa from 'papaparse';

interface BankTransaction {
  postingDate: string
  effectiveDate: string
  transactionType: string
  amount: string
  checkNumber: string
  referenceNumber: string
  description: string
  transactionCategory: string
  type: string
  balance: string
  memo: string
  extendedDescription: string
}

export default function CsvUploader() {
  const [transactions, setTransactions] = useState<BankTransaction[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseBankCsv = (csvData: string): BankTransaction[] => {
    const parsed = Papa.parse<BankTransaction>(csvData, {
      header: true,
      quoteChar: '"',
      dynamicTyping: true,
      transformHeader: (header) => {
        let parts = header.split(' ')
        let first = parts[0].toLowerCase()
        return [first, parts.slice(1)].join('')
      }
    });

    return parsed.data;
  }

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setError(null)

    if (file) {
      if (file.type !== "text/csv") {
        setError("Please upload a valid CSV file.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string

        const typedCsvTest = parseBankCsv(content);
        // console.log('------------------------')
        // console.log('------------------------')
        // console.log('------------------------')
        // console.log(JSON.stringify(typedCsvTest))
        // console.log('------------------------')
        // console.log('------------------------')
        // console.log('------------------------')

        const csv = Papa.parse(content, {
          quoteChar: '"'
        });

        const headers: string[] = csv.data[0] as string[]
        setHeaders(headers)

        setTransactions(typedCsvTest)
      }
      reader.readAsText(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bank Transaction CSV Uploader</h1>
      <div className="mb-4 flex flex-row justify-between items-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelection}
          className="sr-only"
          ref={fileInputRef}
          aria-label="Select CSV file"
        />
        <Button onClick={handleButtonClick}>Select CSV</Button>

        <Button onClick={() => alert('clicked upload')}>Upload</Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {transactions.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.postingDate}</TableCell>
                  <TableCell>{transaction.effectiveDate}</TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.checkNumber}</TableCell>
                  <TableCell>{transaction.referenceNumber}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.transactionCategory}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.balance}</TableCell>
                  <TableCell>{transaction.memo}</TableCell>
                  <TableCell>{transaction.extendedDescription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}