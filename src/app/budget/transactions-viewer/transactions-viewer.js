import { 
  useReactTable, 
  getCoreRowModel,
  createColumnHelper, 
  flexRender, 
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("vendor", {
    header: () => <h3>Vendor</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: () => <h3>Amount</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("transactionDate", {
    header: () => <h3>Transaction Date</h3>,
    cell: (info) => {
      return (
        new Date(info.getValue()).toLocaleDateString()
      );
    },
  }),
];

const TransactionsViewer = ({ transactions }) => {
    // const header = transactions && transactions.length > 0 ? Object.keys(transactions[0]) : [];
    const table = useReactTable({
        columns,
    data: transactions && transactions.length > 0 ? transactions : [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h2>Transactions</h2>
      <div className="flex justify-center content-center">
        <div className="">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="leading-4 text-sm hover:bg-slate-100 hover:cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionsViewer;
