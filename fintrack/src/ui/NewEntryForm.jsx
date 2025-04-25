import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  openNewEntryModal,
  resetNewEntryForm,
  updateEntry,
} from "../features/entries/entriesSlice";
import { useUser } from "../hooks/auth/useUser";
import { useAddEntry } from "../hooks/entries/useAddEntry";
import SpinnerMini from "../ui/SpinnerMini";

function NewEntryForm() {
  const { newEntry } = useSelector((store) => store.entries);
  const dispatch = useDispatch();
  const { user } = useUser();
  const categories = user.user_metadata.categories || [];

  const { addEntry, isAdding } = useAddEntry();
  function handleFormSubmit(e) {
    {
      e.preventDefault();
      const max = 10000;
      const min = 99999;
      const id = Math.floor(Math.random() * (max - min) + min);
      addEntry({ entry: { id: id, username: user.email, ...newEntry } });
      dispatch(resetNewEntryForm());
      dispatch(openNewEntryModal(false));
    }
  }
  return (
    <Modal close={() => dispatch(openNewEntryModal(false))}>
      <h1 className="m-auto mb-2 flex justify-center font-bold text-[var(--color9)]">
        Create a New Entry 📝
      </h1>
      <form className="mb-3 flex flex-col text-sm" onSubmit={handleFormSubmit}>
        <div className="mt-1">
          <label className="mr-1 font-bold">Date*</label>
          <input
            required
            className="mr-2 rounded-lg bg-[var(--color6)] text-wrap"
            type="date"
            value={newEntry.date}
            onChange={(e) => {
              dispatch(
                updateEntry({
                  ...newEntry,
                  date: e.target.value,
                }),
              );
            }}
          />
        </div>
        <div className="mt-1">
          <label className="mr-1 font-bold">Name of expense*</label>
          <input
            required
            className="mr-2 rounded-lg bg-[var(--color6)]"
            type="text"
            placeholder="Expense Name"
            value={newEntry.name}
            onChange={(e) =>
              dispatch(
                updateEntry({
                  ...newEntry,
                  name: e.target.value,
                }),
              )
            }
          />
        </div>
        <div className="mt-1">
          <label className="mr-1 font-bold">Category*</label>
          <select
            required
            defaultValue={categories ? categories[0] : ""}
            defaultChecked={categories ? categories[0] : ""}
            id="category"
            className="mr-2 rounded-lg bg-[var(--color6)]"
            value={newEntry.category}
            onChange={(e) =>
              dispatch(
                updateEntry({
                  ...newEntry,
                  category: e.target.value,
                }),
              )
            }
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1">
          <label className="mr-1 font-bold">essential*</label>
          <select
            id="essential"
            className="mr-2 rounded-lg bg-[var(--color6)]"
            value={newEntry.essential}
            onChange={(e) =>
              dispatch(
                updateEntry({
                  ...newEntry,
                  essential: e.target.value,
                }),
              )
            }
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="mt-1">
          <label className="mr-1 font-bold">Amount*</label>
          <input
            type="number"
            min={1}
            className="border-2 break-words"
            value={newEntry.amount}
            onChange={(e) =>
              dispatch(
                updateEntry({
                  ...newEntry,
                  amount: e.target.value,
                }),
              )
            }
          />
        </div>
        <div className="mt-1">
          <label className="mr-1">Description</label>
          <textarea
            className={`no-scrollbar w-full resize-none border-2 break-words`}
            type="text"
            rows={4}
            value={newEntry.description}
            onChange={(e) =>
              dispatch(
                updateEntry({
                  ...newEntry,
                  description: e.target.value,
                }),
              )
            }
          />
          <div className="mt-1 flex justify-end">
            {isAdding ? (
              <SpinnerMini />
            ) : (
              <button className="w-auto rounded-lg bg-[var(--color6)] p-1 font-bold">
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default NewEntryForm;
