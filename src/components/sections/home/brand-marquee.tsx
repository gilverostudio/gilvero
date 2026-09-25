export function BrandMarquee({ brands }: { brands: string[] }) {
  if (!brands.length) return null;

  return (
    <div className="overflow-hidden border-y border-border/60 bg-charcoal py-7">
      <div className="marquee-track flex w-max gap-16 pr-16">
        {[...brands, ...brands].map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="font-display text-sm tracking-[0.35em] whitespace-nowrap text-foreground/35"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
