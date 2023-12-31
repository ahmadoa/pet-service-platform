import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const docSnap = await getDoc(
      doc(db, "users", data.userId, "Orders", data.orderId)
    );

    if (docSnap.exists()) {
      const data = docSnap.data();
      await setDoc(
        doc(db, "users", data.userId, "Archives", data.orderId),
        data
      );
      const MsgsDocs = await getDocs(
        collection(db, "users", data.userId, "Orders", data.orderId, "Messages")
      );
      MsgsDocs.forEach(async (docu) => {
        await setDoc(
          doc(
            db,
            "users",
            data.userId,
            "Archives",
            data.orderId,
            "Messages",
            docu.id
          ),
          docu.data()
        );
      });
      MsgsDocs.forEach(async (docu) => {
        await deleteDoc(
          doc(
            db,
            "users",
            data.userId,
            "Orders",
            data.orderId,
            "Messages",
            docu.id
          )
        );
      });
      await deleteDoc(doc(db, "users", data.userId, "Orders", data.orderId));
    }
    return NextResponse.json({ message: "Archived successfully" });
  } catch (error) {
    console.log("Error archiving order:", error);
    return NextResponse.json({ error: "Failed to archive the order" }, 500);
  }
}
