/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

function CategoryPieChart({ dateFiltered }) {
  if (!dateFiltered.length)
    return <p className="self-center rounded-lg text-4xl">No expenses</p>;
  const categoryData = dateFiltered.reduce((acc, entry) => {
    if (acc[entry.category]) {
      acc[entry.category].total += entry.amount;
      acc[entry.category].count += 1;
    } else {
      acc[entry.category] = { total: entry.amount, count: 1 };
    }
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category].total,
    count: categoryData[category].count,
  }));

  const COLORS = [
    "var(--color1)",
    "var(--color2)",
    "var(--color3)",
    "var(--color4)",
    "var(--color5)",
    "var(--color6)",
    "var(--color7)",
    "var(--color8)",
    "var(--color9)",
    "var(--color1)",
  ];

  // Custom tooltip formatter to show both total and count
  const tooltipFormatter = (value, name) => {
    const category = pieData.find((item) => item.name === name);
    return [
      `$${value.toLocaleString()}`, // Total amount
      `${category.count} expenses`, // Number of expenses
    ];
  };

  return (
    <div className="no-scrollbar overflow-auto rounded-lg bg-[var(--color8)] p-4 text-[var(--color-text)]">
      <h2 className="flex justify-center rounded-lg bg-[var(--color1)] text-[var(--color-text)]">
        Expenditure by Category
      </h2>
      <ResponsiveContainer height={300} className="bg-[var(--color8)]">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="var(--color7)"
            labelLine={false} // No labels inside the pie
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconSize={14}
            payload={pieData.map((entry, index) => ({
              value: entry.name,
              type: "square",
              color: COLORS[index % COLORS.length],
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPieChart;
