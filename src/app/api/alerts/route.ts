import omit from "lodash/omit";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth, db, handleError, validateData } from "@/app/api/_helpers";
import { alertSchema, idSchema, IAlertDoc, IAlert } from "@/app/api/schemas";

export const POST = async (request: NextRequest) => {
  try {
    const uid = await checkAuth(request);
    const data = await request.json();

    const { symbol, price, direction, name } = validateData(data, alertSchema);

    const alertRef = db.collection("alerts").doc();
    const newAlert: IAlertDoc = {
      symbol,
      price,
      direction,
      uid,
      name: name || symbol,
    };

    await alertRef.set(newAlert);

    const alertDoc = await alertRef.get();
    const alertData = { ...omit(alertDoc.data(), ["uid"]), id: alertDoc.id };

    return NextResponse.json(alertData);
  } catch (error: any) {
    return handleError(error);
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const uid = await checkAuth(request);
    const data: IAlert = await request.json();

    const { id, symbol, price, direction } = validateData(
      data,
      alertSchema.merge(idSchema)
    );

    const alertRef = db.collection("alerts").doc(id);
    const alertDoc = await alertRef.get();

    if (alertDoc.exists && alertDoc.data()?.uid === uid) {
      await alertRef.update({ symbol, price, direction });
      return NextResponse.json({ message: "Success" });
    } else {
      throw new Error("Invalid request");
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const uid = await checkAuth(request);
    const data: IAlert = await request.json();

    const { id } = validateData(data, idSchema);

    const alertRef = db.collection("alerts").doc(id);
    const alertDoc = await alertRef.get();

    if (alertDoc.exists && alertDoc.data()?.uid === uid) {
      await alertRef.delete();
      return NextResponse.json({ message: "Success" });
    } else {
      throw new Error("Invalid request");
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const uid = await checkAuth(request);

    const alertsRef = db.collection("alerts");
    const querySnapshot = await alertsRef.where("uid", "==", uid).get();

    const alerts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...omit(doc.data(), ["uid"]),
    }));

    return NextResponse.json(alerts);
  } catch (error: any) {
    handleError(error);
  }
};
