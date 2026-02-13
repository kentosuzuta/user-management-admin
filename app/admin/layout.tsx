import { AdminLayout } from "../components/layout/AdminLayout";
import { AdminProvider } from "./context/AdminProvider";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminProvider>
  );
}
