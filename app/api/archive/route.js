import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const order_id = data.orderId;
    const user_id = data.userId;

    const docSnap = await getDoc(
      doc(db, "users", user_id, "Archives", order_id)
    );

    if (docSnap.exists()) {
      console.log(docSnap.data());
      return new Response(JSON.stringify(docSnap.data()));
    } else {
      return new Response(JSON.stringify({}));
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to retrieve appointment" })
    );
  }
}
