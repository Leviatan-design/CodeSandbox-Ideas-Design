import { Search, Code2, Moon, Sun, Menu, BookMarked, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onNavigate?: (view: "home" | "saved" | "profile") => void;
  currentView?: string;
}

export function Header({ onSearch, onNavigate, currentView = "home" }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[var(--background-elevated)] backdrop-blur supports-[backdrop-filter]:bg-[var(--background-elevated)]/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text font-mono font-semibold text-transparent">
            CodeSandbox Ideas
          </span>
          <span className="sm:hidden bg-gradient-to-r from-primary via-accent to-primary bg-clip-text font-mono font-semibold text-transparent">
            CSI
          </span>
        </div>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden flex-1 max-w-md mx-8 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar ideas, soluciones, snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--input-background)] pl-10 border-border focus:ring-primary"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant={currentView === "saved" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onNavigate?.("saved")}
              className="gap-2"
            >
              <BookMarked className="h-4 w-4" />
              Guardados
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-lg"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[var(--background-elevated)]">
              <div className="flex flex-col gap-4 mt-8">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[var(--input-background)] pl-10 border-border"
                    />
                  </div>
                </form>

                <div className="flex flex-col gap-2">
                  <Button
                    variant={currentView === "home" ? "secondary" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => {
                      onNavigate?.("home");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Code2 className="h-4 w-4" />
                    Explorar Ideas
                  </Button>
                  <Button
                    variant={currentView === "saved" ? "secondary" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => {
                      onNavigate?.("saved");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <BookMarked className="h-4 w-4" />
                    Mis Proyectos
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
