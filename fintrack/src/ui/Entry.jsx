/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiInformationCircle, HiMiniPencil } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { HiMiniXCircle } from "react-icons/hi2";
import ExpenseInfoModal from "./ExpenseInfoModal";
import { useDispatch, useSelector } from "react-redux";
import {
  openExpenseInfoModal,
  updateCanEditEntry,
} from "../features/entries/entriesSlice";
import { getCategoryTagBgClass } from "../utils/helper";
import { useUser } from "../hooks/auth/useUser";
import { useChangeEntry } from "../hooks/entries/useChangeEntry";
import { useDeleteEntry } from "../hooks/entries/useDeleteEntry";
import SpinnerMini from "./SpinnerMini";

function YesOrNo({ children, color }) {
  return (
    <div className={`w-10 justify-center rounded-lg ${color} px-2`}>
      {children}
    </div>
  );
}
function CategoryTag({ entry, categroyMap }) {
  const bgClass = getCategoryTagBgClass(categroyMap.get(entry.category));
  return (
    <div
      className={`w-32 justify-items-center rounded-lg ${bgClass} break-all`}
    >
      {<p className="text-wrap uppercase">{entry.category}</p>}
    </div>
  );
}

function Entry({ data }) {
  const [entry, setEntry] = useState(data);
  const tempData = { ...entry };
  const dispatch = useDispatch();
  const { expenseInfoModalOpen, canEditEntry } = useSelector(
    (store) => store.entries,
  );
  const { changeEntry, isUpdating } = useChangeEntry();
  const { deleteEntry, isDeleting } = useDeleteEntry();
  const { user } = useUser();
  const categories = user.user_metadata.categories || [];
  const categroyMap = new Map(categories.map((el, index) => [el, index + 1]));
  {
    if (!isUpdating && !isDeleting) {
      <SpinnerMini />;
    }
  }
  if (expenseInfoModalOpen)
    return (
      <tr>
        <td>
          <ExpenseInfoModal
            entry={entry}
            setEntry={setEntry}
            tempData={tempData}
          />
        </td>
      </tr>
    );
  return (
    <tr className="ml-3 mr-3  grid grid-cols-7 justify-items-center gap-5 rounded-lg border-2 bg-[var(--color-background)] p-2 font-bold text-[var(--color-text)]">
      <td className="whitespace-nowrap">{entry.id}</td>

      <td className="whitespace-nowrap">
        <input
          className="text-wrap"
          type="date"
          value={entry.date}
          onChange={(e) => {
            setEntry({ ...entry, date: e.target.value });
          }}
          disabled={!canEditEntry}
        />
      </td>
      <td className="whitespace-nowrap">
        {!canEditEntry ? (
          <CategoryTag entry={entry} categroyMap={categroyMap} />
        ) : (
          <select
            id="category"
            className="w-auto justify-center rounded-lg bg-[var(--color6)] px-2"
            value={entry.category}
            disabled={!canEditEntry}
            onChange={(e) => setEntry({ ...entry, category: e.target.value })}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="justify-items-center whitespace-nowrap">
        {!canEditEntry ? (
          <p>{entry.name}</p>
        ) : (
          <input
            className={`w-32 ${canEditEntry ? "border-2 border-[var(--color-text)]" : ""}`}
            type="search"
            value={entry.name}
            onChange={(e) => setEntry({ ...entry, name: e.target.value })}
            disabled={!canEditEntry}
          />
        )}
      </td>
      <td className="whitespace-nowrap">
        {!canEditEntry ? (
          entry.essential === "Yes" ? (
            <YesOrNo color="bg-[var(--color6)]">Yes</YesOrNo>
          ) : (
            <YesOrNo color="bg-[var(--color2)]">No</YesOrNo>
          )
        ) : (
          <select
            id="essential"
            className="w-auto justify-center rounded-lg bg-[var(--color6)] px-2"
            value={entry.essential}
            disabled={!canEditEntry}
            onChange={(e) => setEntry({ ...entry, essential: e.target.value })}
          >
            <option value="Yes" key="Yes">
              Yes
            </option>
            <option value="No" key="No">
              No
            </option>
          </select>
        )}
      </td>
      <td className="whitespace-nowrap">₹{entry.amount}</td>
      <td className="flex flex-row justify-between gap-2">
        {canEditEntry ? (
          <>
            <HiMiniCheckCircle
              className="h-8 w-5"
              onClick={() => {
                changeEntry(entry);

                dispatch(updateCanEditEntry(false));
              }}
            />
            <HiMiniXCircle
              className="h-8 w-5"
              onClick={() => {
                dispatch(updateCanEditEntry(false));
                setEntry(() => tempData);
              }}
            />
          </>
        ) : (
          <>
            <HiInformationCircle
              className="h-8 w-5"
              onClick={() => {
                dispatch(openExpenseInfoModal(true));
                setEntry(() => entry);
              }}
            />
            <HiMiniPencil
              onClick={() => dispatch(updateCanEditEntry(true))}
              className="h-8 w-5"
            />

            <HiMiniTrash
              onClick={() => deleteEntry(entry.uuid)}
              className="h-8 w-5"
            />
          </>
        )}
      </td>
    </tr>
  );
}

export default Entry;
