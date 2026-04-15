import React, { useCallback, useEffect, useRef, useState } from "react";
import { TMessage } from "./types";
import { io, Socket } from "socket.io-client";
import { WelcomeHeader } from "./components/Wellcome";
import { CategoryGrid } from "./components/CategoryGrid";
import { MessageInput } from "./components/MessageInput";
import { ChatHeader } from "./components/ChatHeader";
import { FeedbackModal } from "./components/FeedbackModal";

type UpdateConversationProps = {
  isOpen: boolean;
  setMinimise: (value: boolean) => void;
  setIsChatModalOpen: (value: boolean) => void;
};

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL! || "http://localhost:8000";

export const ChatBoxManage = ({
  isOpen,
  setMinimise,
  setIsChatModalOpen,
}: UpdateConversationProps) => {
  // Demo auth when Redux isn't used yet — replace with real auth later
  const authStore = { id: "33333", name: "Abhijit" };
  const [chatbox, setChatbox] = useState(false);
  const [messageCategory, setMessageCategory] = useState("");
  const [isSmallModalOpen, setSmallModalOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalClose, setIsModalClose] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageLoad, setMessageLoad] = useState(false);
  const [conversationId, setConversationId] = useState("");

  const socket = useRef<Socket | null>(null);

  const [chats, setChats] = useState<TMessage[]>([
    {
      content: `Hello! 😊 I'm here to assist you with ${messageCategory}. How can I help you today?`,
      conversationId: "",
      serviceType: "",
      senderId: "",
      senderName: "",
      type: "live",
    },
  ]);

  const fetchReceiverId = React.useCallback(async () => {
    if (!authStore?.id || !messageCategory) return;
    try {
      const fetchReceiver = await fetch(
        `${SOCKET_URL}/api/messages/conversation?type=live&senderId=${
          authStore?.id
        }&serviceType=${messageCategory?.toLowerCase()}&senderName=${
          authStore?.name
        }`
      );

      const data = await fetchReceiver.json();

      setConversationId(data?.conversationId);
    } catch (error) {
      console.error("🚀 ~ openChatModal ~ error:", (error as Error).message);
    }
  }, [authStore?.id, messageCategory, authStore?.name]);

  React.useEffect(() => {
    fetchReceiverId();
  }, [fetchReceiverId]);

  const openChatModal = async (category: string) => {
    setMessageCategory(category);

    setSmallModalOpen(false);
    setChatbox(true);
  };

  const handleMinimize = () => {
    setIsChatModalOpen(false);
    setMinimise(true);
  };

  const handleClose = () => {
    setMessageCategory("");
    setIsModalClose(true);
  };

  const handleFeedback = () => {
    setMessageCategory("");
    setIsModalClose(false);
    setIsChatModalOpen(false);
  };

  // Auto scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const fetchMessage = useCallback(async () => {
    if (!authStore?.id) return;
    try {
      setMessageLoad(true);
      const response = await fetch(
        `${SOCKET_URL}/api/messages?type=live&senderId=${
          authStore?.id
        }&serviceType=${messageCategory?.toLowerCase()}`
      );
      setMessageLoad(false);
      const data = await response.json();

      setChats(data);
    } catch (error) {
      setMessageLoad(false);
      console.error(
        "<<< faield to fetch message >>>",
        (error as Error).message
      );
    }
  }, [authStore?.id, messageCategory]);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  useEffect(() => {
    socket.current = io(SOCKET_URL);

    socket.current.emit("register", authStore?.id);

    socket.current.on("private_message", (msg: TMessage) => {
      setChats((prev) => [
        ...prev,
        { ...msg, createdAt: new Date(), updatedAt: new Date() },
      ]);
    });

    // socket.current.on("presence", (users: string[]) => setOnlineUsers(users));

    return () => {
      socket.current?.disconnect();
    };
  }, [authStore?.id]);

  const sendMyMessage = async () => {
    if (!message?.trim() || !authStore?.id) return;

    // if (!receiverId) return;

    try {
      const msg: TMessage = {
        senderId: authStore.id,
        senderName: authStore.name,
        receiverId: conversationId,
        content: message,
        createdAt: new Date(),
        conversationId: conversationId,
        serviceType: messageCategory.toLowerCase(),
        type: "live",
        authority: "user",
      };

      // determine if this is the user's first message in this chat
      const isFirstUserMessage = !chats.some((c) => c.senderId === authStore.id);

      socket.current?.emit("private_message", msg);
      setChats((prev) => [...prev, msg]);
      setMessage("");

      // If this is the first user message, append a default automated reply
      if (isFirstUserMessage) {
        const botReply: TMessage = {
          senderId: "bot",
          senderName: "Support",
          receiverId: authStore.id,
          content: `Thanks ${authStore.name}! We've received your message about ${
            messageCategory || "your request"
          }. An agent will respond shortly. Meanwhile, please share any additional details.`,
          createdAt: new Date(),
          conversationId: conversationId,
          serviceType: messageCategory.toLowerCase(),
          type: "live",
          authority: "admin",
        };

        // simulate a slight delay before showing the automated reply
        setTimeout(() => {
          setChats((prev) => [...prev, botReply]);
        }, 700);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isSmallModalOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "16px",
            width: "400px",
            zIndex: 100,
          }}
          className="rounded-xl bg-gray-100 pb-4 shadow-md"
        >
          <button
            onClick={() => setIsChatModalOpen(false)}
            className="absolute right-4 top-2 text-3xl text-base-100 cursor-pointer hover:border border-base-200 rounded-full px-2"
          >
            ×
          </button>
          <WelcomeHeader />
          <CategoryGrid onSelectCategory={openChatModal} />
          {messageCategory && (
            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={sendMyMessage}
            />
          )}
        </div>
      )}
      {isOpen && chatbox && (
        <div
          style={{
            position: "fixed",
            bottom: "64px",
            right: "0px",
            zIndex: 100,
          }}
          className="m-[2px] h-[calc(100vh-25vh)] w-[450px] rounded-xl bg-base-100 shadow-lg"
        >
          <ChatHeader onMinimize={handleMinimize} onClose={handleClose} />
          <div className="flex h-[calc(100%-72px)] flex-col justify-between rounded-b-lg p-1">
            {messageLoad ? (
              <div className="flex items-center justify-center min-h-[40vh]">
                <div>Loading...</div>
              </div>
            ) : (
              <div
                className={`h-full flex-grow overflow-y-auto p-4 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 flex flex-col gap-3 ${
                  messageLoad ? "hidden" : "flex"
                }`}
              >
                {chats?.map((message, index) => {
                  function isOwnMessage(senderId: string) {
                    const isOwn = senderId == authStore?.id;
                    return isOwn;
                  }
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isOwnMessage(message.senderId)
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      aria-label={`Message from ${
                        isOwnMessage(message.senderId) ? "you" : "sender"
                      }`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          isOwnMessage(message.senderId)
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        {!isOwnMessage(message.senderId) && (
                          <div className="flex-shrink-0 mr-2 mt-1">
                            <img
                              src={"/avatar.png"}
                              alt={"User avatar"}
                              className="w-8 h-8 bg-primary rounded-full"
                            />
                          </div>
                        )}

                        <div
                          className={`flex flex-col ${
                            isOwnMessage(message.senderId)
                              ? "items-end"
                              : "items-start"
                          }`}
                        >
                          {!isOwnMessage(message.senderId) && (
                            <span className="text-xs font-medium text-gray-600 mb-1">
                              Sender
                            </span>
                          )}

                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwnMessage(message.senderId)
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                            }`}
                          >
                            <p className="text-[15px] leading-snug">
                              {message.content}
                            </p>
                          </div>

                          <span
                            className={`text-xs mt-1 ${
                              isOwnMessage(message.senderId)
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            {new Date(
                              message.createdAt as Date
                            )?.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={sendMyMessage}
            />
          </div>
        </div>
      )}
      <div
          style={{
            position: "fixed",
            bottom: "64px",
            right: "0px",
            zIndex: 100,
          }}
        className={`m-[2px] h-[calc(100vh-25vh)]  w-[450px] transform rounded-lg bg-base-100 p-4 shadow-lg transition-transform duration-500 ${
          isModalClose ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FeedbackModal
          onClose={() => setIsModalClose(false)}
          onFeedback={handleFeedback}
        />
      </div>
    </>
  );
};
