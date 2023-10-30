import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const teamDocsSnap = await getDocs(collection(db, "Employees"));

    const docs = [];
    teamDocsSnap.forEach((doc) => {
      docs.push(doc.data());
    });

    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve team" }, 500);
  }
}
