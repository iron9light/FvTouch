
Ext.define("FvTouch.view.TodoListView", {
  extend: "Ext.Panel",
  requires: ["FvTouch.view.TodoList"],
  xtype: "todolistview",
  config: {
    layout: "fit",
    items: [
      {
        xtype: "todolist"
      }
    ]
  }
});
