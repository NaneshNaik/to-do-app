import React from 'react'
import { useNotifications } from './NotificationContext';

import './Notification.css';
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const notificationConfig = {
  position: {
    topCenter: {
      top: "0px",
      left: "0px",
      right: "0px",
    },
    topLeft: {
      top: "0px",
      left: "0px"
    },
    topRight: {
      top: "0px",
      right: "0px"
    },
    bottomCenter: {
      left : "0px",
      right: "0px",
      bottom: "0px"
    },
    bottomLeft: {
      bottom: "0px",
      left: "0px"
    },
    bottomRight: {
      bottom: "0px",
      right: "0px"
    }
  }
}

const noticeInfos = {
  success: {
    icon: <FaCheckCircle />,
    background: "green"
  },
  warning: {
    icon: <FaCircleInfo />,
    background: "goldenrod"
  },
  fail: {
    icon: <FaCircleXmark />,
    background: "#bf0000"
  },
}


const Notification = ({ position }) => {
  const { notifications, removeNotification } = useNotifications();

  const noticeDelHandler = (id) => {
    removeNotification(id);
  }

  return (
    <>
      {
        notifications.length !== 0 ?
          <div className="notification-wrapper"
            style={
              notificationConfig['position'][position] || notificationConfig.position.topCenter
            }
          >
            {
              notifications.map((notice) => {
                return (
                  <div key={notice.id} className={`notification ${notice.status ? `notificationStatus-${notice.status}` : ``}`}
                    style={
                      {
                        backgroundColor: (
                          notice.background || (noticeInfos[notice.status] && noticeInfos[notice.status]['background'])
                        ),
                        color: notice.color,
                        ...(notice.fixed === true ? {
                          paddingTop: '10px',
                          paddingRight: '10px',
                          paddingBottom: '10px',
                          paddingLeft: '10px',
                        } : {}),
                        ...(!noticeInfos[notice.status] && !notice.icon ? {
                          paddingLeft: '15px',
                        } : {})
                      }
                    }
                  >
                    {
                      notice.icon || (noticeInfos[notice.status] && noticeInfos[notice.status]['icon']) ?
                        <div className="icon"
                          style={
                            {
                              color: notice.iconColor
                            }
                          }
                        >
                          {
                            notice.icon || (noticeInfos[notice.status] && noticeInfos[notice.status]['icon'])
                          }
                        </div>
                        :
                        <></>
                    }
                    {
                      (notice.title || notice.description || notice.text) ?
                        <div className="text">
                          {
                            notice.title ?
                              <div className="title"
                                style={
                                  {
                                    color: notice.titleColor || notice.textsColor
                                  }
                                }
                              >
                                {notice.title}
                              </div>
                              :
                              <></>
                          }
                          {
                            notice.text ?
                              <div className="notification-text"
                                style={
                                  {
                                    color: notice.textColor || notice.textsColor
                                  }
                                }
                              >
                                {notice.text}
                              </div>
                              :
                              <></>
                          }
                          {
                            notice.description ?
                              <div className="description"
                                style={
                                  {
                                    color: notice.descriptionColor || notice.textsColor
                                  }
                                }
                              >
                                {notice.description}
                              </div>
                              :
                              <></>
                          }
                        </div>
                        :
                        <></>
                    }
                    <div className={`button ${notice.closeButtonRotate === true ? `rotateOnHover` : ``}`}>
                      <button onClick={() => noticeDelHandler(notice.id)}>
                        <FaXmark />
                      </button>
                    </div>
                    {
                      notice.fixed !== true ?
                        <div className="progress-bar"
                          style={
                            {
                              backgroundColor: notice.progressColor,
                              animationDuration: notice.duration,
                            }
                          }
                        ></div>
                        :
                        <></>
                    }
                  </div>
                )
              })
            }
          </div>
          :
          <></>
      }
    </>
  )
}

export default Notification