
Ext.define("FvTouch.view.PreselectedList", {
  extend: "FvTouch.view.TaskListBase",
  xtype: "preselectedlist",
  config: {
    store: "Preselecteds",
    itemConfig: {
      onUpdatedata: function(item, data) {
        var iconCls, iconCls2;
        iconCls = data.task.status === "running" ? "play_black1" : data.order === 0 || data.preselected ? "up_black" : "empty2";
        item.setIconCls(iconCls);
        iconCls2 = data.index === 0 && data.task.status === "open" ? "play1" : null;
        item.setIconCls2(iconCls2);
        return item.setText(data.task.title);
      }
    }
  }
});
