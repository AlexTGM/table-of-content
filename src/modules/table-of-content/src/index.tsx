import { Provider } from "react-redux";
import { setupStore } from "./app";
import { TableOfContentProps } from "./features";
import { TableOfContentLoaded } from "./widgets";

export const TableOfContentLoadedWidget = ({
  inputData,
}: TableOfContentProps): JSX.Element => {
  return <Provider store={setupStore()}>
    <TableOfContentLoaded inputData={inputData} />
  </Provider>
};

export { TableOfContentLoading } from "./widgets";
