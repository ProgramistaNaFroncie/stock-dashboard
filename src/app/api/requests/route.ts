import { NextRequest, NextResponse } from "next/server";
import omit from "lodash/omit";
import { checkAuth, db, handleError, validateData } from "@/app/api/_helpers";
import { ApiRequestData, apiRequestSchema } from "@/app/api/schemas";

export const POST = async (request: NextRequest) => {
  try {
    const uid = await checkAuth(request);
    const data: ApiRequestData = await request.json();

    const { endpoint, timestamp, status } = validateData(
      data,
      apiRequestSchema
    );

    const requestRef = db.collection("api_requests").doc();
    await requestRef.set({ uid, endpoint, timestamp, status });

    const requestDoc = await requestRef.get();
    const requestData = {
      ...omit(requestDoc.data(), ["uid"]),
      id: requestDoc.id,
    };

    if (requestData) {
      return NextResponse.json(requestData);
    } else {
      return NextResponse.json(
        { message: "Failed to retrieve request data" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return handleError(error);
  }
};
