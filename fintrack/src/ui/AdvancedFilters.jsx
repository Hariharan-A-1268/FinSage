import { useDispatch, useSelector } from "react-redux";
import { formatDateISO } from "../utils/helper";
import Modal from "./Modal";
import {
  filterByDateRangeMax,
  filterByDateRangeMin,
  filterByPriceRangeMin,
  filterByPriceRangeMax,
  openFilterModal,
} from "../features/entries/entriesSlice";
import { useSearchParams } from "react-router-dom";
function AdvancedFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { date1, date2, price1, price2 } = useSelector(
    (store) => store.entries,
  );
  return (
    <Modal
      close={() => {
        dispatch(openFilterModal(false));
      }}
    >
      <div className="mt-5 flex flex-col text-[var(--color-text)]">
        <h1 className="flex justify-center font-bold">Advanced Filters🔬</h1>
        <div className="mt-5 flex flex-col">
          <label>
            Get expenses from{" "}
            <span className="rounded-lg bg-[var(--color2)] p-1">
              {date1 === "" ? "yyyy-mm-dd" : date1}
            </span>{" "}
            to{" "}
            <span className="rounded-lg bg-[var(--color2)] p-1">
              {date2 === "" ? "yyyy-mm-dd" : date2}
            </span>
          </label>
          <div className="mt-2">
            <label>From</label>
            <input
              required
              max={formatDateISO(new Date())}
              className="ml-2 rounded-lg bg-[var(--color6)] text-wrap"
              type="date"
              value={date1}
              onChange={(e) => {
                dispatch(filterByDateRangeMin(e.target.value));
                searchParams.set("datemin", e.target.value);
                searchParams.set("page", 1);
                setSearchParams(searchParams);
              }}
            />
            <label className="ml-2">To</label>
            <input
              min={date1}
              max={formatDateISO(new Date())}
              className="ml-2 rounded-lg bg-[var(--color6)] text-wrap"
              type="date"
              value={date2}
              onChange={(e) => {
                dispatch(filterByDateRangeMax(e.target.value));
                searchParams.set("datemax", e.target.value);
                searchParams.set("page", 1);
                setSearchParams(searchParams);
              }}
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <label>
            Expenses costing from{" "}
            <span className="rounded-lg bg-[var(--color2)] p-1">
              {price1 == "" ? 0 : price1}
            </span>{" "}
            to{" "}
            <span className="rounded-lg bg-[var(--color2)] p-1">
              {price1 == "" ? 0 : price1}
            </span>
          </label>
          <div className="mt-2">
            <label>From</label>
            <input
              onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
              className="ml-2 w-20 rounded-lg bg-[var(--color6)] text-wrap"
              type="number"
              value={price1}
              onChange={(e) => {
                dispatch(filterByPriceRangeMin(e.target.value));
                searchParams.set("pricemin", e.target.value);
                searchParams.set("page", 1);
                setSearchParams(searchParams);
              }}
            />
            <label className="ml-2">To</label>
            <input
              onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
              className="ml-2 w-20 rounded-lg bg-[var(--color6)] text-wrap"
              type="number"
              value={price2}
              onChange={(e) => {
                dispatch(filterByPriceRangeMax(e.target.value));
                searchParams.set("pricemax", e.target.value);
                searchParams.set("page", 1);
                setSearchParams(searchParams);
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AdvancedFilters;
