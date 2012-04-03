
Ext.define("FvTouch.view.PreselectedView", {
  extend: "Ext.Panel",
  requires: ["FvTouch.view.PreselectedList"],
  xtype: "preselectedview",
  config: {
    layout: "fit",
    items: [
      {
        xtype: "preselectedlist"
      }
    ]
  }
});
