import { NextRequest, NextResponse } from "next/server";
import { checkAuth, db } from "@/app/api/_helpers";

export async function GET(request: NextRequest) {
  try {
    const uid = await checkAuth(request);

    const requestsRef = db.collection("api_requests");
    const querySnapshot = await requestsRef.where("uid", "==", uid).get();

    const requests = querySnapshot.docs.map((doc) => doc.data());

    const totalRequests = requests.length;
    const requestCounts = requests.reduce((acc, request) => {
      const date = new Date(request.timestamp).toLocaleDateString();

      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const averageRequestsPerDay =
      totalRequests / Object.keys(requestCounts).length;

    const endpointUsage = requests.reduce((acc, request) => {
      acc[request.endpoint] = (acc[request.endpoint] || 0) + 1;
      return acc;
    }, {});

    const mostUsedEndpoint = Object.keys(endpointUsage).reduce((a, b) =>
      endpointUsage[a] > endpointUsage[b] ? a : b
    );

    return NextResponse.json({
      total_requests: totalRequests,
      average_requests_per_day: averageRequestsPerDay,
      most_used_endpoint: mostUsedEndpoint,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
