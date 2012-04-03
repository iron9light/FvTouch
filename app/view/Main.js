
Ext.define("FvTouch.view.Main", {
  extend: "Ext.Container",
  xtype: "mainview",
  requires: ["FvTouch.view.Toolbar", "FvTouch.view.TodoListView", "FvTouch.view.PreselectedView", "FvTouch.view.RunningView", "FvTouch.view.component.ProgressBar"],
  config: {
    fullscreen: true,
    layout: "fit",
    items: [
      {
        xtype: "tabpanel",
        items: [
          {
            xtype: "mytoolbar"
          }, {
            id: "todoview",
            title: "Todo",
            iconCls: "refresh",
            xtype: "todolistview"
          }, {
            id: "preselectedview",
            title: "Preselected",
            iconCls: "refresh",
            xtype: "preselectedview"
          }, {
            id: "runningview",
            title: "Running",
            iconCls: "refresh",
            xtype: "runningview",
            store: "Runnings"
          }
        ]
      }
    ]
  }
});
