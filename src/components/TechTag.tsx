import { Badge } from "./ui/badge";

interface TechTagProps {
  tech: "html" | "css" | "javascript" | "react" | "vue" | "typescript";
  variant?: "default" | "outline";
}

const techColors: Record<string, { bg: string; text: string; border: string }> = {
  html: {
    bg: "bg-[#E34C26]/10",
    text: "text-[#E34C26]",
    border: "border-[#E34C26]/30",
  },
  css: {
    bg: "bg-[#264DE4]/10",
    text: "text-[#5B9CF5]",
    border: "border-[#264DE4]/30",
  },
  javascript: {
    bg: "bg-[#F7DF1E]/10",
    text: "text-[#F7DF1E]",
    border: "border-[#F7DF1E]/30",
  },
  react: {
    bg: "bg-[#61DAFB]/10",
    text: "text-[#61DAFB]",
    border: "border-[#61DAFB]/30",
  },
  vue: {
    bg: "bg-[#42B883]/10",
    text: "text-[#42B883]",
    border: "border-[#42B883]/30",
  },
  typescript: {
    bg: "bg-[#3178C6]/10",
    text: "text-[#5B9CF5]",
    border: "border-[#3178C6]/30",
  },
};

export function TechTag({ tech, variant = "default" }: TechTagProps) {
  const colors = techColors[tech];
  
  return (
    <Badge
      variant={variant}
      className={`${colors.bg} ${colors.text} border ${colors.border} font-mono`}
    >
      {tech.toUpperCase()}
    </Badge>
  );
}
