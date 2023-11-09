import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      const data = await req.json();
      const user_id = data.userId
  
      const querySnapshot = await getDocs(
        collection(db, "users", user_id, "Orders")
      );
  
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
  
      console.log(docs);
  
      return NextResponse.json(docs);
    } catch (error) {
      return NextResponse.json({ error: "Failed to retrieve appointments" }, 500);
    }
  }