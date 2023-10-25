import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log("body data:", data);

    // add doc to users=>Orders
    const OrdersRef = doc(db, "users", data.userId, "Orders", data.orderId);

    await setDoc(OrdersRef, data);

    // add new doc to Orders collection in root
    const docRef = doc(db, "Orders", data.orderId);

    await setDoc(docRef, data);

    return NextResponse.json({ message: "Order added successfully" });
  } catch (error) {
    console.log("Error adding order:", error);
    return NextResponse.json({ error: "Failed to add the order" }, 500);
  }
}
