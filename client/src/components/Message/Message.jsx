import { useEffect } from "react";
import useMessageStore from "../../store/messageStore";

function Message() {
  const { messages, removeMessage } = useMessageStore();

  const handleClick = (id) => {
    return () => {
      removeMessage(id);
    };
  };

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
          <div
            key={msg.id}
            className="w-full justify-between items-center flex px-5 "
          >
            <span className="text-white">{msg.text}</span>
            <button
              onClick={handleClick(msg.id)}
              className="ml-4 text-white hover:text-gray-200 focus:outline-none font-medium"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Message;
