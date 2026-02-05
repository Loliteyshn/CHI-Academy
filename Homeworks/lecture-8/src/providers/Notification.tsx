import { createContext, use, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.REACT_APP_BASE_URL + '/notifications';

interface NotificationContextType {
    user: string
    message: string
}

const NotificationContext = createContext<NotificationContextType | null>(null);


const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState({ user: '', message: '' });
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1)
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
        });

        socket.on('newPost', (data: NotificationContextType) => {
            setNotifications(data);
            if (page === 1) navigate(0);
            toast.success(`New post by ${data.user}: ${data.message}`, { duration: 5000 });
        })

        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <NotificationContext.Provider value={notifications}>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;
