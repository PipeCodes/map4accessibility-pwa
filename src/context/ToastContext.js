import React, { createContext, useContext } from 'react';
import showToast from '../components/Toast/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => (
  <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
);

export const useToast = () => useContext(ToastContext);
