import { useState } from "react";
import { Header } from "./Header";
import { FilterBar } from "./FilterBar";
import { IdeaCard } from "./IdeaCard";
import { Sparkles } from "lucide-react";

interface Idea {
  id: string;
  title: string;
  description: string;
  tags: Array<"html" | "css" | "javascript" | "react" | "vue" | "typescript">;
  previewImage: string;
  views: number;
  likes: number;
  category: string[];
}

const mockIdeas: Idea[] = [
  {
    id: "1",
    title: "Centrar un Div - La Guía Definitiva",
    description: "Aprende todas las formas modernas de centrar elementos en CSS usando Flexbox y Grid.",
    tags: ["html", "css"],
    previewImage: "https://images.unsplash.com/photo-1639091180257-8486fcd75a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjc3MlMjBhbmltYXRpb24lMjB3ZWJ8ZW58MXx8fHwxNzYxMzI3NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 12543,
    likes: 892,
    category: ["layouts", "css"],
  },
  {
    id: "2",
    title: "Animación de Botón con Hover Effect",
    description: "Crea un botón interactivo con efectos de hover y animaciones CSS suaves.",
    tags: ["html", "css"],
    previewImage: "https://images.unsplash.com/photo-1612936008632-9b6dafe9c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGRlc2lnbnxlbnwxfHx8fDE3NjEzMTE4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 8921,
    likes: 654,
    category: ["effects", "animations", "css"],
  },
  {
    id: "3",
    title: "Fetch API con Async/Await",
    description: "Aprende a consumir APIs REST usando fetch con async/await y manejo de errores.",
    tags: ["javascript"],
    previewImage: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGklMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzYxMzE1NzQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 15234,
    likes: 1203,
    category: ["api", "javascript"],
  },
  {
    id: "4",
    title: "Componente de Tarjeta en React",
    description: "Construye un componente de tarjeta reutilizable con props y estados.",
    tags: ["react", "javascript"],
    previewImage: "https://images.unsplash.com/photo-1617136041743-451cb49648b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGludGVyZmFjZSUyMHVpfGVufDF8fHx8MTc2MTMyNzU1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 9876,
    likes: 743,
    category: ["components", "react"],
  },
  {
    id: "5",
    title: "Grid Layout Responsivo",
    description: "Crea un sistema de grid moderno que se adapta a diferentes tamaños de pantalla.",
    tags: ["html", "css"],
    previewImage: "https://images.unsplash.com/photo-1742072594003-abf6ca86e154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwY29kZSUyMHNjcmVlbnxlbnwxfHx8fDE3NjEyMjM5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 11234,
    likes: 876,
    category: ["layouts", "css"],
  },
  {
    id: "6",
    title: "Modal / Popup Interactivo",
    description: "Crea modals elegantes con animaciones y manejo de eventos.",
    tags: ["html", "css", "javascript"],
    previewImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2RhbCUyMHBvcHVwJTIwZGVzaWdufGVufDF8fHx8MTc2MTMyODA5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 13456,
    likes: 1032,
    category: ["interactive", "components", "javascript"],
  },
  {
    id: "8",
    title: "Loading Spinner Animado",
    description: "Diferentes estilos de spinners de carga con animaciones CSS puras.",
    tags: ["html", "css"],
    previewImage: "https://images.unsplash.com/photo-1661313563001-c689cc83790c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2FkaW5nJTIwc3Bpbm5lciUyMGFuaW1hdGlvbnxlbnwxfHx8fDE3NjEzMjgwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 10234,
    likes: 823,
    category: ["animations", "components", "css"],
  },
  {
    id: "7",
    title: "Formulario con Validación",
    description: "Sistema de validación de formularios con feedback visual en tiempo real.",
    tags: ["html", "css", "javascript"],
    previewImage: "https://images.unsplash.com/photo-1740818576322-923d300dcb95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtJTIwdmFsaWRhdGlvbiUyMGNvZGV8ZW58MXx8fHwxNzYxMzI4MDk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 14567,
    likes: 1123,
    category: ["interactive", "components", "javascript"],
  },
];

interface HomePageProps {
  onTrySandbox: (ideaId: string) => void;
  onNavigate?: (view: "home" | "saved" | "profile") => void;
}

export function HomePage({ onTrySandbox, onNavigate }: HomePageProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIdeas = mockIdeas.filter((idea) => {
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !idea.title.toLowerCase().includes(query) &&
        !idea.description.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Filter by selected filters
    if (selectedFilters.length === 0) return true;

    return selectedFilters.some(
      (filter) =>
        idea.category.includes(filter) || idea.tags.includes(filter as any)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} onNavigate={onNavigate} currentView="home" />

      {/* Hero Section */}
      <section className="border-b border-border bg-[var(--background-elevated)]">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 text-center">
          <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 md:px-4 py-1.5 md:py-2 border border-primary/20">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              <span className="text-xs md:text-sm text-primary">
                +200 ideas de proyectos listas para usar
              </span>
            </div>
            
            <h1 className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent px-4">
              Deja de hacer "To-Do Lists".
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Construye esto.
            </h1>
            
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Descubre proyectos reales, resuelve problemas comunes y mejora tus
              habilidades probando código directamente en tu navegador.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <FilterBar
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
        </div>

        {/* Ideas Grid */}
        <div>
          <div className="mb-4 md:mb-6 flex items-center justify-between">
            <h2>
              {selectedFilters.length > 0
                ? `${filteredIdeas.length} ideas encontradas`
                : "Todas las ideas"}
            </h2>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                description={idea.description}
                tags={idea.tags}
                previewImage={idea.previewImage}
                views={idea.views}
                likes={idea.likes}
                onTry={onTrySandbox}
              />
            ))}
          </div>

          {filteredIdeas.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <p className="text-muted-foreground">
                No se encontraron ideas con los filtros seleccionados.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
