// ToastProvider.js
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [showToast, setShowToast] = useState(null);

    const show = (toastFunction) => {
        setShowToast(toastFunction);
    };

    const hide = () => {
        setShowToast(null);
    };

    return (
        <ToastContext.Provider value={{ showToast, show, hide }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
