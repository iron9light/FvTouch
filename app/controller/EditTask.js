
Ext.define("FvTouch.controller.EditTask", {
  extend: "Ext.app.Controller",
  config: {
    views: ["EditTask"],
    refs: {
      main: "mainview",
      panel: {
        selector: "edittaskpanel",
        xtype: "edittaskpanel",
        autoCreate: true
      }
    },
    control: {
      panel: {
        cancel: "onCancel",
        save: "onSave"
      }
    }
  },
  onCancel: function() {
    return this.hide();
  },
  onSave: function(values) {
    if (values.title) this.editTask(values);
    return this.hide();
  },
  hide: function() {
    var panel;
    panel = this.getPanel();
    panel.on("hide", (function() {
      return this.destroy();
    }), panel);
    return panel.hide();
  },
  show: function(uid) {
    var panel, store, task, values;
    store = Ext.getStore("Tasks");
    task = store.findRecord("uid", uid);
    values = Ext.clone(task.getData());
    panel = this.getPanel();
    if (!panel.getParent()) this.getMain().add(panel);
    panel.setValues(values);
    return panel.show();
  },
  editTask: function(values) {
    var cmd;
    cmd = FvTouch.command.CommandManager.create("edittask", values);
    return cmd["do"]();
  }
});
