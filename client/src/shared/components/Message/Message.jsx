import { useEffect } from "react";
import useMessageStore from "../../store/messageStore";
import MessageItem from "./MessageItem/MessageItem";

function Message() {
  const { messages, removeMessage } = useMessageStore();

  useEffect(() => {
    messages.forEach((msg) => {
      const timer = setTimeout(() => {
        removeMessage(msg.id);
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [messages, removeMessage]);

  if (!messages.length) return null;

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-96">
      <div className=" rounded-lg bg-slate-500 py-3 w-full min-w-fit animate-fade-in opacity-100 transition-opacity duration-300">
        {messages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))}
      </div>
    </div>
  );
}

export default Message;
