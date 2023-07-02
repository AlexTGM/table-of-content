import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fetch, Headers, Request, Response } from 'cross-fetch'

import { KnowledgeBase } from ".";
import { setupStore } from "../app/store";
import { PageApi } from "../entities";
import { renderWithProviders } from "../shared";
import { waitFor } from "@testing-library/react";

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response

const handlers = [
  rest.get("http://localhost:3000/combined", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        entities: {
          pages: {
            "1": { title: "Item #1", pages: ["3"] },
            "2": { title: "item #2" },
            "3": { title: "Item #3" },
          },
        },
        topLevelIds: [1, 2],
      }),
      ctx.delay(30)
    );
  }),
];

const server = setupServer(...handlers);

describe("Table Of Content should", () => {
  const store = setupStore();

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(PageApi.util.resetApiState());
  });

  afterAll(() => server.close());

  it("render", async () => {
    const history = createMemoryHistory();

    const { getByTestId } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <KnowledgeBase />
      </Router>, { store }
    );

    expect(getByTestId("skeleton-0")).toBeVisible();
    expect(getByTestId("skeleton-7")).toBeVisible();

    await waitFor(() =>
      expect(getByTestId("loaded")).toHaveTextContent("Data Loaded")
    );
  });
});
