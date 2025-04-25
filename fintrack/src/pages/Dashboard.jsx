import { useSelector } from "react-redux";
import CategoryPieChart from "../ui/CategoryPieChart";
import ExpenditureLineGraph from "../ui/ExpenditureLineGraph";
import Stats from "../ui/Stats";
import Spinner from "../ui/Spinner";
import { useDashboardEntries } from "../hooks/entries/useDashboardEntries";

function Dashboard() {
  const { entryList, isGetting } = useDashboardEntries();
  const { dashboardDate, dashboardDate1, dashboardDate2 } = useSelector(
    (store) => store.dashboard,
  );
  {
    isGetting && (
      <div className="absolute inset-0 z-50 flex items-center backdrop-blur-xs">
        <Spinner />
      </div>
    );
  }
  const dateFiltered =
    dashboardDate1 === "" || dashboardDate2 === ""
      ? entryList.filter((entry) => entry.date === dashboardDate)
      : entryList.filter(
          (entry) =>
            entry.date >= dashboardDate1 && entry.date <= dashboardDate2,
        );
  return (
    <div className="mr-5 mb-5 ml-5 grid grid-cols-2 grid-rows-2 gap-[2.4rem] text-[var(--color-text)]">
      <CategoryPieChart dateFiltered={dateFiltered} />
      <Stats />
      <ExpenditureLineGraph
        dateFiltered={dateFiltered}
        date={dashboardDate}
        date1={dashboardDate1}
        date2={dashboardDate2}
      />
    </div>
  );
}

export default Dashboard;
