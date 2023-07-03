To build the application:

1. Install all dependencies for server (src/server) application `npm/pnpm/yarn i`
2. Run the json-server `npm/pnpm/yarn start`
3. Install all dependencies for main (src) application `npm/pnpm/yarn i`
4. Run the dev server `npm/pnpm/yarn preview`
5. To run tests `npm/pnpm/yarn test` can be used

The application contains:

1. `Main` application - the entry point. Routing, data fetching, layout are done here. Most part of activities are just for a testing purposes so the quality was not a goal here.
   1. The most interesting part is Redux Toolkit Query API for data fetching what can be found over the `entities.page` section.
   2. `Widgets` are implemented just to take screen space and make the application look more natural. `Article` widget displays the currently selected item and supports `home/not found/article id/loading` states. Header is just a dummy component.
   3. `Shared` folder contains test utility functions to help with wrapped components rendering
   4. `Pages` folder contains `knowledge-base` page what is a component rendering Table of Contents along with Article and Header. It orchestrates the data fetching and displays the right state of Table of Content (loading or loaded)
2. `Table of Content` module is the main component module what are independent library with only `UI-Kit` dependencies.
   1. `Shared` folder contains the helper functions such as:
      1.  `path-utils` for path manipulations (nodes splitting, path combining),
      2.  `use-debounce` for value debouncing (helps with filtering after the user ends with query)
      3.  `list` component with `Table of content node` what will render a list of tree nodes
      4.  `test` utility functions and store mock
   2. `Entities` folder contains the main business entity - tree nodes and tree itself. It contains of slice and utility functions to build the tree
   3. `Features` contains the logic of main features:
      1. `useExpandableItems` for items collapse/expand
      2. `useFilterItems` for items filtering
      3. `usePathHighlighting` to decide what background color should have the item depending on `selectedItemPath`
      4. `useSelectableItems` for items selection (it will update the query param and update selected article)
      5. `useTableOfContentInit` to generate the tree structure for rendering
   4. `Widgets` contains Table of Content states:
      1. `Loading` state with skeletons instead of real data items (it has the top padding to emulate the filtering input)
      2. `Loaded` state what renders components and orchestrating the state by composing of different features
   5. `App` folder is the place what initialize the store and exports two states of Table Of Content widget.
3. `UI-Kit` with `input/skeleton/expander` components
4. `server` json-server with `/computed` endpoint what returns `topLevelIds, entities`

List of features:

1. Basic routing to support selecting active item by passing the query param
2. Filtration by topic id. Filtration waits for the user to end typing and filters data in case-insensitive manner. I decided not to put loading indicator because the operation takes really quick to execute
3. Items collapsing / expanding the tree nodes by clicking on item containing div (works only when children array is not empty)
4. Items selecting and path highlighting. Active element is #307FFF, parent color is #F4F4F4 when it is not on the first level and ancestor #F9F9F9. The application preserves the full path to the node.
5. State restoring by passing the `selected item id` query param. it will expand the tree to selected node and make path highlighting correspondingly.
6. Basic keyboard accessibility. The user can navigate over the list items by `Tab/Shift-Tab` and select/expand items by pressing `Enter`
7. Animated expander item and text skeleton with dynamic background.

Code is covered by unit tests (`tree generation, path utils, filtration`) and functional tests for most part of components (with store and api calls mocking)