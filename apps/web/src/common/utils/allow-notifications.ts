export const allowNotifications = () => {
  if ('Notification' in window) {
    return Notification.requestPermission();
  }
};
