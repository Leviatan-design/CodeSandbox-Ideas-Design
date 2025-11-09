import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CodeEditor } from "./CodeEditor";
import { PreviewPanel } from "./PreviewPanel";
import {
  Play,
  Save,
  Share2,
  Copy,
  ArrowLeft,
  RotateCcw,
  Download,
  Maximize2,
  Minimize2,
  Palette,
  Monitor,
  Smartphone,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";

interface SandboxPageProps {
  onBack: () => void;
  initialIdea?: {
    id?: string;
    title: string;
    htmlCode: string;
    cssCode: string;
    jsCode: string;
  };
}

export function SandboxPage({ onBack, initialIdea }: SandboxPageProps) {
  const [htmlCode, setHtmlCode] = useState(
    initialIdea?.htmlCode ||
      `<!DOCTYPE html>
<div class="container">
  <h1>Hola Mundo</h1>
  <p>Empieza a editar el código para ver los cambios en tiempo real.</p>
  <button id="btn">Haz clic aquí</button>
</div>`
  );

  const [cssCode, setCssCode] = useState(
    initialIdea?.cssCode ||
      `body {
  margin: 0;
  padding: 20px;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
  max-width: 500px;
}

h1 {
  color: #333;
  margin: 0 0 16px 0;
}

p {
  color: #666;
  margin: 0 0 24px 0;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}`
  );

  const [jsCode, setJsCode] = useState(
    initialIdea?.jsCode ||
      `// JavaScript
const button = document.getElementById('btn');
let clickCount = 0;

button.addEventListener('click', () => {
  clickCount++;
  console.log('¡Botón clickeado! Total de clicks: ' + clickCount);
  button.textContent = 'Clicks: ' + clickCount;
});

console.log('Script cargado correctamente');`
  );

  const [originalCode] = useState({ html: htmlCode, css: cssCode, js: jsCode });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [projectTitle, setProjectTitle] = useState(initialIdea?.title || "Nuevo Proyecto");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      const currentProject = {
        id: initialIdea?.id || `project-${Date.now()}`,
        title: projectTitle,
        htmlCode,
        cssCode,
        jsCode,
        lastModified: Date.now(),
      };
      localStorage.setItem("csi-current-project", JSON.stringify(currentProject));
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [htmlCode, cssCode, jsCode, projectTitle, initialIdea?.id]);

  const handleCodeChange = (type: "html" | "css" | "js", code: string) => {
    switch (type) {
      case "html":
        setHtmlCode(code);
        break;
      case "css":
        setCssCode(code);
        break;
      case "js":
        setJsCode(code);
        break;
    }
  };

  const handleRun = () => {
    toast.success("Código ejecutado");
  };

  const handleSave = () => {
    const savedProjects = JSON.parse(
      localStorage.getItem("csi-saved-projects") || "[]"
    );
    
    const projectId = initialIdea?.id || `project-${Date.now()}`;
    const existingIndex = savedProjects.findIndex((p: any) => p.id === projectId);
    
    const project = {
      id: projectId,
      title: projectTitle,
      description: "Proyecto personalizado",
      tags: ["html", "css", "javascript"] as const,
      htmlCode,
      cssCode,
      jsCode,
      lastModified: Date.now(),
    };

    if (existingIndex >= 0) {
      savedProjects[existingIndex] = project;
    } else {
      savedProjects.unshift(project);
    }

    localStorage.setItem("csi-saved-projects", JSON.stringify(savedProjects));
    toast.success("Proyecto guardado correctamente");
  };

  const handleFork = () => {
    const savedProjects = JSON.parse(
      localStorage.getItem("csi-saved-projects") || "[]"
    );
    
    const newProject = {
      id: `project-${Date.now()}`,
      title: `${projectTitle} (Copia)`,
      description: "Proyecto bifurcado",
      tags: ["html", "css", "javascript"] as const,
      htmlCode,
      cssCode,
      jsCode,
      lastModified: Date.now(),
    };

    savedProjects.unshift(newProject);
    localStorage.setItem("csi-saved-projects", JSON.stringify(savedProjects));
    toast.success("Proyecto copiado a tu espacio de trabajo");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado al portapapeles");
  };

  const handleReset = () => {
    setHtmlCode(originalCode.html);
    setCssCode(originalCode.css);
    setJsCode(originalCode.js);
    toast.info("Código restaurado al original");
  };

  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectTitle}</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectTitle.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Archivo descargado");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col bg-background ${isFullscreen ? "fixed inset-0 z-50" : "h-screen"}`}>
      {/* Toolbar */}
      <header className="flex items-center justify-between border-b border-border bg-[var(--background-elevated)] px-3 md:px-6 py-2 md:py-3">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver</span>
          </Button>
          <div className="hidden md:block h-6 w-px bg-border flex-shrink-0" />
          <h2 className="font-mono truncate text-sm md:text-base">{projectTitle}</h2>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Resetear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRun}
              className="gap-2"
            >
              <Play className="h-4 w-4 fill-current" />
              Ejecutar
            </Button>
          </div>

          {/* Download & More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Más</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Descargar HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-4 w-4 mr-2" />
                    Salir Pantalla Completa
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Pantalla Completa
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReset} className="md:hidden">
                <RotateCcw className="h-4 w-4 mr-2" />
                Resetear Código
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRun} className="md:hidden">
                <Play className="h-4 w-4 mr-2" />
                Ejecutar Código
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFork}
            className="gap-2 hidden md:flex"
          >
            <Copy className="h-4 w-4" />
            Fork
          </Button>
          <Button
            size="sm"
            onClick={handleShare}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compartir</span>
          </Button>
        </div>
      </header>

      {/* Editor & Preview */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile View - Tabs */}
        {isMobile ? (
          <Tabs value={mobileView} onValueChange={(v) => setMobileView(v as any)} className="h-full flex flex-col">
            <TabsList className="w-full rounded-none border-b border-border">
              <TabsTrigger value="editor" className="flex-1">
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="flex-1 m-0">
              <div className="h-full bg-[var(--background-panel)]">
                <CodeEditor
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  jsCode={jsCode}
                  onCodeChange={handleCodeChange}
                />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="flex-1 m-0">
              <div className="h-full">
                <PreviewPanel
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  jsCode={jsCode}
                />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          /* Desktop View - Split Panels */
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full bg-[var(--background-panel)]">
                <CodeEditor
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  jsCode={jsCode}
                  onCodeChange={handleCodeChange}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-border hover:bg-primary/50 transition-colors" />

            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full">
                <PreviewPanel
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  jsCode={jsCode}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}
