"use client";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  role?: string;
  enableSearch?: boolean;
  showNotifications?: boolean;
}

export default function DashboardHeader({ title, subtitle, actions }: DashboardHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-12 lg:hidden flex-shrink-0" />
        <h1 className="flex-1 min-w-0 text-lg sm:text-2xl font-bold text-foreground">
          {title}
        </h1>
        {actions && <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">{actions}</div>}
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-muted mt-1 pl-14 lg:pl-0 pr-4 leading-relaxed break-words">{subtitle}</p>
      )}
    </div>
  );
}