import { HiFunnel } from "react-icons/hi2";
import { HiMiniPlusCircle } from "react-icons/hi2";
import AdvancedFilters from "../ui/AdvancedFilters";
import { formatDateISO } from "../utils/helper";
import Pagination from "../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import NewEntryForm from "../ui/NewEntryForm";
import { CSVLink } from "react-csv";
import FiltersAndSettings from "../ui/FiltersAndSettings";
import { useDispatch, useSelector } from "react-redux";

import {
  filterByCategory,
  filterByDate,
  filterByEssential,
  openFilterModal,
  openNewEntryModal,
  reset,
  searchExpense,
} from "../features/entries/entriesSlice";
import { useUser } from "../hooks/auth/useUser";
import { useEntries } from "../hooks/entries/useEntries";
import Spinner from "../ui/Spinner";

function Entries() {
  const {
    searchName,
    date,
    essential,
    category,

    filterModalOpen,
    newEntryModalOpen,
  } = useSelector((store) => store.entries);
  const { entryList, isGetting, count } = useEntries();

  const { user } = useUser();
  const categories = user?.user_metadata?.categories || [];

  const dispatch = useDispatch();
  // const minDate = entryList.reduce((prev, curr) =>
  //   prev.date < curr.date ? prev : curr,
  // ).date;
  const minDate = "2000-01-01";
  const [searchParams, setSearchParams] = useSearchParams();
  function FilterBy(field, value) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex flex-col text-[var(--color-text)]">
      {isGetting && (
        <div className="absolute inset-0 z-50 flex items-center backdrop-blur-xs">
          <Spinner />
        </div>
      )}
      <div className="mb-6 mr-3 mt-5 flex flex-row justify-end">
        {newEntryModalOpen && <NewEntryForm />}
        {filterModalOpen && <AdvancedFilters minDate={minDate} />}

        <div className="mt-1">
          <label className="mr-1">Category</label>
          <select
            id="category"
            defaultChecked="nofilter"
            className="mr-2 rounded-lg bg-[var(--color6)]"
            value={category}
            onChange={(e) => {
              FilterBy("category", e.target.value);
              dispatch(filterByCategory(e.target.value));
              searchParams.set("page", 1);
              setSearchParams(searchParams);
            }}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
            <option value="nofilter">No Filter</option>
          </select>
        </div>
        <div className="mt-1">
          <label className="mr-1">Essential</label>
          <select
            id="essential"
            className="mr-2 rounded-lg bg-[var(--color6)]"
            value={essential}
            onChange={(e) => {
              FilterBy("essential", e.target.value);
              dispatch(filterByEssential(e.target.value));
              searchParams.set("page", 1);
              setSearchParams(searchParams);
            }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="nofilter">No Filter</option>
          </select>
        </div>
        <div>
          <input
            className="mr-2 rounded-lg bg-[var(--color3)] text-wrap"
            type="date"
            value={date === "" ? formatDateISO(new Date()) : date}
            min={minDate}
            max={formatDateISO(new Date())}
            onChange={(e) => {
              FilterBy("date", e.target.value);
              dispatch(
                filterByDate(
                  e.target.value === ""
                    ? formatDateISO(new Date())
                    : e.target.value,
                ),
              );
              searchParams.set("page", 1);
              setSearchParams(searchParams);
            }}
          />
          <input
            className="mr-2 rounded-lg bg-[var(--color3)]"
            type="search"
            placeholder="Type Expense 🔍"
            value={searchName}
            onChange={(e) => {
              dispatch(searchExpense(e.target.value));
              FilterBy("name", e.target.value);
              searchParams.set("page", 1);
              setSearchParams(searchParams);
            }}
          />
          <button
            className="mr-2 w-auto rounded-lg bg-[var(--color7)] px-1 py-1 font-bold"
            onClick={() => {
              dispatch(reset());
              searchParams.delete("name");
              searchParams.delete("category");
              searchParams.delete("essential");
              searchParams.delete("date");
              searchParams.delete("datemin");
              searchParams.delete("datemax");
              searchParams.delete("pricemin");
              searchParams.delete("pricemax");
              searchParams.set("page", 1);
              setSearchParams(searchParams);
            }}
          >
            Reset Filters
          </button>
        </div>
        <HiFunnel
          className="h-8 w-7"
          onClick={() => dispatch(openFilterModal(true))}
        />
        <div className="flex flex-row">
          <HiMiniPlusCircle
            className="h-8 w-8"
            onClick={() => dispatch(openNewEntryModal(true))}
          />
        </div>
      </div>
      <FiltersAndSettings pageFiltered={entryList} />
      <Pagination count={count} />
      <div className="flex justify-end mt-3 mr-3">
        {entryList.length > 0 && (
          <CSVLink
            className="rounded-lg bg-[var(--color1)] p-1"
            filename={"fintrack-expenditure-report.csv"}
            data={entryList}
          >
            Download Expenditure data
          </CSVLink>
        )}
      </div>
    </div>
  );
}
export default Entries;
