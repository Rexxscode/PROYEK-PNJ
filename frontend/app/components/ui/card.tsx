import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border p-6",
        hover && "hover:shadow-md hover:border-primary/20 transition-all cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}