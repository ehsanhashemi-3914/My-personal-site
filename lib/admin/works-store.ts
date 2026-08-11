import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import type { Work } from "@/content/works";

/**
 * Reads and writes content/works.json — the source of truth for work samples.
 *
 * The admin editor only ever runs locally (see isAdminEnabled), so writing to
 * the project directory is safe here. Deployed builds read the same file at
 * build time and never write to it.
 */
const DATA_FILE = path.join(process.cwd(), "content", "works.json");

const localised = z.object({ en: z.string(), fa: z.string() });

export const workSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    // Keeps slugs safe to use in URLs and as file names.
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase letters, numbers and dashes only"),
  title: localised,
  year: z.string().trim().max(20),
  summary: localised,
  description: localised,
  price: localised,
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  thumbnail: z.string().trim().max(300).optional(),
  link: z.string().trim().url().max(500).optional().or(z.literal("")),
  accent: z.tuple([z.string(), z.string()]),
});

export const worksSchema = z.array(workSchema);

export async function readWorks(): Promise<Work[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = worksSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      console.error("works.json failed validation:", parsed.error.issues);
      return [];
    }
    return parsed.data as Work[];
  } catch (error) {
    // A missing file simply means nothing has been added yet.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function writeWorks(works: Work[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  // Write to a temporary file first, then rename, so an interrupted save can
  // never leave a half-written file behind.
  const tmp = `${DATA_FILE}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify(works, null, 2)}\n`, "utf8");
  await fs.rename(tmp, DATA_FILE);
}
