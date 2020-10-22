import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    notification.message !== "" && (
      <div className={notification.type}>{notification.message}</div>
    )
  );
};

export default Notification;
