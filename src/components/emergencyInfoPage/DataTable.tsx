interface DataTableProps {
  column1Label: string;
  column2Label: string;
  children: React.ReactNode;
}

export default function DataTable({
  column1Label,
  column2Label,
  children,
}: DataTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-black/10">
          <th className="py-3 lg:py-4 pr-4 lg:pr-6 text-left border-r border-black/10">
            <p className="text-[12px] lg:text-[14px] font-medium">
              {column1Label}
            </p>
          </th>
          <th className="py-3 lg:py-4 pl-4 lg:pl-6 text-left">
            <p className="text-[12px] lg:text-[14px] font-medium">
              {column2Label}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
