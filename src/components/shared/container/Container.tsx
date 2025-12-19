import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={twMerge(
        `xs:max-w-full sm:max-w-160 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl px-6 lg:px-15 mx-auto`,
        className
      )}
    >
      {children}
    </div>
  );
}
