import React, { useTransition, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared";
import { FilterWrapper, StyledInput } from "../../../../ui-kit";
import { selectTreeState } from "../../entities";
import { FilterItemsSlice, filterData, selectFilterValue } from ".";

export const FilterInput = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [, startTransition] = useTransition();

  const filterValue = useAppSelector(selectFilterValue);
  const { rawData, nodes } = useAppSelector(selectTreeState);

  useEffect(() => {
    dispatch(FilterItemsSlice.actions.setFilteredValues(nodes));
  }, [dispatch, nodes])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(FilterItemsSlice.actions.setFilterValue(e.target.value))

    startTransition(() => {
      const filteredData = filterData(e.target.value, nodes, rawData);

      dispatch(FilterItemsSlice.actions.setFilteredValues(filteredData));
    })
  }, [dispatch, nodes, rawData])

  return (
    <FilterWrapper>
      <StyledInput
        tabIndex={1}
        value={filterValue}
        placeholder="Search Table of Contents..."
        onChange={handleChange}
        data-testid="table-of-content-input"
      />
    </FilterWrapper>
  );
};
