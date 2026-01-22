interface DataRowProps {
  label: string;
  value: string | React.ReactNode;
}

export default function DataRow({ label, value }: DataRowProps) {
  return (
    <tr className="border-b border-black/10 last:border-b-0">
      <td className="w-[120px] lg:w-[260px] py-3 lg:py-4 pr-4 lg:pr-6 align-middle border-r border-black/10">
        <p className="text-[12px] lg:text-[16px] font-light">
          {label}
        </p>
      </td>
      <td className="py-3 lg:py-4 pl-4 lg:pl-6 align-middle">
        {typeof value === "string" ? (
          <p className="text-[12px] lg:text-[16px] font-light">
            {value || "-"}
          </p>
        ) : (
          value
        )}
      </td>
    </tr>
  );
}
