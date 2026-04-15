/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useCallback, useEffect, useRef, useState } from "react";

import { io, Socket } from "socket.io-client";
import { MessageInput } from "./components/MessageInput";
// DialogBox was previously used here — replaced with reusable Modal
import Modal from "@/src/components/ui/modal";
import { TOrder } from "./types";
import { addDuplicateCount } from "./utils";
// import { notificationApi, useUnifiedNotifications } from "@/src/server/socket";
import { TConversation, TMessage } from "../chat-bot/types";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL! || "http://localhost:8000";

// Demo order used during development — replace with backend data later
const demoOrder: TOrder = ({
  orderId: "DEMO-1001",
  serviceType: "Demo Service",
  orderStatus: "pending",
  createdAt: new Date().toISOString(),
} as unknown) as TOrder;

type Props = {
  order: TOrder;
};

export const ProjectChatManage = (props: Props) => {
  const { order } = props;
  const currentOrder = order ?? demoOrder;
 const authStore = { id: "33333", name: "Abhijit" };
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageLoad, setMessageLoad] = useState(false);
  const [conversation, setConversation] = useState<TConversation | null>(null);
  // const { notifications } = useUnifiedNotifications();

  const socket = useRef<Socket | null>(null);

  const [chats, setChats] = useState<TMessage[]>([
    {
      content: `Hello! 😊 I'm here to assist you with ${selectedOrder?.orderId}. How can I help you today?`,
      conversationId: "",
      serviceType: "",
      senderId: "",
      senderName: "",
      type: "order",
    },
  ]);

  const fetchReceiverId = React.useCallback(async () => {
    if (!authStore?.id || !selectedOrder?.orderId) return;
    try {
      const fetchReceiver = await fetch(
        `${SOCKET_URL}/api/messages/conversation?type=order&orderId=${selectedOrder?.orderId}&senderId=${authStore?.id}&serviceType=${selectedOrder?.serviceType}&senderName=${authStore?.name}`
      );

      const data = await fetchReceiver.json();

      setConversation(data);
    } catch (error) {
      console.error("🚀 ~ openChatModal ~ error:", (error as Error).message);
    }
  }, [
    authStore?.id,
    selectedOrder?.orderId,
    authStore?.name,
    selectedOrder?.serviceType,
  ]);

  React.useEffect(() => {
    fetchReceiverId();
  }, [fetchReceiverId]);

  // Auto scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const fetchMessage = useCallback(async () => {
    if (!authStore?.id || !selectedOrder?.orderId) return;
    try {
      setMessageLoad(true);
      const response = await fetch(
        `${SOCKET_URL}/api/messages?type=order&senderId=${authStore?.id}&serviceType=${selectedOrder?.serviceType}&orderId=${selectedOrder?.orderId}`
      );
      setMessageLoad(false);
      const data = await response.json();

      setChats(data);
    } catch (error) {
      setMessageLoad(false);
      console.error(
        "<<< failed to fetch message >>>",
        (error as Error).message
      );
    }
  }, [authStore?.id, selectedOrder?.orderId]);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  // socket connection
  useEffect(() => {
    if (!authStore?.id) return;
    socket.current = io(SOCKET_URL);

    socket.current.emit("register", authStore?.id);

    socket.current.on("private_message", (msg: TMessage) => {
      setChats((prev) => [
        ...prev,
        { ...msg, createdAt: new Date(), updatedAt: new Date() },
      ]);
    });

    // for notification on user new message
    // socket.current.on(`notification:${authStore?.id}`, handleNotification);
    // socket.current.on("presence", (users: string[]) => setOnlineUsers(users));

    return () => {
      socket.current?.disconnect();
    };
  }, [authStore?.id, selectedOrder?.orderId]);

  const sendMyMessage = async () => {
    if (!message?.trim() || !authStore?.id) return;

    try {
      const msg: TMessage = {
        senderId: authStore?.id!,
        senderName: authStore?.name!,
        receiverId: selectedOrder?.orderId,
        content: message,
        createdAt: new Date(),
        conversationId: conversation?.conversationId!,
        serviceType: selectedOrder?.serviceType!,
        type: "order",
        orderId: selectedOrder?.orderId,
        authority: "user",
        receiverUserId: authStore?.id!,
      };

      socket.current?.emit("private_message", msg);

      setChats((prev) => [...prev, msg]);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const [boxOpenLoad, setBoxOpenLoading] = useState(false);

  const handleOpenMessageBox = async (_order: TOrder) => {
    // TODO Notification read
    try {
      setBoxOpenLoading(true);
      // await notificationApi.orderIdByRead({
      //   userId: authStore?.id!,
      //   orderId: _order?.orderId,
      // });

      setSelectedOrder(_order);
      setIsChatModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setBoxOpenLoading(false);
    }
    }

    function renderMessageButton(_order: TOrder) {
      // const counts = addDuplicateCount(notifications, "orderId");
      // const storeCountNumber = counts?.find(
      //   (item) => item?.orderId == _order?.orderId
      // )?.duplicateCount;
      const storeCountNumber = 3

      if (_order.orderStatus == "pending" || _order.orderStatus == "working") {
        return (
          <button
            onClick={() => handleOpenMessageBox(_order)}
            className={`m-2 flex items-center gap-2 rounded bg-primary px-2 py-2 text-sm font-semibold text-white relative ${
              boxOpenLoad ? "opacity-50" : ""
            }`}
          >
            Message
            {storeCountNumber! > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {storeCountNumber}
              </span>
            )}
          </button>
        );
      }
      return null;
    }

  return (
    <>
      {renderMessageButton(currentOrder)}

      <Modal
        isOpen={isChatModalOpen}
        onClose={() => {
          setIsChatModalOpen(false);
          setSelectedOrder(null);
          window.location.reload();
        }}
        size="xl"
        title={"Messages"}
      >
        <div className="max-w-xl mx-auto">
          <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 uppercase">
                    {selectedOrder?.serviceType}
                  </span>
                  <span className="text-sm text-gray-500">{selectedOrder?.orderId}</span>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        selectedOrder?.orderStatus === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {selectedOrder?.orderStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Created:</span>
                    <span className="text-sm text-gray-500">{new Date(selectedOrder?.createdAt!).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex min-h-[500px] flex-col justify-between rounded-b-lg p-1">
            {messageLoad ? (
              <div className="flex items-center justify-center min-h-[40vh]">
                <div>Loading...</div>
              </div>
            ) : (
              <div
                className={`max-h-[600px] grow overflow-y-auto p-4 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 flex flex-col gap-3 ${
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
                        isOwnMessage(message.senderId) ? "justify-end" : "justify-start"
                      }`}
                      aria-label={`Message from ${isOwnMessage(message.senderId) ? "you" : "sender"}`}
                    >
                      <div className={`flex max-w-[80%] ${isOwnMessage(message.senderId) ? "flex-row-reverse" : ""}`}>
                        {!isOwnMessage(message.senderId) && (
                          <div className="shrink-0 mr-2 mt-1">
                            <img src={"/avatar.png"} alt={"User avatar"} className="w-8 h-8 rounded-full" />
                          </div>
                        )}
                        <div className={`flex flex-col ${isOwnMessage(message.senderId) ? "items-end" : "items-start"}`}>
                          {!isOwnMessage(message.senderId) && (
                            <span className="text-xs font-medium text-gray-600 mb-1">Sender</span>
                          )}
                          <div className={`px-4 py-2 rounded-2xl ${isOwnMessage(message.senderId) ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
                            <p className="text-[15px] leading-snug">{message.content}</p>
                          </div>
                          <span className={`text-xs mt-1 ${isOwnMessage(message.senderId) ? "text-gray-500" : "text-gray-400"}`}>
                            {new Date(message.createdAt as Date)?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
            <MessageInput message={message} setMessage={setMessage} onSend={sendMyMessage} />
          </div>
        </div>
      </Modal>
    </>
  );
};
