import React, { useEffect, useRef, useState } from "react";

const Chatbot = () => {
  const chatbotRef = useRef(null);
  const footerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("chatbot-position");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          x: window.innerWidth - 90,
          y: window.innerHeight - 150,
        };
      }
    }

    return {
      x: window.innerWidth - 90,
      y: window.innerHeight - 150,
    };
  });

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm your Blog Assistant. How can I help you?",
    },
  ]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dragging = useRef(false);
  const dragStarted = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // --------------------------------------------------
  // Get footer position
  // --------------------------------------------------

  const getFooterTop = () => {
    const footer = document.getElementById("site-footer");

    if (!footer) {
      return window.innerHeight;
    }

    const rect = footer.getBoundingClientRect();

    // Footer viewport me visible hai
    if (rect.top < window.innerHeight) {
      return rect.top;
    }

    // Footer viewport ke neeche hai
    return window.innerHeight;
  };

  // --------------------------------------------------
  // Keep chatbot inside screen + above footer
  // --------------------------------------------------

  const keepInsideScreen = (x, y) => {
    const chatbot = chatbotRef.current;

    if (!chatbot) {
      return { x, y };
    }

    const rect = chatbot.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const margin = 10;

    const maxX = window.innerWidth - width - margin;

    // Footer ke top se chatbot ko upar rakho
    const footerTop = getFooterTop();

    const maxY = footerTop - height - margin;

    return {
      x: Math.max(
        margin,
        Math.min(x, Math.max(margin, maxX))
      ),

      y: Math.max(
        margin,
        Math.min(y, Math.max(margin, maxY))
      ),
    };
  };

  // --------------------------------------------------
  // Mouse Down
  // --------------------------------------------------

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    const chatbot = chatbotRef.current;

    if (!chatbot) return;

    const rect = chatbot.getBoundingClientRect();

    dragging.current = true;
    dragStarted.current = false;

    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    document.body.style.userSelect = "none";
  };

  // --------------------------------------------------
  // Touch Start
  // --------------------------------------------------

  const handleTouchStart = (e) => {
    const touch = e.touches[0];

    const chatbot = chatbotRef.current;

    if (!chatbot) return;

    const rect = chatbot.getBoundingClientRect();

    dragging.current = true;
    dragStarted.current = false;

    offset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  // --------------------------------------------------
  // Mouse Move + Touch Move
  // --------------------------------------------------

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!dragging.current) return;

      dragStarted.current = true;

      const newX = clientX - offset.current.x;
      const newY = clientY - offset.current.y;

      const finalPosition = keepInsideScreen(newX, newY);

      setPosition(finalPosition);
    };

    const handleMouseMove = (e) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (!dragging.current) return;

      const touch = e.touches[0];

      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      if (dragging.current) {
        localStorage.setItem(
          "chatbot-position",
          JSON.stringify(position)
        );
      }

      dragging.current = false;

      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);

    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);

      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [position]);

  // --------------------------------------------------
  // Re-position when screen/footer changes
  // --------------------------------------------------

  useEffect(() => {
    const adjustPosition = () => {
      setPosition((oldPosition) => {
        const newPosition = keepInsideScreen(
          oldPosition.x,
          oldPosition.y
        );

        localStorage.setItem(
          "chatbot-position",
          JSON.stringify(newPosition)
        );

        return newPosition;
      });
    };

    window.addEventListener("resize", adjustPosition);
    window.addEventListener("scroll", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
      window.removeEventListener("scroll", adjustPosition);
    };
  }, [isOpen]);

  // --------------------------------------------------
  // Send Message
  // --------------------------------------------------

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chatbot",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.reply ||
            data.response ||
            "Sorry, I couldn't understand that.",
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry! Unable to connect to the server."
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Enter key
  // --------------------------------------------------

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // --------------------------------------------------
  // Toggle Chat
  // --------------------------------------------------

  const handleToggle = () => {
    // Drag ke baad accidentally open/close na ho
    if (dragStarted.current) {
      dragStarted.current = false;
      return;
    }

    setIsOpen((prev) => !prev);
  };

  // --------------------------------------------------
  // Clear Chat
  // --------------------------------------------------

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hi! 👋 I'm your Blog Assistant. How can I help you?",
      },
    ]);
  };

  return (
    <div
      ref={chatbotRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="fixed z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: "none",
        cursor: dragging.current ? "grabbing" : "grab",
      }}
    >
      {/* CHAT WINDOW */}

      {isOpen && (
        <div
          className="
            absolute
            bottom-[75px]
            right-0
            w-[360px]
            max-w-[calc(100vw-20px)]
            h-[520px]
            max-h-[calc(100vh-30px)]
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-gray-200
            overflow-hidden
            flex
            flex-col
          "
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* HEADER */}

          <div
            className="
              bg-[#004b55]
              text-white
              px-4
              py-3
              flex
              items-center
              justify-between
              cursor-grab
            "
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div>
              <h3 className="font-semibold">
                Steps-Infotech Assistant
              </h3>

              <p className="text-xs opacity-80">
                Ask me anything
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={clearChat}
                className="
                  text-xs
                  px-2
                  py-1
                  rounded
                  bg-white/10
                  hover:bg-white/20
                "
              >
                Clear
              </button>

              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={() => setIsOpen(false)}
                className="
                  w-7
                  h-7
                  rounded-full
                  hover:bg-white/20
                  text-lg
                "
              >
                ×
              </button>
            </div>
          </div>

          {/* MESSAGES */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-3
              space-y-3
              bg-gray-50
            "
          >
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[80%]
                    px-3
                    py-2
                    rounded-xl
                    text-sm
                    whitespace-pre-wrap
                    ${
                      item.role === "user"
                        ? "bg-[#004b55] text-white rounded-br-sm"
                        : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                    }
                  `}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="
                    bg-white
                    px-4
                    py-3
                    rounded-xl
                    shadow-sm
                    text-gray-500
                  "
                >
                  <span className="animate-pulse">
                    ● ● ●
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}

          <div
            className="
              p-3
              bg-white
              border-t
              flex
              gap-2
            "
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="
                flex-1
                resize-none
                border
                border-gray-300
                rounded-xl
                px-3
                py-2
                text-sm
                outline-none
                focus:border-[#004b55]
              "
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="
                w-10
                h-10
                rounded-xl
                bg-[#004b55]
                text-white
                disabled:opacity-50
                flex
                items-center
                justify-center
              "
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* FLOATING CHAT BUTTON */}

      <button
        type="button"
        onClick={handleToggle}
        className="
          w-[60px]
          h-[60px]
          rounded-full
          bg-[#004b55]
          text-white
          shadow-xl
          flex
          items-center
          justify-center
          text-2xl
          hover:scale-105
          transition-transform
        "
        aria-label="Open chatbot"
      >
        🤖
      </button>
    </div>
  );
};

export default Chatbot;