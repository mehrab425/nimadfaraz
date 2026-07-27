import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { getUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


const caseSchema = z.object({
  caseNumber: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),

  clientId: z.string().optional(),
  lawyerId: z.string().optional(),
});


export async function POST(request: NextRequest) {

  const user = await getUserFromRequest(request);

  if (!user || !["SUPER_ADMIN", "STAFF"].includes(user.role)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }


  const body = await request.json().catch(() => null);

  const parsed = caseSchema.safeParse(body);


  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed" },
      { status: 400 }
    );
  }


  const {
    caseNumber,
    title,
    description,
    clientId,
    lawyerId
  } = parsed.data;



  const createdCase = await prisma.case.create({

    data: {
      caseNumber,
      title,
      caseType: "GENERAL",
      description,
      clientId,
      lawyerId
    }

  });



  return NextResponse.json({
    ok: true,
    case: createdCase
  });

}





export async function GET(request: NextRequest) {

  const user = await getUserFromRequest(request);


  if (!user) {

    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );

  }



  const cases = await prisma.case.findMany({

    where:
      user.role === "CLIENT"
        ? { clientId: user.id }
        : {},


    orderBy: {
      createdAt: "desc"
    },


    include: {

      client: true,

      lawyer: true,

    },


  });



  return NextResponse.json({
    cases
  });

}
