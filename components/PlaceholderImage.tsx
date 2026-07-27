// Dočasný placeholder za fotografii, než klientka dodá skutečné snímky.
// Až budou fotky v public/images/..., nahraď toto <Image> z next/image
// (viz IMAGES.md pro přesný seznam a doporučené rozměry).
export function PlaceholderImage({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-bg-alt flex flex-col items-center justify-center gap-2 ${aspect} ${className}`}
    >
      <span className="text-4xl font-display leading-none opacity-30">✕</span>
      <span className="font-mono text-[11px] uppercase text-center px-2 opacity-60">
        {label}
      </span>
    </div>
  );
}
