// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import userSerrvices from "../../../services/user.serrvices";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userData, setUserData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        userImage: "",
    });

    const updateUserData = (newData) => {
        setUserData(newData);
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
