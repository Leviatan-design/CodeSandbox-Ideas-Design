import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";

interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  onCodeChange: (type: "html" | "css" | "js", code: string) => void;
}

export function CodeEditor({
  htmlCode,
  cssCode,
  jsCode,
  onCodeChange,
}: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState("html");

  const renderHighlightedCode = (code: string, language: "html" | "css" | "js") => {
    // Simple syntax highlighting - in a real app, use a library like Prism.js
    const lines = code.split("\n");
    
    return lines.map((line, index) => {
      let highlightedLine = line;
      
      if (language === "html") {
        // HTML highlighting
        highlightedLine = line
          .replace(/(<\/?)(\w+)/g, '<span class="syntax-tag">$1$2</span>')
          .replace(/(\w+)=/g, '<span class="syntax-attribute">$1</span>=')
          .replace(/"([^"]*)"/g, '"<span class="syntax-string">$1</span>"');
      } else if (language === "css") {
        // CSS highlighting
        highlightedLine = line
          .replace(/([.#][\w-]+)/g, '<span class="syntax-tag">$1</span>')
          .replace(/([\w-]+):/g, '<span class="syntax-property">$1</span>:')
          .replace(/:\s*([^;]+);/g, ': <span class="syntax-string">$1</span>;')
          .replace(/\/\*.+?\*\//g, '<span class="syntax-comment">$&</span>');
      } else if (language === "js") {
        // JavaScript highlighting
        highlightedLine = line
          .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g, '<span class="syntax-keyword">$1</span>')
          .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
          .replace(/"([^"]*)"|'([^']*)'/g, '<span class="syntax-string">$&</span>')
          .replace(/\/\/.+$/g, '<span class="syntax-comment">$&</span>')
          .replace(/\b([a-zA-Z_$][\w$]*)\s*\(/g, '<span class="syntax-function">$1</span>(');
      }
      
      return (
        <div key={index} className="flex hover:bg-[var(--muted)]/30">
          <span className="inline-block w-12 select-none text-right pr-4 text-muted-foreground/50">
            {index + 1}
          </span>
          <span
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: highlightedLine || "&nbsp;" }}
          />
        </div>
      );
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
      <TabsList className="w-full justify-start rounded-none border-b border-border bg-[var(--background-panel)] px-4">
        <TabsTrigger
          value="html"
          className="font-mono data-[state=active]:bg-[var(--background-elevated)] data-[state=active]:text-[#E34C26]"
        >
          index.html
        </TabsTrigger>
        <TabsTrigger
          value="css"
          className="font-mono data-[state=active]:bg-[var(--background-elevated)] data-[state=active]:text-[#5B9CF5]"
        >
          styles.css
        </TabsTrigger>
        <TabsTrigger
          value="js"
          className="font-mono data-[state=active]:bg-[var(--background-elevated)] data-[state=active]:text-[#F7DF1E]"
        >
          script.js
        </TabsTrigger>
      </TabsList>

      <div className="flex-1 relative">
        <TabsContent value="html" className="h-full m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="font-mono text-sm">
                {renderHighlightedCode(htmlCode, "html")}
              </pre>
            </div>
          </ScrollArea>
          <textarea
            value={htmlCode}
            onChange={(e) => onCodeChange("html", e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 font-mono text-sm p-4 resize-none bg-transparent text-transparent caret-primary outline-none"
            spellCheck={false}
          />
        </TabsContent>

        <TabsContent value="css" className="h-full m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="font-mono text-sm">
                {renderHighlightedCode(cssCode, "css")}
              </pre>
            </div>
          </ScrollArea>
          <textarea
            value={cssCode}
            onChange={(e) => onCodeChange("css", e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 font-mono text-sm p-4 resize-none bg-transparent text-transparent caret-primary outline-none"
            spellCheck={false}
          />
        </TabsContent>

        <TabsContent value="js" className="h-full m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="font-mono text-sm">
                {renderHighlightedCode(jsCode, "js")}
              </pre>
            </div>
          </ScrollArea>
          <textarea
            value={jsCode}
            onChange={(e) => onCodeChange("js", e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 font-mono text-sm p-4 resize-none bg-transparent text-transparent caret-primary outline-none"
            spellCheck={false}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
