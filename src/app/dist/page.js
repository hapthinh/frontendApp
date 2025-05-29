'use client';
"use strict";
exports.__esModule = true;
var react_query_1 = require("@tanstack/react-query");
var AddTodo_1 = require("./components/AddTodo");
var TodoList_1 = require("./components/TodoList");
var provider_1 = require("./provider/provider");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
var TodoItem_1 = require("./components/TodoItem");
function App() {
    var queryClient = new react_query_1.QueryClient();
    return (React.createElement(provider_1["default"], null,
        React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
            React.createElement(AddTodo_1["default"], null),
            React.createElement(TodoList_1["default"], null),
            React.createElement(TodoItem_1["default"], null),
            React.createElement(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: false }))));
}
exports["default"] = App;
