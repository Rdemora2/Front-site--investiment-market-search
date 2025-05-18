import { useState, Suspense, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { AuthProvider } from "@/contexts/auth-context";
import { useAuth } from "@/contexts/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { StockDashboard } from "@/components/stock/stock-dashboard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function AppContent() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme === "system" ? (prefersDark ? "dark" : "light") : savedTheme;
    document.documentElement.classList.add(theme);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <AuthLayout>
        <AuthForm />
      </AuthLayout>
    );
  }

  return (
    <DashboardLayout>
      <StockDashboard />
    </DashboardLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;