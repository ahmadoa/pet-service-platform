import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const appointmentsCollectionRef = collection(db, "Orders");

    // Get all documents from the "appointments" collection
    const querySnapshot = await getDocs(appointmentsCollectionRef);

    // Check if there are documents in the collection
    if (querySnapshot.empty) {
      // The collection is empty, return an empty array
      return Response.json([]);
    }

    // Map the documents to an array of appointment data
    const appointments = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return Response.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return Response.json([]);
  }
}
