import { onMessageListener, requestPermission } from '../../utils/firebase'
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Notification = () => {
    const [notification, setNotification] = useState({ title: '', body: '' })

    useEffect(() => {
        console.log("co noti")
    }, [notification])

    requestPermission((token) => {
        console.log(token)
    });

    onMessageListener()
        .then((payload) => {
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body,
            })
        })
        .catch((err) => console.log('failed: ', err))
}

export default Notification