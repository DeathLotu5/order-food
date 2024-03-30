import { createPortal } from "react-dom";
import { useContext, useEffect, useRef } from "react";

import CartContext from "../../store/CartContext.jsx";
export default function Modal({ children, open, classNames = '' }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${classNames}`}>
            {children}
        </dialog>
    , document.getElementById('modal'))

}