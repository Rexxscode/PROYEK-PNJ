import Sidebar from "../components/layout/sidebar";

export default function IndustryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="industry" currentPath="/industry" />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}