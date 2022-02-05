import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  label: String;
  children: React.ReactNode;
};

const Modal = ({ label, children }: Props): JSX.Element => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="btn-primary px-3 py-1" onClick={() => setShow(true)}>
        {label}
      </button>

      {show && (
        <div
          className="flex items-center justify-center fixed z-50 inset-0 overflow-x-hidden overflow-y-auto bg-black/20"
          onClick={() => setShow(false)}
        >
          <div
            className="rounded bg-white shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                className="btn-text-secondary p-2"
                onClick={() => setShow(false)}
              >
                <AiOutlineClose />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
