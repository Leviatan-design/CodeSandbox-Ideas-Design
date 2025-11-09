import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { TechTag } from "./TechTag";
import { Play, Heart, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface IdeaCardProps {
  id: string;
  title: string;
  description: string;
  tags: Array<"html" | "css" | "javascript" | "react" | "vue" | "typescript">;
  previewImage: string;
  views: number;
  likes: number;
  onTry: (id: string) => void;
}

export function IdeaCard({
  id,
  title,
  description,
  tags,
  previewImage,
  views,
  likes,
  onTry,
}: IdeaCardProps) {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--background-panel)]">
          <ImageWithFallback
            src={previewImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            size="icon"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary hover:bg-primary/90"
            onClick={() => onTry(id)}
          >
            <Play className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TechTag key={tag} tech={tag} />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {likes}
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => onTry(id)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Probar ahora
        </Button>
      </CardFooter>
    </Card>
  );
}
