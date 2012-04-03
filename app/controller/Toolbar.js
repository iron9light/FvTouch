
Ext.define("FvTouch.controller.Toolbar", {
  extend: "Ext.app.Controller",
  requires: ["FvTouch.command.Command"],
  config: {
    views: ["Toolbar"],
    refs: {
      toolbar: "mytoolbar"
    },
    control: {
      toolbar: {
        add: "showAddPanel",
        undo: "onUndo"
      }
    }
  },
  showAddPanel: function() {
    return this.getApplication().getController("AddTask").show();
  },
  onUndo: function() {
    return FvTouch.command.CommandManager.undo();
  }
});
