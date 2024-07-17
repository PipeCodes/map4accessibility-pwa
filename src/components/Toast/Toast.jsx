import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToast } from './Toast.styles';

let currentToastId = null;
const showToast = (message, options = {}, fontSize, font) => {
  if (currentToastId) toast.dismiss(currentToastId);

  const defaultOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  currentToastId = toast(
    <StyledToast fontSize={fontSize} font={font}>
      {message}
    </StyledToast>,
    {
      ...defaultOptions,
      ...options,
    },
  );
};

export default showToast;
