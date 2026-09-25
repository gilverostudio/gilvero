import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StatCounter } from "@/components/sections/home/stat-counter";
import { type HomeContent } from "@/lib/data/home";

export function StatsBand({ stats }: { stats: HomeContent["stats"] }) {
  if (!stats.length) return null;

  return (
    <section className="border-y border-border/60 bg-charcoal py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80} className="text-center">
              <p className="font-display text-4xl text-primary sm:text-6xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs tracking-[0.24em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
