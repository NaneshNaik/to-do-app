import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

function convertTimeToMilliseconds(time) {
  const timeString = time?.toString();

  const regex = /^(\d+)(ms|s)$/;
  const match = timeString?.match(regex);

  if (!match) {
    return
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  if (unit === 'ms') {
      return value;
  } else if (unit === 's') {
      return value * 1000;
  }
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notice) => {
    const Id = uuidv4();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        ...notice,
        id: Id
      }
    ]);
    const noticeDuration = convertTimeToMilliseconds(notice?.duration);
    if (notice.fixed === true) {
      return;
    }
    setTimeout(() => {
      removeNotification(Id);
    }, noticeDuration || 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notice) => notice.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
