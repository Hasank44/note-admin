import React, { createContext, useEffect, useState, useMemo } from 'react';
import api from '../utils/sentAuthHeader';
import { useContext } from 'react';
import { MessageContext } from './MessageProvider';

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const { toast } = useContext(MessageContext);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users
useEffect(() => {
  api.get(`/users`)
    .then((response) => {
      const users = Array.isArray(response.data) 
        ? response.data 
        : response.data.users || [];
      setAllUsers(users);
    })
    .catch((error) => {
      toast.error(error.message);
    })
}, [toast]);

 
  const notesInfo = useMemo(
    () => ({
      allUsers,
    }),
    [allUsers,]
  );

  return (
    <UserContext.Provider value={notesInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;