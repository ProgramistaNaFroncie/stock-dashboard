import { NextRequest, NextResponse } from "next/server";
import { createAdminApp } from "@/lib/firebaseAdmin";
import { z } from "zod";

export const adminApp = createAdminApp();
export const db = adminApp.firestore();
export const auth = adminApp.auth();

export const checkAuth = async (request: NextRequest) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken.uid;
  } catch (error: any) {
    throw new Error("Unauthorized");
  }
};

export const validateData = (data: unknown, schema: z.ZodSchema<any>) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid request");
  }
  return result.data;
};

export const handleError = (error: any) => {
  if (error.message === "Invalid request") {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  } else if (error.message === "Unauthorized") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
