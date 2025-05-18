import { Navbar } from "@/components/navbar";
import { useAuth } from "@/contexts/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-muted mt-auto py-6">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground text-center text-sm">
            © {new Date().getFullYear()} Tivix Finmarket Explorer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}