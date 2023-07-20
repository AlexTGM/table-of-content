import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

export const useFocusRing = (
  itemsCount: number,
  configuration: Record<string, (index: number) => number | undefined>,
  selectedIndex?: number,
) => {
  const itemsCountRef = useRef(itemsCount);

  useEffect(() => {
    itemsCountRef.current = itemsCount;
  }, [itemsCount]);

  const [currentItemIndex, setCurrentItemIndex] = useState(selectedIndex || 0);

  const updateCurrentItemIndex = useCallback((index: number) => {
    if (index >= 0 && index < itemsCountRef.current) {
      setCurrentItemIndex(index);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      updateCurrentItemIndex(currentItemIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      updateCurrentItemIndex(currentItemIndex - 1);
    }

    const newIndex = configuration[e.key]?.(currentItemIndex);
    newIndex && updateCurrentItemIndex(newIndex);
  }, [configuration, currentItemIndex, updateCurrentItemIndex]);

  return useMemo(() => (
    { currentItemIndex, updateCurrentItemIndex, handleKeyDown }),
    [currentItemIndex, handleKeyDown, updateCurrentItemIndex]
  );
}