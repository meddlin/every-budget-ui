function transformCsvData(csvData) {
    const newData = [];
    for (const row of csvData) {
        newData.push({
            amount: row['Amount'],
            balance: row['Balance'],
            checkNumber: row['Check Number'],
            description: row['Description'],
            effectiveDate: row['Effective Date'],
            extendedDescription: row['Extended Description'],
            memo: row['Memo'],
            postingDate: row['Posting Date'],
            referenceNumber: row['Reference Number'],
            transactionCategory: row['Transaction Category'],
            transactionId: row['Transaction ID'],
            transactionType: row['Transaction Type'],
            type: row['Type']
        })
    }

    return newData;
}

export { transformCsvData };