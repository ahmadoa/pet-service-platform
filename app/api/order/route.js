import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get("userId");
    const order_id = searchParams.get("orderId");

    console.log("user_id", user_id);
    console.log("order_id", order_id);

    const docSnap = await getDoc(doc(db, "users", user_id, "Orders", order_id));
    console.log("docSnap", docSnap.data());

    if (docSnap.exists()) {
      return new Response(JSON.stringify(docSnap.data()));
    } else {
      return new Response(JSON.stringify({}));
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to retrieve appointment ${error}` })
    );
  }
}
