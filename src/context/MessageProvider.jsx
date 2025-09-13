import React from 'react';
import { createContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MessageContext = createContext();

const MessageProvider = ({children}) => {

const values = {
    toast,
    ToastContainer
};
  return (
    <MessageContext.Provider value={values}>
        {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;