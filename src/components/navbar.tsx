import { Menu, MoonStar, Sun } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-muted/80 shadow-md backdrop-blur-md border-b border-muted dark:bg-muted/30"
          : "bg-muted/90 text-foreground dark:bg-background/80 dark:text-primary-foreground"
      } ${className}`}
    >      <section className="py-4">
        <div className="container">
          {/* Desktop Menu */}
          <nav className="hidden justify-between lg:flex h-20 items-center">
            <div className="flex items-center gap-6">
              {/* Logo com margem à esquerda adicionada */}
              <a href="/" className="flex items-center gap-2 relative w-24 h-12 ml-4">
                <div className="relative w-full h-full">
                  {/* Logo para tema claro */}
                  <img 
                    src="/logo-tivix-full-light.png" 
                    alt="Tivix Logo" 
                    className="h-auto w-auto max-h-12 absolute top-0 left-0 transition-opacity duration-300 dark:opacity-0"
                    style={{maxHeight: "45px"}}
                  />
                  {/* Logo para tema escuro */}
                  <img 
                    src="/logo-tivix-full.png" 
                    alt="Tivix Logo" 
                    className="h-auto w-auto max-h-12 absolute top-0 left-0 transition-opacity duration-300 opacity-0 dark:opacity-100"
                    style={{maxHeight: "45px"}}
                  />
                </div>
              </a>
              
              <div className="flex items-center">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menu.map((item) => renderMenuItem(item))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {/* ThemeToggle Button com contraste melhorado */}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full w-9 h-9 bg-foreground/90 dark:bg-background/90 text-background dark:text-foreground border border-foreground/20 dark:border-background/20 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                aria-label="Alternar tema"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-500 ease-out dark:rotate-90 dark:scale-0" />
                <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 ease-out dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </nav>          {/* Mobile Menu */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between h-16">
              {/* Logo com margem à esquerda adicionada */}
              <div className="flex items-center gap-2">
                <a href="/" className="flex items-center gap-2 relative w-20 h-10 ml-2">
                  <div className="relative w-full h-full">
                    {/* Logo para tema claro */}
                    <img 
                      src="/logo-tivix-full-light.png" 
                      alt="Tivix Logo" 
                      className="h-auto w-auto max-h-10 absolute top-0 left-0 transition-opacity duration-300 dark:opacity-0"
                      style={{maxHeight: "40px"}}
                    />
                    {/* Logo para tema escuro */}
                    <img 
                      src="/logo-tivix-full.png" 
                      alt="Tivix Logo" 
                      className="h-auto w-auto max-h-10 absolute top-0 left-0 transition-opacity duration-300 opacity-0 dark:opacity-100"
                      style={{maxHeight: "40px"}}
                    />
                  </div>
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                {/* ThemeToggle Button com contraste melhorado */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleTheme}
                  className="rounded-full w-9 h-9 bg-foreground/90 dark:bg-background/90 text-background dark:text-foreground border border-foreground/20 dark:border-background/20 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  aria-label="Alternar tema"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-500 ease-out dark:rotate-90 dark:scale-0" />
                  <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 ease-out dark:rotate-0 dark:scale-100" />
                </Button>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-foreground/10 dark:bg-background/10 hover:bg-foreground/20 dark:hover:bg-background/20 text-foreground dark:text-background"
                    >
                      <Menu className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>
                        <a href="/" className="flex items-center gap-2 relative w-20 h-6">
                          <div className="relative w-full h-full">
                            {/* Logo para tema claro */}
                            <img 
                              src="/logo-tivix-full-light.png" 
                              alt="Tivix Logo" 
                              className="h-5 w-auto absolute top-0 left-0 transition-opacity duration-300 dark:opacity-0"
                              style={{maxHeight: "45px"}}
                            />
                            {/* Logo para tema escuro */}
                            <img 
                              src="/logo-tivix-full.png" 
                              alt="Tivix Logo" 
                              className="h-5 w-auto absolute top-0 left-0 transition-opacity duration-300 opacity-0 dark:opacity-100"
                              style={{maxHeight: "45px"}}
                            />
                          </div>
                        </a>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 p-4">
                      <Accordion
                        type="single"
                        collapsible
                        className="flex w-full flex-col gap-4"
                      >
                        {menu.map((item) => renderMobileMenuItem(item))}
                      </Accordion>
                    </div>
                  </SheetContent>
                </Sheet>
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
        <NavigationMenuTrigger className="bg-background/80 dark:bg-foreground/5 text-foreground dark:text-background hover:bg-muted/50 dark:hover:bg-foreground/10">{item.title}</NavigationMenuTrigger>
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
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background/80 dark:bg-foreground/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground text-foreground dark:text-background"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline text-foreground dark:text-background">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold text-foreground dark:text-background">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground text-foreground dark:text-background"
      href={item.url}
    >
      <div className="text-foreground dark:text-background">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold text-foreground dark:text-background">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground dark:text-background/70">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};
