import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const useCtx = useContext(UserProgressContext);

    const total = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0)
    function handleClose() {
        useCtx.hideCheckout();
    }

    return (
        <Modal open={useCtx.progress === "checkout"}>
            <form>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(total)}</p>
                <Input label="Full Name" type='text' id='full-name'/>
                <Input label="Email Address" type='email' id='email'/>
                <Input label="Street" type='street' id='street'/>

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button textOnly type="button" onClick={handleClose}>
                        Close
                    </Button>
                    <Button>
                        Submit Order
                    </Button>
                </p>
            </form>


        </Modal>
    )
}