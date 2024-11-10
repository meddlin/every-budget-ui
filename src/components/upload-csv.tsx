'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

type Transaction = {
  date: string
  description: string
  amount: string
  [key: string]: string
}

export default function CsvUploader() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        const lines = content.split('\n')
        
        if (lines.length < 2) {
          setError("The CSV file appears to be empty or invalid.")
          return
        }

        const headers = lines[0].split(',').map(header => header.trim())
        setHeaders(headers)

        const parsedTransactions = lines.slice(1).map(line => {
          const values = line.split(',')
          const transaction: Transaction = {} as Transaction
          headers.forEach((header, index) => {
            transaction[header] = values[index]?.trim() ?? ''
          })
          return transaction
        }).filter(transaction => Object.values(transaction).some(value => value !== ''))

        setTransactions(parsedTransactions)
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
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="sr-only"
          ref={fileInputRef}
          aria-label="Upload CSV file"
        />
        <Button onClick={handleButtonClick}>Upload CSV</Button>
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
                  {headers.map((header, cellIndex) => (
                    <TableCell key={cellIndex}>{transaction[header]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}