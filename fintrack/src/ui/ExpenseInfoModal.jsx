/* eslint-disable react/prop-types */
import {
  HiMiniCheckCircle,
  HiMiniPencil,
  HiMiniXCircle,
} from "react-icons/hi2";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  openExpenseInfoModal,
  updateCanEditDescriptionModal,
} from "../features/entries/entriesSlice";

function ExpenseInfoModal({ entry, setEntry, tempData }) {
  const { canEditDescriptionModal } = useSelector((store) => store.entries);
  const dispatch = useDispatch();
  return (
    <Modal
      close={() => {
        dispatch(updateCanEditDescriptionModal(false));
        dispatch(openExpenseInfoModal(false));
      }}
    >
      <div className="flex flex-row justify-center">
        <h1 className="font-bold">{entry.name}</h1>
        {canEditDescriptionModal ? (
          <div className="flex flex-row">
            <HiMiniCheckCircle
              className="absolute right-1 bottom-1 h-8 w-5"
              onClick={() => {
                setEntry(() => entry);
                dispatch(canEditDescriptionModal(false));
              }}
            />
            <HiMiniXCircle
              className="absolute right-6 bottom-1 h-8 w-5"
              onClick={() => {
                dispatch(canEditDescriptionModal(false));
                setEntry(() => tempData);
              }}
            />
          </div>
        ) : (
          <div className="flex">
            <HiMiniPencil
              onClick={() => dispatch(canEditDescriptionModal(true))}
              className="absolute right-1 bottom-1 h-8 w-5"
            />
          </div>
        )}
      </div>

      <textarea
        className={`no-scrollbar w-full resize-none break-words ${
          canEditDescriptionModal ? "border-2" : ""
        }`}
        type="text"
        rows={4}
        value={entry.description}
        onChange={(e) => setEntry({ ...entry, description: e.target.value })}
        disabled={!canEditDescriptionModal}
      />
    </Modal>
  );
}

export default ExpenseInfoModal;
