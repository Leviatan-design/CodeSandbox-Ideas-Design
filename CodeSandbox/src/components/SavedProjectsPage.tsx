import { useState, useEffect } from "react";
import { Header } from "./Header";
import { IdeaCard } from "./IdeaCard";
import { Button } from "./ui/button";
import { FolderOpen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface SavedProject {
  id: string;
  title: string;
  description: string;
  tags: Array<"html" | "css" | "javascript" | "react" | "vue" | "typescript">;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  thumbnail?: string;
  lastModified: number;
}

interface SavedProjectsPageProps {
  onOpenProject: (project: SavedProject) => void;
  onNavigate?: (view: "home" | "saved" | "profile") => void;
}

export function SavedProjectsPage({ onOpenProject, onNavigate }: SavedProjectsPageProps) {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const saved = localStorage.getItem("csi-saved-projects");
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const updated = savedProjects.filter((p) => p.id !== projectId);
    setSavedProjects(updated);
    localStorage.setItem("csi-saved-projects", JSON.stringify(updated));
    setProjectToDelete(null);
  };

  const generateThumbnail = () => {
    // For now, use a placeholder
    return "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwZGFya3xlbnwxfHx8fDE3NjEyOTA4NTJ8MA&ixlib=rb-4.1.0&q=80&w=400";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={onNavigate} currentView="saved" />

      <section className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderOpen className="h-6 w-6 text-primary" />
            <h1>Mis Proyectos</h1>
          </div>
          <p className="text-muted-foreground">
            {savedProjects.length === 0
              ? "Aún no has guardado ningún proyecto"
              : `${savedProjects.length} proyecto${savedProjects.length === 1 ? "" : "s"} guardado${savedProjects.length === 1 ? "" : "s"}`}
          </p>
        </div>

        {savedProjects.length === 0 ? (
          <div className="text-center py-16 md:py-24">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="mb-2">No hay proyectos guardados</h3>
            <p className="text-muted-foreground mb-6">
              Crea y guarda proyectos desde el sandbox
            </p>
            <Button onClick={() => onNavigate?.("home")} className="bg-primary hover:bg-primary/90">
              Explorar Ideas
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {savedProjects.map((project) => (
              <div key={project.id} className="relative group">
                <IdeaCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  previewImage={project.thumbnail || generateThumbnail()}
                  views={0}
                  likes={0}
                  onTry={() => onOpenProject(project)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProjectToDelete(project.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <AlertDialog open={projectToDelete !== null} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El proyecto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => projectToDelete && handleDeleteProject(projectToDelete)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
