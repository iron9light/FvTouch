
Ext.define("FvTouch.view.Toolbar", {
  extend: "Ext.Toolbar",
  xtype: "mytoolbar",
  config: {
    ui: "neutral",
    docked: "bottom",
    defaults: {
      iconMask: true,
      ui: "plain"
    },
    items: [
      {
        iconCls: "add",
        action: "add"
      }, {
        iconCls: "reply",
        action: "undo"
      }
    ],
    layout: {
      pack: "center",
      align: "center"
    },
    control: {
      "[action=add]": {
        tap: function() {
          return this.fireEvent("add");
        }
      },
      "[action=undo]": {
        tap: function() {
          return this.fireEvent("undo");
        }
      }
    }
  }
});
