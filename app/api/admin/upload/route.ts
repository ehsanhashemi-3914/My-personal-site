import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminEnabled } from "@/lib/admin/guard";

export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024;
/** Only formats the browser can display, mapped to the extension we save as. */
const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

export async function POST(request: Request) {
  if (!isAdminEnabled) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const rawSlug = String(form.get("slug") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  // Rebuild the slug from scratch instead of trusting it — it becomes a
  // filename, so anything path-like has to be impossible.
  const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!slug) {
    return NextResponse.json({ error: "bad_slug" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  const extension = ALLOWED[file.type];
  if (!extension) {
    return NextResponse.json({ error: "bad_type" }, { status: 415 });
  }

  const directory = path.join(process.cwd(), "public", "works");
  await fs.mkdir(directory, { recursive: true });

  const filename = `${slug}${extension}`;
  const destination = path.join(directory, filename);

  // Belt and braces: confirm the resolved path really is inside public/works.
  if (path.dirname(path.resolve(destination)) !== path.resolve(directory)) {
    return NextResponse.json({ error: "bad_path" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(destination, bytes);

  return NextResponse.json({ ok: true, path: `/works/${filename}` });
}
