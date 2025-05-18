import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.02]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative flex h-12 items-center">
            <img
              src="/logo-tivix-full-light.png"
              alt="Tivix Logo"
              className="h-full w-auto transition-opacity duration-300 dark:opacity-0"
            />
            <img
              src="/logo-tivix-full.png"
              alt="Tivix Logo"
              className="absolute left-0 h-full w-auto opacity-0 transition-opacity duration-300 dark:opacity-100"
            />
          </div>
        </div>

        {/* Auth Form Container */}
        <Card className="w-full max-w-[420px] p-8 shadow-xl">
          {children}
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Tivix Finmarket Explorer. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}