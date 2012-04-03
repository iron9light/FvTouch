
Ext.define("FvTouch.controller.AddTask", {
  extend: "Ext.app.Controller",
  requires: ["FvTouch.command.Command", "FvTouch.command.AddTask"],
  config: {
    views: ["AddTask"],
    refs: {
      main: "mainview",
      panel: {
        selector: "addtaskpanel",
        xtype: "addtaskpanel",
        autoCreate: true
      }
    },
    control: {
      panel: {
        cancel: "onCancel",
        save: "onSave",
        addmore: "onSaveAndAddMore"
      }
    }
  },
  onCancel: function() {
    return this.hide();
  },
  onSave: function(values) {
    if (values.title) this.addTask(values);
    return this.hide();
  },
  onSaveAndAddMore: function(values) {
    if (values.title) this.addTask(values);
    return this.getPanel().reset();
  },
  hide: function() {
    var panel;
    panel = this.getPanel();
    panel.on("hide", (function() {
      return this.destroy();
    }), panel);
    return panel.hide();
  },
  show: function() {
    var panel;
    panel = this.getPanel();
    if (!panel.getParent()) this.getMain().add(panel);
    return panel.show();
  },
  addTask: function(values) {
    var cmd;
    cmd = FvTouch.command.CommandManager.create("addtask", values);
    return cmd["do"]();
  }
});
