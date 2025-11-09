import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Terminal, Eye, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";

interface PreviewPanelProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

interface ConsoleLog {
  type: "log" | "warn" | "error";
  message: string;
  timestamp: string;
}

export function PreviewPanel({ htmlCode, cssCode, jsCode }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([
    {
      type: "log",
      message: "Console lista. Ejecuta tu código para ver los resultados.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [consoleInput, setConsoleInput] = useState("");

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDoc) return;

    // Capture console logs from iframe
    const captureConsole = `
      <script>
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        console.log = function(...args) {
          window.parent.postMessage({
            type: 'console-log',
            level: 'log',
            message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
          }, '*');
          originalLog.apply(console, args);
        };
        
        console.warn = function(...args) {
          window.parent.postMessage({
            type: 'console-log',
            level: 'warn',
            message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
          }, '*');
          originalWarn.apply(console, args);
        };
        
        console.error = function(...args) {
          window.parent.postMessage({
            type: 'console-log',
            level: 'error',
            message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
          }, '*');
          originalError.apply(console, args);
        };
        
        window.onerror = function(message, source, lineno, colno, error) {
          window.parent.postMessage({
            type: 'console-log',
            level: 'error',
            message: message + ' (Line ' + lineno + ')'
          }, '*');
          return false;
        };
      </script>
    `;

    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
          ${captureConsole}
        </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch(e) {
              console.error(e.message);
            }
          </script>
        </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(fullHTML);
    iframeDoc.close();
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "console-log") {
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: event.data.level,
            message: event.data.message,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleConsoleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    setConsoleLogs((prev) => [
      ...prev,
      {
        type: "log",
        message: `> ${consoleInput}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Execute command in iframe
    try {
      const iframe = iframeRef.current;
      const result = iframe?.contentWindow?.eval(consoleInput);
      if (result !== undefined) {
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: "log",
            message: String(result),
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error: any) {
      setConsoleLogs((prev) => [
        ...prev,
        {
          type: "error",
          message: error.message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setConsoleInput("");
  };

  const getLogColor = (type: ConsoleLog["type"]) => {
    switch (type) {
      case "warn":
        return "text-[var(--warning)]";
      case "error":
        return "text-[var(--destructive)]";
      default:
        return "text-foreground";
    }
  };

  return (
    <Tabs defaultValue="preview" className="h-full flex flex-col">
      <TabsList className="w-full justify-start rounded-none border-b border-border bg-[var(--background-panel)] px-4">
        <TabsTrigger value="preview" className="gap-2">
          <Eye className="h-4 w-4" />
          Resultado
        </TabsTrigger>
        <TabsTrigger value="console" className="gap-2">
          <Terminal className="h-4 w-4" />
          Consola
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="flex-1 m-0 p-0 bg-white">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </TabsContent>

      <TabsContent
        value="console"
        className="flex-1 m-0 p-0 bg-[var(--background-panel)] flex flex-col"
      >
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-1 font-mono text-sm">
            {consoleLogs.map((log, index) => (
              <div key={index} className={`flex gap-3 ${getLogColor(log.type)}`}>
                <span className="text-muted-foreground text-xs">{log.timestamp}</span>
                <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="flex-1 break-all">{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="border-t border-border p-4">
          <form onSubmit={handleConsoleCommand} className="flex gap-2">
            <ChevronRight className="h-5 w-5 text-muted-foreground mt-2" />
            <Input
              value={consoleInput}
              onChange={(e) => setConsoleInput(e.target.value)}
              placeholder="Escribe un comando JavaScript..."
              className="font-mono bg-[var(--input-background)] border-border"
            />
          </form>
        </div>
      </TabsContent>
    </Tabs>
  );
}
