import './Notification.scss';

function Notification({ children, type }) {
  return (
    <div
      className={`
        notification
        ${type && `notification__${type}`}
      `}
    >
      {children}
    </div>
  );
}

export default Notification;