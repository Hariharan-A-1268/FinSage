/* eslint-disable react/prop-types */
import { HiArrowCircleLeft } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { HiArrowRightCircle } from "react-icons/hi2";

const PAGE_SIZE = 8;
function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }
  if (pageCount <= 1) return null;
  return (
    <div className="flex w-[100%] items-center justify-between">
      <p className="mt-2">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </p>
      <div className="mt-2 flex gap-5">
        <button className="flex gap-2">
          <HiArrowCircleLeft
            className="h-8 w-5"
            onClick={prevPage}
            disabled={currentPage === 1}
          />
          <span className="pt-1">Previous</span>
        </button>
        <button
          className="flex gap-2"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span className="pt-1">Next</span>
          <HiArrowRightCircle className="h-8 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
