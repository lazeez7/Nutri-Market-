import styles from "./styles.module.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useCart } from "react-use-cart";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Товар добавился в Корзину");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const ProductModal = ({ state, setState }) => {
  const { addItem, getItem, removeItem } = useCart();
  //useCart
  return (
    <>
      <Modal
        open={state.open}
        onClose={() => setState({ open: false, data: null })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-ultra">
          <div onClick={() => setState(false)} className={styles.back}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <div className={styles.modal}>
            <img src={state.data?.image} alt="" />
            <div className={styles.modalproductdetalis}>
              <h3>{state.data?.name_ru}</h3>
              <span>{state.data?.definition_ru}</span>
              <p>от {state.data?.price.toLocaleString()} сум</p>
              {!getItem(state.data?.id) ? (
                <button
                  className={styles.modal_btn}
                  onClick={() => {
                    addItem(state.data);
                    setState(false);
                    notify();
                  }}
                >
                  В Корзину
                </button>
              ) : (
                <button
                  className={styles.modal_btn_x}
                  onClick={() => removeItem(state.data?.id)}
                >
                  Отменить
                </button>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "bg-blur",
          duration: 3000,
          
        }}
      />
    </>
  );
};

export default ProductModal;
