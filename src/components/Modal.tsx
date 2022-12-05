import React, { ReactNode, useEffect, useRef } from "react";
import "./Modal.css";

type ModalProp = {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  hideCloseButton?: boolean;
  children: ReactNode;
};

const Modal = ({ show, setShow, hideCloseButton, children }: ModalProp) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const clickOutsideContent = (e: any) => {
      if (e.target === modalRef.current) {
        setShow(false);
      }
    };
    window.addEventListener("click", clickOutsideContent);
    return () => {
      window.removeEventListener("click", clickOutsideContent);
    };
  }, []);

  return (
    <div ref={modalRef} className={`modal ${show ? "active" : ""}`}>
      <div className="modal__content">
        {!hideCloseButton && (
          <span onClick={() => setShow(false)} className="modal__close">
            &times;
          </span>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;

type ChilderenProp = {
  children: ReactNode;
};

export const ModalHeader = ({ children }: ChilderenProp) => {
  return <div className="modal__header">{children}</div>;
};

export const ModalBody = ({ children }: ChilderenProp) => {
  return <div className="modal__body">{children}</div>;
};

export const ModalFooter = ({ children }: ChilderenProp) => {
  return <div className="modal__footer">{children}</div>;
};
