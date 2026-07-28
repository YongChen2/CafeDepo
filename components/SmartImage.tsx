import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { PlaceholderImage, type PlaceholderKind } from "@/components/PlaceholderImage";

/**
 * Zjišťuje existenci souboru v public/images v build/render čase (fs na
 * serveru), nikdy za běhu v prohlížeči. Výměna placeholderu za reálnou
 * fotku pak znamená jen nakopírovat soubor na dané místo — nula změn v kódu.
 */
function existsInPublic(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

export function SmartImage({
  src,
  alt,
  kind,
  seed,
  aspect = "aspect-[4/3]",
  label,
  sizes,
  priority,
  fetchPriority,
  className = "",
}: {
  src: string;
  alt: string;
  kind: PlaceholderKind;
  seed: string;
  aspect?: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
}) {
  if (!existsInPublic(src)) {
    return (
      <PlaceholderImage
        kind={kind}
        seed={seed}
        aspect={aspect}
        label={label ?? alt}
      />
    );
  }

  return (
    <div className={`relative ${aspect} photo-industrial`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority}
        loading={priority ? undefined : "lazy"}
        className={`object-cover ${className}`}
      />
    </div>
  );
}
