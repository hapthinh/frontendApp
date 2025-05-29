'use client';
"use strict";
exports.__esModule = true;
var api_1 = require("app/lib/api");
var react_query_1 = require("@tanstack/react-query");
var link_1 = require("next/link");
var api_2 = require("app/lib/api");
function TodoList() {
    var query = react_query_1.useQuery({ queryKey: ['todos'], queryFn: api_1.getTodo });
    var queryClient = react_query_1.useQueryClient();
    var mutation = react_query_1.useMutation({
        mutationKey: ['todos'],
        mutationFn: api_2.deteleTodo,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: function () {
            console.log("failed");
        }
    });
    var mutation1 = react_query_1.useMutation({
        mutationKey: ['todos'],
        mutationFn: api_2.ChangeType,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: function () {
            console.log("failed");
        }
    });
    if (!query.data)
        return React.createElement("div", null, "Loading...");
    console.log(query.data);
    return (React.createElement("div", { className: "mr-50 ml-50" },
        React.createElement("table", { className: "table-auto border-1 w-full" },
            React.createElement("thead", { className: "border-1" },
                React.createElement("tr", null,
                    React.createElement("th", null, "Todo"),
                    React.createElement("th", null, "Status"),
                    React.createElement("th", null, "Actions"))),
            React.createElement("tbody", null, query.data.todos.todos.map(function (todo) { return (React.createElement("tr", { key: todo.id, className: "border-1" },
                React.createElement("td", { className: "text-center" },
                    React.createElement(link_1["default"], { href: "/todo/" + todo.id }, todo.todo)),
                React.createElement("td", { className: "text-center" }, todo.completed ? "done" : "processing"),
                React.createElement("td", { className: "w-50 h-6 flex flex-row" },
                    React.createElement("div", { className: "basic-64 " },
                        React.createElement("button", { className: "ml-90 basic-64 text-center bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white border-1 rounded-full font-bold", onClick: function () { return mutation.mutate({
                                id: todo.id
                            }); } }, "Xoa?")),
                    React.createElement("div", { className: "basic-64 ml-10" },
                        React.createElement("button", { className: "basic-64 text-center bg-white text-indi  go-600 hover:bg-indigo-600 hover:text-white border-1 rounded-full font-bold", onClick: function () { return mutation1.mutate({
                                id: todo.id,
                                completed: !todo.completed
                            }); } }, "completed?"))))); })))));
}
exports["default"] = TodoList;
