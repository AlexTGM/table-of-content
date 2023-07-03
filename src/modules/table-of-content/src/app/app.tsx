import { Provider } from "react-redux";
import { setupStore } from ".";
import { TableOfContentProps } from "../features";
import { TableOfContentLoaded, TableOfContentLoading } from "../widgets";

const store = setupStore();

export const TableOfContentLoadingState = () => {
  return <TableOfContentLoading />;
};

export const TableOfContentLoadedState = (props: TableOfContentProps) => {
  return (
    <Provider store={store}>
      <TableOfContentLoaded {...props} />
    </Provider>
  );
};
