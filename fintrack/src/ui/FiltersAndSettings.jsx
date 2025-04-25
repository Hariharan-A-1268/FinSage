/* eslint-disable react/prop-types */
import { HiArrowsUpDown } from "react-icons/hi2";
import Entry from "./Entry";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function FiltersAndSettings({ pageFiltered }) {
  function toggleSort(field) {
    const currentSortBy = searchParams.get("sortBy") || "date-asc";
    const [currentField, currentDirection] = currentSortBy.split("-");

    if (currentField === field) {
      const newDirection = currentDirection === "asc" ? "desc" : "asc";
      searchParams.set("sortBy", `${field}-${newDirection}`);
    } else {
      searchParams.set("sortBy", `${field}-asc`);
    }

    setSearchParams(searchParams);
  }

  const { date, category, essential, searchName } = useSelector(
    (store) => store.entries,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <table className="flex flex-col text-[var(--color-text)]">
      <thead className="ml-3 mr-3 mb-2">
        <tr className="grid grid-cols-7 justify-items-center gap-5 rounded-lg border-2 bg-[var(--color6)] p-2">
          <th className="whitespace-nowrap">
            <div className="flex flex-row">ID</div>
          </th>
          <th className="mr-10 whitespace-nowrap">
            <div className="flex flex-row" onClick={() => toggleSort("date")}>
              Date
              <HiArrowsUpDown className="h-8 w-5" />
            </div>
          </th>
          <th className="whitespace-nowrap">Category</th>
          <th className="whitespace-nowrap">
            <div className="flex flex-row" onClick={() => toggleSort("name")}>
              Name
              <HiArrowsUpDown className="h-8 w-5" />
            </div>
          </th>
          <th className="flex flex-col whitespace-nowrap">essential</th>
          <th className="flex flex-col whitespace-nowrap">
            <div className="flex flex-row" onClick={() => toggleSort("amount")}>
              Amount
              <HiArrowsUpDown className="h-8 w-5" />
            </div>
          </th>
          <th className="flex flex-col whitespace-nowrap">Change data</th>
        </tr>
      </thead>
      <tbody className="space-y-2">
        {pageFiltered.length > 0 ? (
          pageFiltered.map((el) => <Entry key={el.uuid} data={el} />)
        ) : (
          <tr>
            <td className="text-[var(--color9)]">
              {category === "nofilter" &&
              essential === "nofilter" &&
              searchName === ""
                ? `No expense in ${date}. Add new expenses to see here.`
                : `No results found for ${
                    essential === "nofilter"
                      ? ""
                      : essential === "yes"
                        ? "essential"
                        : "non-essential"
                  } expenses ${
                    category === "nofilter" ? "" : `under ${category} category`
                  } ${
                    searchName === "" ? "" : `with name "${searchName}"`
                  } in ${date} `}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default FiltersAndSettings;
