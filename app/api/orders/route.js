import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("userId");

    const querySnapshot = await getDocs(
      collection(db, "users", user_id, "Orders")
    );

    const docs = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docs.push(doc.data());
    });

    console.log(docs);

    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve appointments" }, 500);
  }
}
