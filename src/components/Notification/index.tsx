import React from "react";

interface NotificationProps {
    message: string;
    status: "ERROR" | "MESSAGE";
  }
  

export const Notification: React.FC<NotificationProps> = ({ message, status }: NotificationProps) => {

  const getNotificationStyle = () => {
    if (status === "ERROR") return { backgroundColor: "red", color: "white" };
    if (status === "MESSAGE") return { backgroundColor: "green", color: "white" };
    return {};
  };

  return (
    <div style={{
      ...getNotificationStyle(),
      padding: "10px",
      borderRadius: "5px",
      position: "fixed",
      height:"400px",
      top: "20px",
      right: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    }}>
      {message}
    </div>
  );
};

export default Notification;
