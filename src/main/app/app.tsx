import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { setupStore } from "./store";
import { KnowledgeBase } from "../pages";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/knowledge-base" />} />
          <Route path="/knowledge-base" Component={KnowledgeBase} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
