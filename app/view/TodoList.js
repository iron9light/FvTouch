
Ext.define("FvTouch.view.TodoList", {
  extend: "FvTouch.view.TaskListBase",
  xtype: "todolist",
  config: {
    store: "Todos",
    itemConfig: {
      onUpdatedata: function(item, data) {
        var iconCls;
        iconCls = data.task.status === "running" ? "play_black1" : data.order === 0 || data.preselected ? "up_black" : "empty2";
        item.setIconCls(iconCls);
        return item.setText(data.task.title);
      }
    }
  }
});
