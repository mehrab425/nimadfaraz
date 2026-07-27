import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { isAdminAuthenticated } from "@/lib/auth";

const execFileAsync = promisify(execFile);

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const script = path.join(process.cwd(), "scripts", "import-articles.mjs");
  await execFileAsync(process.execPath, [script], { cwd: process.cwd() });
  return NextResponse.json({ ok: true });
}
