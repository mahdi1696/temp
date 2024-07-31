import { useState } from "react";

import { range } from "lodash";

import { Input } from "@/components/primitives/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/primitives/button";

interface Props {
  pagesCount: number;
  currentPage: number;
  onPageChange: (arg0: number) => void;
}

const Pagination = ({
  pagesCount = 0,
  currentPage = 0,
  onPageChange = () => {},
}: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState<number>();
  const [isValid, setIsValid] = useState(true);

  if (pagesCount === 1) return null;
  const pages = range(1, pagesCount + 1);

  const getArrowsClasses = (isActive: boolean) => {
    return `${isActive ? "" : "bg-gray-500"}`;
  };

  const activeNextArrow = () => {
    return currentPage > 1;
  };

  const activePrevArrow = () => {
    return currentPage < pagesCount;
  };

  const shouldRender = (page: number) => {
    return [
      1,
      pagesCount,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ].includes(page);
  };

  const shouldRenderDots = (page: number) => {
    return !shouldRender(page) && shouldRender(page - 1);
  };

  const handleInputChange = (page: number) => {
    setInputValue(page);
    if (page >= 1 && page <= pagesCount) {
      onPageChange(page);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleInputFocus = () => {
    setIsValid(true);
    setInputValue(currentPage);
  };

  return (
    <nav className="flex justify-center">
      <ul className="flex">
        <li className="page-item">
          <Button
            variant="outline"
            className={getArrowsClasses(currentPage > 1)}
            onClick={() => {
              activeNextArrow() && onPageChange(currentPage - 1);
            }}
          >
            <ChevronRight size={13} />
          </Button>
        </li>

        {pages.map((page) =>
          shouldRender(page) ? (
            <Button
              key={page}
              variant="outline"
              className={page === currentPage ? "bg-slate-400" : "page-item"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ) : shouldRenderDots(page) ? (
            <span key={page} className="pt-1 px-2">
              ...
            </span>
          ) : null
        )}

        <li className="page-item">
          <Button
            variant="outline"
            className={getArrowsClasses(activePrevArrow())}
            onClick={() => {
              activePrevArrow() && onPageChange(currentPage + 1);
            }}
          >
            <ChevronLeft size={13} />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
