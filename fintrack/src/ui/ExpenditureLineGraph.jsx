/* eslint-disable react/prop-types */
import { eachDayOfInterval, format, isSameMonth, isSameYear } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { updateLineGraphView } from "../features/dashboard/dashboardSlice";

function ExpenditureLineGraph({ dateFiltered, date, date1, date2 }) {
  const dispatch = useDispatch();
  const { lineGraphView } = useSelector((store) => store.dashboard);

  if (!dateFiltered.length)
    return <p className="self-center rounded-lg text-4xl">No expenses</p>;

  const getDateRange = () => {
    if (lineGraphView === "yearly") {
      const startYear = new Date(date1).getFullYear();
      const endYear = new Date(date2).getFullYear();
      const yearlyDates = [];

      for (let year = startYear; year <= endYear; year++) {
        yearlyDates.push(new Date(year, 0, 1));
      }

      return yearlyDates;
    }
    return date1 === "" || date2 === ""
      ? eachDayOfInterval({
          start: date,
          end: date,
        })
      : eachDayOfInterval({
          start: date1,
          end: date2,
        });
  };

  const allDates = getDateRange();

  const data = allDates.map((date) => {
    const label =
      lineGraphView === "monthly"
        ? format(date, "MMM yyyy")
        : lineGraphView === "yearly"
          ? format(date, "yyyy")
          : format(date, "MMM dd");

    let totalSales;
    if (lineGraphView === "daily") {
      totalSales = dateFiltered
        .filter((entry) => isSameMonth(date, new Date(entry.date)))
        .reduce((acc, cur) => acc + cur.amount, 0);
    }
    if (lineGraphView === "monthly") {
      totalSales = dateFiltered
        .filter((entry) => isSameMonth(date, new Date(entry.date)))
        .reduce((acc, cur) => acc + cur.amount, 0);
    }
    if (lineGraphView === "yearly") {
      totalSales = dateFiltered
        .filter((entry) => isSameYear(date, new Date(entry.date)))
        .reduce((acc, cur) => acc + cur.amount, 0);
    }

    return {
      label,
      totalSales,
    };
  });

  const colors = {
    totalSales: { stroke: "var(--color2)", fill: "var(--color2)" },
    text: "var(--color-text)",
  };

  return (
    <div className="no-scrollbar overflow-auto rounded-lg bg-[var(--color8)] p-4 text-[var(--color-text)]">
      <h2 className="flex justify-center rounded-lg bg-[var(--color1)]">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;
        {format(allDates[allDates.length - 1], "MMM dd yyyy")}
      </h2>

      <div className="mt-4 flex justify-center gap-4">
        <select
          className="rounded-md bg-[var(--color6)] px-4 py-2 text-[var(--color-text)]"
          value={lineGraphView}
          onChange={(e) => dispatch(updateLineGraphView(e.target.value))}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <ResponsiveContainer height={200} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="₹"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="₹"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenditureLineGraph;
