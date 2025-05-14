import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    return savedTheme || (prefersDark ? "dark" : "light");
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };
  return (    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 bg-foreground dark:bg-background text-background dark:text-foreground border border-foreground/20 dark:border-background/20 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
      aria-label="Alternar tema"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-500 ease-out dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 ease-out dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
