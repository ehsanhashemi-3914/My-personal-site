import { NextResponse } from "next/server";
import { isAdminEnabled } from "@/lib/admin/guard";
import { readWorks, writeWorks, worksSchema } from "@/lib/admin/works-store";

export const runtime = "nodejs";

/** 404 rather than 403, so a deployed build gives no hint that this ever existed. */
function notFound() {
  return NextResponse.json({ error: "not_found" }, { status: 404 });
}

export async function GET() {
  if (!isAdminEnabled) return notFound();
  return NextResponse.json({ works: await readWorks() });
}

export async function PUT(request: Request) {
  if (!isAdminEnabled) return notFound();

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = worksSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const slugs = parsed.data.map((w) => w.slug);
  const duplicate = slugs.find((s, i) => slugs.indexOf(s) !== i);
  if (duplicate) {
    return NextResponse.json(
      { error: "duplicate_slug", slug: duplicate },
      { status: 400 },
    );
  }

  await writeWorks(parsed.data as never);
  return NextResponse.json({ ok: true, count: parsed.data.length });
}
