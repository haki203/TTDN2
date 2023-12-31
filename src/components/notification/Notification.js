import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import notifee, { EventType,AndroidVisibility  } from '@notifee/react-native';

export default function Notification(props) {
  const { isPlay, title, chuong, state } = props;

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      const { notification, pressAction } = detail;
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail);
          refreshNoti(notification)
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail);
          refreshNoti(notification)
          break;

      }
    });


  }, []);
  const refreshNoti=async(notification)=>{
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.cancelNotification(notification.id)
    await notifee.displayNotification({
      title: title,
      body: 'Đang phát...',
      android: {
        channelId,
        autoCancel:false,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  useEffect(() => {
    console.log("state noti ne: ", state);
    if (isPlay) {
      onCancelNotification()

      onDisplayNotification(title);
    } else {
      onCancelNotification()
    }
  }, [state, isPlay, title, chuong]);
  async function onCancelNotification() {
    await notifee.cancelAllNotifications();
  }
  async function onDisplayNotification(title) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;
      console.log("onBackgroundEvent notification CC", notification);
      console.log("onBackgroundEvent pressAction CC", pressAction);
      await notifee.cancelNotification(notification.id)
      await notifee.displayNotification({
        title: title,
        body: 'Đang phát...',
        android: {
          channelId,
          autoCancel:false,
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });

    });
    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: 'Đang phát...',
      android: {
        channelId,
        autoCancel:false,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
    // notifee.onBackgroundEvent({

    // })
  }

  return (
    <>
    </>
  );
}