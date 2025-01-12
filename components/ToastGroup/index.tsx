import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const errorAlert = (text: any, position?: ToastPosition, time?: number) => {
  toast.error(text, {
    position: position || "bottom-right",
    autoClose: time || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const errorAlertCenter = (text: any, position?: ToastPosition) => {
  toast.error(text, {
    position: position || "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const warningAlert = (text: any, position?: ToastPosition, time?: number) => {
  toast.warning(text, {
    className: "bg-black",
    position: position || "top-right",
    autoClose: time || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const successAlert = (text: any, position?: ToastPosition, time?: number) => {
  toast.success(text, {
    position: position || "bottom-right",
    autoClose: time || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const infoAlert = (text: any, position?: ToastPosition, time?: number) => {
  toast.info(text, {
    position: position || "bottom-right",
    autoClose: time || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const txViewAlert = (text: any) => {
  const isDarkTheme = document.documentElement.classList.contains("dark");
  toast(text, {
    autoClose: false,
    position: "bottom-right",
    closeOnClick: true,
    theme: isDarkTheme ? "dark" : "light",
  })
}
