interface DataSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
}

export default function DataSection({
  title,
  children,
  className = "",
  isLast = false,
}: DataSectionProps) {
  return (
    <section
      className={`bg-white rounded-[16px] lg:shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1)] lg:px-6 lg:py-8 ${isLast ? "" : "mb-12 lg:mb-6"} ${className}`}
    >
      <h2 className="text-[24px] lg:text-[32px] font-semibold leading-[120%] uppercase mb-6 lg:mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}
