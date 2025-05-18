import { Home, Star, Search, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Star, label: "Favoritos", href: "/favorites" },
    { icon: Search, label: "Pesquisar", href: "/search" },
    { icon: Settings, label: "Configurações", href: "/settings" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64">
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onOpenChange(false)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}