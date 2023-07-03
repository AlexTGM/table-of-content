import { useState, useCallback, useEffect } from "react";
import { useAppDispatch, useDebounce } from "../../shared";
import { FilterItemsSlice } from "./filter-items.slice";
import { FilterWrapper, StyledInput } from "../../../../ui-kit";

export const FilterInput = () => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>("");
  const debouncedFilter = useDebounce(inputValue, 300);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    dispatch(FilterItemsSlice.actions.setFilterValue(debouncedFilter));
  }, [debouncedFilter, dispatch]);

  return (
    <FilterWrapper>
      <StyledInput
        tabIndex={1}
        value={inputValue}
        placeholder="Search Table of Contents..."
        onChange={handleChange}
      />
    </FilterWrapper>
  );
};
