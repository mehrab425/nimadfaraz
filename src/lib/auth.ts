import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export type SessionUser = {
  id: string;
  username: string;
  role: string;
};

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "nimad2026";
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: SessionUser) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as SessionUser;
}

function parseCookieHeader(cookieHeader: string | null | undefined) {
  const result: Record<string, string> = {};
  if (!cookieHeader) {
    return result;
  }

  for (const rawItem of cookieHeader.split(";")) {
    const item = rawItem.trim();
    if (!item) {
      continue;
    }
    const separatorIndex = item.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }
    const key = item.slice(0, separatorIndex);
    const value = item.slice(separatorIndex + 1);
    result[key] = decodeURIComponent(value);
  }

  return result;
}

export function createSessionCookie(token: string) {
  const parts = [`${COOKIE_NAME}=${encodeURIComponent(token)}`, "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=604800"];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return token === getAdminPassword();
}

export async function getSessionUserFromCookieStore() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token) as SessionUser;
    return prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true
      },
    });
  } catch {
    return null;
  }
}

export async function getUserFromRequest(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const parsed = parseCookieHeader(cookieHeader);
  const token = parsed[COOKIE_NAME];

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token) as SessionUser;
    return prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true
      },
    });
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
