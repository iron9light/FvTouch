
Ext.define("FvTouch.model.Todo", {
  extend: "Ext.data.Model",
  requires: ["FvTouch.MemoryStorage"],
  config: {
    fields: [
      {
        name: "order",
        type: "int"
      }, {
        name: "task_id"
      }, {
        name: "preselected",
        type: "bool",
        defaultValue: false
      }
    ],
    hasOne: [
      {
        model: "FvTouch.model.Task",
        foreignKey: "task_id"
      }
    ],
    proxy: {
      type: "localstorage",
      id: "todoitems"
    }
  }
});
