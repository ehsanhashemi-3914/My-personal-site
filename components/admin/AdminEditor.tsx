"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { Work } from "@/content/works";

type SaveState = "idle" | "saving" | "saved" | "error";

const EMPTY: Work = {
  slug: "",
  title: { en: "", fa: "" },
  year: "",
  summary: { en: "", fa: "" },
  description: { en: "", fa: "" },
  price: { en: "", fa: "" },
  tags: [],
  accent: ["#6ee7d8", "#8b7cf6"],
};

const field =
  "w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white/[0.03] px-3 py-2 text-sm text-[var(--color-hi)] outline-none transition-colors focus:border-[var(--color-mint)]/60";
const label = "block text-xs uppercase tracking-[0.16em] text-[var(--color-lo)]";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminEditor({ initialWorks }: { initialWorks: Work[] }) {
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [selected, setSelected] = useState(0);
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const current: Work | undefined = works[selected];

  const patch = useCallback(
    (changes: Partial<Work>) => {
      setWorks((list) =>
        list.map((w, i) => (i === selected ? { ...w, ...changes } : w)),
      );
      setState("idle");
    },
    [selected],
  );

  const addWork = () => {
    setWorks((list) => [...list, { ...EMPTY, slug: `sample-${list.length + 1}` }]);
    setSelected(works.length);
    setState("idle");
  };

  const removeWork = (index: number) => {
    const name = works[index]?.title.fa || works[index]?.slug || "";
    if (!confirm(`حذف «${name}»؟ این کار برگشت‌پذیر نیست.`)) return;
    setWorks((list) => list.filter((_, i) => i !== index));
    setSelected((s) => Math.max(0, s > index ? s - 1 : s === index ? 0 : s));
    setState("idle");
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= works.length) return;
    setWorks((list) => {
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSelected(target);
    setState("idle");
  };

  const save = async () => {
    setState("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/works", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(works),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setState("saved");
        setMessage(`ذخیره شد — ${body.count} نمونه‌کار`);
        return;
      }
      setState("error");
      if (body.error === "duplicate_slug") {
        setMessage(`شناسه‌ی تکراری: ${body.slug}`);
      } else if (body.issues?.length) {
        const issue = body.issues[0];
        setMessage(`${issue.path?.join(".") ?? ""} — ${issue.message}`);
      } else {
        setMessage("ذخیره ناموفق بود.");
      }
    } catch {
      setState("error");
      setMessage("ارتباط با سرور برقرار نشد.");
    }
  };

  const upload = async (file: File) => {
    if (!current) return;
    const slug = current.slug || slugify(current.title.en || current.title.fa);
    if (!slug) {
      setState("error");
      setMessage("اول یک شناسه (slug) بگذارید.");
      return;
    }
    setState("saving");
    setMessage("در حال آپلود تصویر…");

    const form = new FormData();
    form.append("file", file);
    form.append("slug", slug);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        // Cache-bust so a replaced image shows immediately.
        patch({ thumbnail: `${body.path}?v=${Date.now()}` });
        setState("idle");
        setMessage("تصویر آپلود شد — یادتان نرود ذخیره کنید.");
      } else {
        setState("error");
        const reasons: Record<string, string> = {
          too_large: "حجم تصویر بیش از ۶ مگابایت است.",
          bad_type: "فقط JPG، PNG، WebP یا AVIF.",
          bad_slug: "شناسه‌ی نامعتبر.",
        };
        setMessage(reasons[body.error] ?? "آپلود ناموفق بود.");
      }
    } catch {
      setState("error");
      setMessage("آپلود ناموفق بود.");
    }
  };

  return (
    <div dir="rtl" className="mx-auto max-w-6xl px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <h1 className="text-2xl text-[var(--color-hi)]">مدیریت نمونه‌کارها</h1>
          <p className="mt-1.5 text-sm text-[var(--color-lo)]">
            فقط روی کامپیوتر خودتان اجرا می‌شود. تغییرات در{" "}
            <code className="text-[var(--color-mid)]">content/works.json</code> ذخیره
            می‌شود.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {message && (
            <span
              className={
                state === "error"
                  ? "text-sm text-[var(--color-rose)]"
                  : "text-sm text-[var(--color-mint)]"
              }
            >
              {message}
            </span>
          )}
          <button
            onClick={save}
            disabled={state === "saving"}
            className="rounded-full border border-[var(--color-mint)]/45 bg-[var(--color-mint)]/10 px-6 py-2.5 text-sm text-[var(--color-hi)] transition-colors hover:bg-[var(--color-mint)]/20 disabled:opacity-50"
          >
            {state === "saving" ? "…" : "ذخیره"}
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* list */}
        <aside className="space-y-2">
          {works.map((w, i) => (
            <div
              key={`${w.slug}-${i}`}
              className={`flex items-center gap-1 rounded-[var(--radius-sm)] border px-2 py-1.5 transition-colors ${
                i === selected
                  ? "border-[var(--color-mint)]/45 bg-[var(--color-mint)]/10"
                  : "border-[var(--color-line)]"
              }`}
            >
              <button
                onClick={() => setSelected(i)}
                className="flex-1 truncate px-1 py-1 text-start text-sm text-[var(--color-hi)]"
              >
                {w.title.fa || w.slug || "بدون عنوان"}
              </button>
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="بالا"
                className="px-1.5 text-[var(--color-lo)] hover:text-[var(--color-hi)] disabled:opacity-25"
              >
                ↑
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === works.length - 1}
                aria-label="پایین"
                className="px-1.5 text-[var(--color-lo)] hover:text-[var(--color-hi)] disabled:opacity-25"
              >
                ↓
              </button>
              <button
                onClick={() => removeWork(i)}
                aria-label="حذف"
                className="px-1.5 text-[var(--color-lo)] hover:text-[var(--color-rose)]"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={addWork}
            className="w-full rounded-[var(--radius-sm)] border border-dashed border-[var(--color-line-strong)] px-3 py-2.5 text-sm text-[var(--color-mid)] transition-colors hover:border-[var(--color-mint)]/45 hover:text-[var(--color-hi)]"
          >
            + نمونه‌کار جدید
          </button>
        </aside>

        {/* form */}
        {current ? (
          <section className="space-y-6 rounded-[var(--radius-lg)] border border-[var(--color-line)] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="slug">
                  شناسه (انگلیسی، بدون فاصله)
                </label>
                <input
                  id="slug"
                  dir="ltr"
                  className={`${field} mt-2`}
                  value={current.slug}
                  onChange={(e) => patch({ slug: slugify(e.target.value) })}
                />
              </div>
              <div>
                <label className={label} htmlFor="year">
                  سال
                </label>
                <input
                  id="year"
                  className={`${field} mt-2`}
                  value={current.year}
                  onChange={(e) => patch({ year: e.target.value })}
                />
              </div>
            </div>

            <Pair
              label="عنوان"
              value={current.title}
              onChange={(title) => patch({ title })}
            />
            <Pair
              label="توضیح کوتاه (روی کارت)"
              value={current.summary}
              onChange={(summary) => patch({ summary })}
              multiline
            />
            <Pair
              label="توضیح کامل (در جزئیات)"
              value={current.description}
              onChange={(description) => patch({ description })}
              multiline
              rows={4}
            />
            <Pair
              label="قیمت"
              value={current.price}
              onChange={(price) => patch({ price })}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="tags">
                  برچسب‌ها (با ویرگول جدا کنید)
                </label>
                <input
                  id="tags"
                  className={`${field} mt-2`}
                  value={current.tags.join(", ")}
                  onChange={(e) =>
                    patch({
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div>
                <label className={label} htmlFor="link">
                  لینک (اختیاری)
                </label>
                <input
                  id="link"
                  dir="ltr"
                  placeholder="https://…"
                  className={`${field} mt-2`}
                  value={current.link ?? ""}
                  onChange={(e) => patch({ link: e.target.value })}
                />
              </div>
            </div>

            {/* thumbnail */}
            <div>
              <span className={label}>تصویر</span>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-line)]">
                  {current.thumbnail ? (
                    <Image
                      src={current.thumbnail}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: `linear-gradient(130deg, ${current.accent[0]}, ${current.accent[1]})`,
                      }}
                    />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) upload(f);
                      e.target.value = "";
                    }}
                  />
                  <button
                    onClick={() => fileInput.current?.click()}
                    className="rounded-full border border-[var(--color-line-strong)] px-5 py-2 text-sm text-[var(--color-hi)] transition-colors hover:border-[var(--color-mint)]/45"
                  >
                    انتخاب تصویر
                  </button>
                  {current.thumbnail && (
                    <button
                      onClick={() => patch({ thumbnail: undefined })}
                      className="text-sm text-[var(--color-lo)] transition-colors hover:text-[var(--color-rose)]"
                    >
                      حذف تصویر
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* accent colours, used when no image exists */}
            <div>
              <span className={label}>رنگ پس‌زمینه (وقتی تصویر نیست)</span>
              <div className="mt-2 flex items-center gap-3">
                {[0, 1].map((i) => (
                  <input
                    key={i}
                    type="color"
                    aria-label={`رنگ ${i + 1}`}
                    value={current.accent[i]}
                    onChange={(e) => {
                      const accent: [string, string] = [...current.accent];
                      accent[i] = e.target.value;
                      patch({ accent });
                    }}
                    className="h-9 w-16 cursor-pointer rounded border border-[var(--color-line)] bg-transparent"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line-strong)] p-12 text-center text-[var(--color-lo)]">
            هنوز نمونه‌کاری نیست. با دکمه‌ی «نمونه‌کار جدید» شروع کنید.
          </section>
        )}
      </div>
    </div>
  );
}

/** Two inputs — English and Persian — for one localised field. */
function Pair({
  label: title,
  value,
  onChange,
  multiline,
  rows = 2,
}: {
  label: string;
  value: { en: string; fa: string };
  onChange: (v: { en: string; fa: string }) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div>
      <span className={label}>{title}</span>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <div>
          <Tag
            dir="rtl"
            rows={multiline ? rows : undefined}
            placeholder="فارسی"
            className={`${field} resize-y`}
            value={value.fa}
            onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
              onChange({ ...value, fa: e.target.value })
            }
          />
        </div>
        <div>
          <Tag
            dir="ltr"
            rows={multiline ? rows : undefined}
            placeholder="English"
            className={`${field} resize-y`}
            value={value.en}
            onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
              onChange({ ...value, en: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
