'use client';
"use strict";
exports.__esModule = true;
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("app/lib/api");
function TodoItem() {
    var _a, _b, _c, _d, _e, _f;
    var query = react_query_1.useQuery({ queryKey: ['todos'], queryFn: function () { return api_1.getTodo(); } });
    var queryClient = react_query_1.useQueryClient();
    var mutation = react_query_1.useMutation({
        mutationKey: ['todos'],
        mutationFn: api_1.getTodosByType,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row" },
            React.createElement("div", null,
                React.createElement("span", null, "Completed"), (_c = (_b = (_a = query.data) === null || _a === void 0 ? void 0 : _a.todos) === null || _b === void 0 ? void 0 : _b.todos) === null || _c === void 0 ? void 0 :
                _c.map(function (todo) { return (React.createElement("ul", null,
                    React.createElement("li", { key: todo.completed && todo.completed == true }, todo.todo))); })),
            React.createElement("div", null,
                React.createElement("span", null, "Processing"), (_f = (_e = (_d = query.data) === null || _d === void 0 ? void 0 : _d.todos) === null || _e === void 0 ? void 0 : _e.todos) === null || _f === void 0 ? void 0 :
                _f.map(function (todo) { return (React.createElement("ul", null,
                    React.createElement("li", { key: todo.completed && todo.completed == false }, todo.todo))); })))));
}
exports["default"] = TodoItem;
