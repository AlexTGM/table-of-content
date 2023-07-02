import { TableOfContentSlice, selectValue } from ".";
import { useAppDispatch, useAppSelector } from "../../shared/store.hooks";

export const TableOfContentWidget = () => {
  const dispatch = useAppDispatch();

  const currentValue = useAppSelector(selectValue);

  return (
    <>
      <p data-testid="value">{currentValue}</p>

      <button
        data-testid="increase"
        onClick={() => dispatch(TableOfContentSlice.actions.increaseValue())}
      >
        +
      </button>
      <button
        data-testid="decrease"
        onClick={() => dispatch(TableOfContentSlice.actions.decreaseValue())}
      >
        -
      </button>
    </>
  );
};
