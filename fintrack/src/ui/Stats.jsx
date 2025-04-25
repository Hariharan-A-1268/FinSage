import {
  HiCurrencyRupee,
  HiMiniShoppingBag,
  HiBriefcase,
  HiFire,
  HiFolder,
  HiCalendarDays,
} from "react-icons/hi2";

import { useDispatch, useSelector } from "react-redux";
import { formatDateISO } from "../utils/helper";
import {
  resetDashboard,
  resetDashboardDateRange,
  updateDashBoardDate,
  updateDashBoardDate1,
  updateDashBoardDate2,
} from "../features/dashboard/dashboardSlice";
import { useUser } from "../hooks/auth/useUser";
import { useEntries } from "../hooks/entries/useEntries";
import Spinner from "./Spinner";
import { useSearchParams } from "react-router-dom";

function Stats() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { entryList, isGetting } = useEntries();
  const { dashboardDate, dashboardDate1, dashboardDate2 } = useSelector(
    (store) => store.dashboard,
  );

  const today = new Date();
  // const currentHour = today.getHours();
  let message, emoji;
  const dateFiltered =
    dashboardDate1 === "" || dashboardDate2 === ""
      ? entryList.filter((entry) => entry.date === dashboardDate)
      : entryList.filter(
          (entry) =>
            entry.date >= dashboardDate1 && entry.date <= dashboardDate2,
        );

  // if (currentHour < 12) {
  //   message = "Good Morning";
  //   emoji = "☀️";
  // } else if (currentHour < 18) {
  //   message = "Good Afternoon";
  //   emoji = "🕐";
  // } else {
  //   message = "Good Evening";
  //   emoji = "🌙";
  // }

  const highestExpense =
    dateFiltered.length > 0
      ? dateFiltered.reduce((prev, curr) =>
          prev.amount > curr.amount ? prev : curr,
        )
      : 0;
  const totalAmountSpent =
    dateFiltered.length > 0
      ? dateFiltered.reduce((acc, curr) => acc + curr.amount, 0)
      : 0;
  const numExpenses = dateFiltered.length;
  const numEssentialExpenses = dateFiltered.filter(
    (entry) => entry.essential === "Yes",
  ).length;

  const days = dateFiltered.map((entry) => new Date(entry.date).getDay()); // getDay() returns 0 for Sunday, 1 for Monday, etc.

  const dayCount =
    days.length > 0
      ? days.reduce((acc, day) => {
          acc[day] = (acc[day] || 0) + 1;
          return acc;
        }, {})
      : [new Date().getDay()];

  const mostCommonDayIndex = Object.keys(dayCount).reduce((a, b) =>
    dayCount[a] > dayCount[b] ? a : b,
  );

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const mostCommonDayName = dayNames[mostCommonDayIndex];

  const numNonEssentialExpenses = numExpenses - numEssentialExpenses;
  const highestExpenseAmount = highestExpense.amount;
  const highestExpenseName = highestExpense.name;
  const highestExpenseDate = highestExpense.date;

  return (
    <div className="text-l flex flex-col text-[var(--color-text)]">
      {isGetting && (
        <div className="absolute inset-0 z-50 flex items-center backdrop-blur-xs">
          <Spinner />
        </div>
      )}
      <div className="mt-5 flex flex-row gap-5">
        <span>Specific Date</span>
        <input
          type="date"
          className="rounded-lg bg-[var(--color6)]"
          value={dashboardDate}
          max={formatDateISO(new Date())}
          onChange={(e) => {
            dispatch(resetDashboardDateRange());
            dispatch(updateDashBoardDate(e.target.value));
            searchParams.set("dashboardDate", e.target.value);
            setSearchParams(searchParams);
          }}
        />
        <button
          className="rounded-lg bg-[var(--color2)] p-1"
          onClick={() => {
            searchParams.delete("dashboardDate");
            searchParams.delete("dashBoardDatemin");
            searchParams.delete("dashboardDatemax");
            setSearchParams(searchParams);
            dispatch(resetDashboard());
          }}
        >
          Reset Filters
        </button>
      </div>
      <div className="mt-5 flex flex-row gap-5">
        <div>
          <span>From </span>
          <input
            type="date"
            className="rounded-lg bg-[var(--color6)]"
            value={dashboardDate1}
            max={formatDateISO(new Date())}
            onChange={(e) => {
              dispatch(updateDashBoardDate1(e.target.value));
              searchParams.set("DashboardDatemin", e.target.value);
              setSearchParams(searchParams);
            }}
          />
        </div>
        <div>
          <span>To </span>
          <input
            type="date"
            className="rounded-lg bg-[var(--color6)]"
            value={dashboardDate2}
            max={formatDateISO(new Date())}
            onChange={(e) => {
              dispatch(updateDashBoardDate2(e.target.value));
              searchParams.set("DashboardDatemax", e.target.value);
              setSearchParams(searchParams);
            }}
          />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="text-l flex flex-col rounded-lg border-t-[16px] border-[var(--color8)] bg-[var(--color7)] p-5 shadow-xl">
          <HiCurrencyRupee className="self-end text-4xl" />
          <p>Total Amount Spent</p>
          {dateFiltered.length > 0 ? (
            <p className="self-center rounded-lg bg-[var(--color4)] font-semibold">
              ₹{totalAmountSpent}
            </p>
          ) : (
            <p className="self-center font-semibold">No expenses</p>
          )}
        </div>
        <div className="text-l flex flex-col rounded-lg border-t-[16px] border-[var(--color8)] bg-[var(--color7)] p-5 shadow-xl">
          <HiBriefcase className="self-end text-4xl" />
          <p>
            No of Essential Expenditures:{" "}
            {dateFiltered.length > 0 ? (
              <span className="font-semibold">{numEssentialExpenses}</span>
            ) : (
              <span className="font-semibold">No expenses</span>
            )}
          </p>
        </div>
        <div className="text-l flex flex-col rounded-lg border-t-[16px] border-[var(--color8)] bg-[var(--color7)] p-5 shadow-xl">
          <HiMiniShoppingBag className="self-end text-4xl" />
          <p>
            No of Non-Essential Expenditures:{" "}
            {dateFiltered.length > 0 ? (
              <span className="font-semibold">{numNonEssentialExpenses}</span>
            ) : (
              <span className="font-semibold">No expenses</span>
            )}
          </p>
        </div>
        <div className="text-l flex flex-col rounded-lg border-t-[16px] border-[var(--color8)] bg-[var(--color7)] p-5 shadow-xl">
          <HiFire className="self-end text-4xl" />
          <p>Highest Expenditure</p>

          {dateFiltered.length > 0 ? (
            <p className="rounded-lg bg-[var(--color3)] font-semibold">
              {highestExpenseName} for ₹{highestExpenseAmount} on
              <br /> <span>{highestExpenseDate}</span>
            </p>
          ) : (
            <p className="font-semibold">No expenses</p>
          )}
        </div>
        <div className="text-l flex flex-col rounded-lg border-t-[16px] border-[var(--color8)] bg-[var(--color7)] p-5 shadow-xl">
          <HiFolder className="self-end text-4xl" />
          <p>
            No of expenses:{" "}
            {dateFiltered.length > 0 ? (
              <span className="font-semibold">{numExpenses}</span>
            ) : (
              <span className="font-semibold">No expenses</span>
            )}
          </p>
        </div>
        <div className="text-l flex flex-col rounded-lg border-t-[16px] border-[var(--color8)] bg-[var(--color7)] p-5 shadow-xl">
          <HiCalendarDays className="self-end text-4xl" />

          {dateFiltered.length > 0 ? (
            <p>
              Most expenses made in
              <br />
              <span className="rounded-lg bg-[var(--color5)] font-semibold">
                {mostCommonDayName}s
              </span>
            </p>
          ) : (
            <p>No expenses</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stats;
