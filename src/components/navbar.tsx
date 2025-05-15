import { MoonStar, Sun } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type Theme = "dark" | "light" | "system";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NewNavbarProps {
  className?: string;
  menu?: MenuItem[];
}

export function Navbar({
  className,
  menu = [
    { title: "Início", url: "/" },
    { title: "Pesquisar", url: "#stock-search-form" },
  ],
}: NewNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return savedTheme || (prefersDark ? "dark" : "light");
    }
    return "light";
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }

      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };
  return (
    <header
      className={`sticky top-0 z-40 min-h-[50px] w-full py-[10px] transition-all duration-300 ${
        scrolled
          ? "bg-muted/80 border-muted dark:bg-muted/30 border-b shadow-md backdrop-blur-md"
          : "bg-muted/90 text-foreground dark:bg-background/80 dark:text-primary-foreground"
      } ${className}`}
    >
      <section className="flex h-full items-center">
        <div className="container mx-auto px-6">
          {/* Desktop Menu */}
          <nav className="hidden min-h-[50px] items-center justify-between lg:flex">
            {/* Logo na lateral esquerda */}{" "}
            <a href="/" className="relative flex h-[45px] w-auto items-center justify-center">
              <div className="relative ml-2 flex h-[45px] w-auto items-center">
                {/* Logo para tema claro */}
                <img
                  src="/logo-tivix-full-light.png"
                  alt="Tivix Logo"
                  className="absolute top-0 left-0 ml-[15px] h-[45px] w-auto px-8 transition-opacity duration-300 dark:opacity-0"
                />
                {/* Logo para tema escuro */}
                <img
                  src="/logo-tivix-full.png"
                  alt="Tivix Logo"
                  className="absolute top-0 left-0 ml-[15px] h-[45px] w-auto opacity-0 transition-opacity duration-300 dark:opacity-100"
                />
              </div>
            </a>
            <div className="flex items-center justify-center gap-6">
              {/* Itens de menu no meio */}
              <NavigationMenu>
                <NavigationMenuList className="flex items-center">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>

              {/* ThemeToggle Button na lateral direita */}
              <div className="ml-6 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="bg-foreground/90 dark:bg-background/90 text-background dark:text-foreground border-foreground/20 dark:border-background/20 relative h-9 w-9 overflow-hidden rounded-full border shadow-sm transition-all duration-300 hover:shadow-md"
                  aria-label="Alternar tema"
                >
                  <Sun className="h-5 w-5 scale-100 rotate-0 transition-transform duration-500 ease-out dark:scale-0 dark:rotate-90" />
                  <MoonStar className="absolute h-5 w-5 scale-0 rotate-90 transition-transform duration-500 ease-out dark:scale-100 dark:rotate-0" />
                </Button>
              </div>
            </div>
          </nav>{" "}
          {/* Mobile Menu */}
          <div className="block lg:hidden">
            {" "}
            <div className="flex min-h-[50px] items-center justify-between">
              {/* Logo à esquerda */}
              <a href="/" className="relative flex h-[40px] w-auto items-center justify-center">
                <div className="relative flex h-[40px] w-auto items-center">
                  {/* Logo para tema claro */}
                  <img
                    src="/logo-tivix-full-light.png"
                    alt="Tivix Logo"
                    className="absolute top-0 left-0 ml-[15px] h-[40px] w-auto transition-opacity duration-300 dark:opacity-0"
                  />
                  {/* Logo para tema escuro */}
                  <img
                    src="/logo-tivix-full.png"
                    alt="Tivix Logo"
                    className="absolute top-0 left-0 ml-[15px] h-[40px] w-auto opacity-0 transition-opacity duration-300 dark:opacity-100"
                  />
                </div>
              </a>
              {/* Botões à direita */}{" "}
              <div className="mr-[15px] flex items-center justify-center gap-2">
                {/* ThemeToggle Button com contraste melhorado */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="bg-foreground/90 dark:bg-background/90 text-background dark:text-foreground border-foreground/20 dark:border-background/20 relative h-9 w-9 overflow-hidden rounded-full border shadow-sm transition-all duration-300 hover:shadow-md"
                  aria-label="Alternar tema"
                >
                  <Sun className="h-5 w-5 scale-100 rotate-0 transition-transform duration-500 ease-out dark:scale-0 dark:rotate-90" />
                  <MoonStar className="absolute h-5 w-5 scale-0 rotate-90 transition-transform duration-500 ease-out dark:scale-100 dark:rotate-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-background/80 dark:bg-foreground/5 text-foreground dark:text-background hover:bg-muted/50 dark:hover:bg-foreground/10 flex items-center">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-background text-foreground dark:bg-foreground/5 dark:text-background">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      {" "}
      <NavigationMenuLink
        href={item.url}
        className="group bg-background/80 dark:bg-foreground/5 hover:bg-muted hover:text-accent-foreground text-foreground dark:text-background flex inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="hover:bg-muted hover:text-accent-foreground text-foreground dark:text-background flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
      href={item.url}
    >
      <div className="text-foreground dark:text-background">{item.icon}</div>
      <div>
        <div className="text-foreground dark:text-background text-sm font-semibold">
          {item.title}
        </div>
        {item.description && (
          <p className="text-muted-foreground dark:text-background/70 text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};
