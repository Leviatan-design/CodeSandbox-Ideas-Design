import { Button } from "./ui/button";
import { TechTag } from "./TechTag";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

interface FilterBarProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const categories = [
  { id: "all", label: "Todos" },
  { id: "animations", label: "Animaciones CSS" },
  { id: "components", label: "Componentes" },
  { id: "effects", label: "Efectos Hover" },
  { id: "layouts", label: "Layouts" },
  { id: "interactive", label: "Interactividad JS" },
  { id: "api", label: "APIs & Fetch" },
];

const technologies: Array<"html" | "css" | "javascript" | "react" | "vue" | "typescript"> = [
  "html",
  "css",
  "javascript",
  "react",
  "vue",
  "typescript",
];

export function FilterBar({ selectedFilters, onFilterChange }: FilterBarProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleFilter = (filterId: string) => {
    if (filterId === "all") {
      onFilterChange([]);
      return;
    }

    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter((f) => f !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Categories */}
      <div>
        <h4 className="text-sm text-muted-foreground mb-3">Categorías</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                category.id === "all" && selectedFilters.length === 0
                  ? "default"
                  : selectedFilters.includes(category.id)
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => toggleFilter(category.id)}
              className={
                category.id === "all" && selectedFilters.length === 0
                  ? "bg-primary hover:bg-primary/90"
                  : selectedFilters.includes(category.id)
                  ? "bg-primary hover:bg-primary/90"
                  : ""
              }
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h4 className="text-sm text-muted-foreground mb-3">Tecnologías</h4>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleFilter(tech)}
              className={`transition-opacity ${
                selectedFilters.includes(tech) ? "opacity-100" : "opacity-50 hover:opacity-75"
              }`}
            >
              <TechTag tech={tech} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-4">
          <h3>Filtros</h3>
          {selectedFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <div className="flex items-center justify-between mb-4">
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
                {selectedFilters.length > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {selectedFilters.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Limpiar
              </Button>
            )}
          </div>
          <SheetContent side="left" className="w-[300px] bg-[var(--background-elevated)]">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
