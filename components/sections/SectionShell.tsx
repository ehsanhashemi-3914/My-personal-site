import type { ReactNode } from "react";
import type { SectionId } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";
import { ReactiveText } from "@/components/ui/ReactiveText";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: SectionId;
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
}

/** Shared section frame: numbered eyebrow, heading, lead, then content. */
export function SectionShell({
  id,
  index,
  eyebrow,
  title,
  lead,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-screen w-full items-center py-28",
        className,
      )}
    >
      <div className="container-x w-full">
        <Reveal className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-display)] text-sm text-[var(--color-mint)]">
            {index}
          </span>
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-16 max-w-24 flex-1 bg-[var(--color-line)] sm:w-24" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-4xl text-[length:var(--text-h2)]">
            <ReactiveText text={title} lift={10} radius={110} />
          </h2>
        </Reveal>

        {lead && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-[var(--color-mid)]">
              {lead}
            </p>
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}
