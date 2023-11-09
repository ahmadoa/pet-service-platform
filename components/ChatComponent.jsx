import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { Button } from "./ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import moment from "moment/moment";
import { motion } from "framer-motion";
import profIMG from "@/public/profIMG.png";

function ChatComponent({ userId, orderId, AppointDate, status }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currUser, setCurrUser] = useState({});

  // check user
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
      } else {
        router.push("/login");
      }
    });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const scr = useRef();

  useEffect(() => {
    if (messages.length > 2) {
      scr.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  // post message to order id / user
  const PostMessage = async () => {
    if (message.length != 0) {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          orderId: orderId,
          text: message,
          uid: currUser.uid,
          sender_name: currUser.displayName,
          profile: currUser.photoURL,
          href: `/dashboard/appointments?id=${orderId}`,
        }),
      });
      if (response.ok) {
        setMessage("");
        console.log("message sent!");
      } else {
        console.log("failed to send message!");
      }
    } else {
      console.log("fill message input");
    }
  };

  // listening to messages
  useEffect(() => {
    const q = query(
      collection(db, "users", userId, "Orders", orderId, "Messages"),
      orderBy("createdAt")
    );
    onSnapshot(q, (querySnapshot) => {
      const messagesDocs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        messagesDocs.push(data);
      });
      setMessages(messagesDocs);
    });
  }, []);

  const today = new Date();
  const appointDate = new Date(AppointDate);
  const diffTime = today - appointDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log("Days until appointment:", diffDays);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      PostMessage();
    }
  };

  return (
    <div className="w-full h-full bg-chat bg-no-repeat bg-cover rounded-xl p-5 gap-2 relative">
      <div className="absolute inset-0 flex flex-col py-5">
        {/** client info section */}
        <div className="w-full h-[10%] flex items-center px-5 gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={profIMG}
              className="h-full w-full object-cover"
              width={0}
              height={0}
              sizes="100vw"
              alt="profile picture"
            />
          </div>
          <p className="font-semibold text-secondary-foreground">Pawpal Chat</p>
        </div>
        {/** messages section */}
        <div className="w-full h-[80vh] max-h-[80vh] overflow-y-auto py-4">
          <div className="flex flex-col gap-3 px-5">
            {messages.map((msg) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`flex flex-col gap-1 ${
                  msg.uid === currUser.uid ? "items-end" : ""
                }`}
                key={msg.id}
              >
                <div className="flex gap-2 items-center">
                  {msg.uid != currUser.uid ? (
                    <div className="font-semibold">Pawpal Chat</div>
                  ) : (
                    <></>
                  )}
                  <div className="text-sm text-muted-foreground">
                    {moment(msg.createdAt.toDate()).calendar()}
                  </div>
                </div>
                <div
                  className={`w-fit max-w-[60%] p-2 ${
                    msg.uid === currUser.uid
                      ? "bg-muted rounded-s-xl shadow-sm"
                      : "bg-card rounded-e-xl shadow-sm"
                  } rounded-b-xl`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={scr}></div>
          </div>
        </div>
        {/** input section */}
        <div className="w-full h-[10%] px-5">
          <div className="w-full h-full bg-muted flex items-center py-1 px-2 gap-2 rounded-lg">
            <button className="w-10 flex justify-center items-center hover:scale-105">
              <AiOutlinePaperClip size={26} className="stroke-white" />
            </button>
            <input
              className="h-full flex-1 text-primary-foreground bg-transparent focus:outline-none first-letter:uppercase"
              value={message}
              disabled={
                (status === "On Process" && diffDays < 0) ||
                status === "Fulfilled"
              }
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              placeholder={
                status === "On Process" && diffDays < 0
                  ? "You can't send message before the appointment date"
                  : status === "Fulfilled"
                  ? "You can't send message after appointment is fulfilled"
                  : "Type your message here..."
              }
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="flex justify-center items-center"
              onClick={PostMessage}
            >
              <PiPaperPlaneTiltFill size={20} className="fill-background" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
