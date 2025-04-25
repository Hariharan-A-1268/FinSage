import { useOutsideClick } from "../hooks/useOutsideClick";

/* eslint-disable react/prop-types */
function Modal({ close, children }) {
  const ref = useOutsideClick(close);
  return (
    <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black">
      <div
        ref={ref}
        className="no-scrollbar relative m-auto h-1/2 w-1/4 overflow-auto rounded-lg border-2 border-[var(--color-text)] bg-[var(--color3)] p-2 text-sm text-[var(--color-text)]"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
