/* eslint-disable react/prop-types */
import { HiCheckCircle, HiPencil, HiTrash, HiXCircle } from "react-icons/hi2";
import { getCategoryTagBgClass } from "../utils/helper";
import { useState } from "react";

function SettingsCategoryTag({ name, index, categories, updateUser }) {
  const initialName = name;
  const [categoryName, setCategoryName] = useState(name);
  const [canEditCategory, setCanEditCategory] = useState(false);
  const bgClass = getCategoryTagBgClass(index);

  return (
    <div
      className={`inline-flex flex-row gap-2 rounded-lg ${bgClass} p-1 text-sm font-semibold text-[var(--color-text)]`}
    >
      <input
        type="text"
        required
        value={categoryName}
        maxLength={20}
        disabled={!canEditCategory}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      {canEditCategory ? (
        <>
          <HiXCircle
            className="mt-1"
            onClick={() => {
              setCategoryName(() => initialName);
              setCanEditCategory(() => false);
            }}
          />
          <HiCheckCircle
            className="mt-1"
            onClick={() => {
              categories[index - 1] = categoryName;
              setCanEditCategory(false);
              updateUser({ categories });
            }}
          />
        </>
      ) : (
        <>
          <HiPencil className="mt-1" onClick={() => setCanEditCategory(true)} />
          <HiTrash
            className="mt-1"
            onClick={() => {
              updateUser({
                categories: categories.filter(
                  (category) => category !== categoryName,
                ),
              });
            }}
          />
        </>
      )}
    </div>
  );
}
export default SettingsCategoryTag;
