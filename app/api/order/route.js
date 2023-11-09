import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    console.log("user_id", data.userId);
    console.log("order_id", data.orderId);

    const docSnap = await getDoc(
      doc(db, "users", data.userId, "Orders", data.orderId)
    );
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
