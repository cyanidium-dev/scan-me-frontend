import Image from "next/image";

interface WhyUsListProps {
  list: { title: string; description: string; icon: string }[];
}

export default function WhyUsList({ list }: WhyUsListProps) {
  return (
    <ul className="flex flex-col gap-2.5">
      {list.map(({ title, description, icon }, idx) => (
        <li
          key={idx}
          className="p-4 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.05)] rounded-[16px]"
        >
          <div className="flex gap-4 items-center mb-4.5">
            <div className="flex items-center justify-center size-12 lg:size-26 rounded-[12px] bg-accent/10 shrink-0">
              <Image
                src={icon}
                width={24}
                height={24}
                alt="icon"
                className="size-6 lg:size-16.5"
              />
            </div>
            <div>
              <h3 className="lg:mb-4 text-[18px] lg:text-[20px] font-semibold leading-[120%] uppercase">
                {title}
              </h3>
              <p className="hidden lg:block whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>
          <p className="lg:hidden whitespace-pre-line">{description}</p>
        </li>
      ))}
    </ul>
  );
}
