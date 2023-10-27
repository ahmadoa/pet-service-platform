import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("userId");
    const order_id = searchParams.get("orderId");

    const docSnap = await getDoc(doc(db, "users", user_id, "Orders", order_id));

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json({});
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve appointment" }, 500);
  }
}
