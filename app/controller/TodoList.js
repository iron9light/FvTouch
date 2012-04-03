
Ext.define("FvTouch.controller.TodoList", {
  extend: "Ext.app.Controller",
  config: {
    refs: {
      main: "mainview",
      todolistview: "todolistview",
      preselectedview: "preselectedview"
    },
    control: {
      todolistview: {
        preselect: "onPreselect",
        done: "onDone",
        act: "onAct",
        edit: "showEditPanel",
        postpone: "onPostpone"
      },
      preselectedview: {
        preselect: "onPreselect",
        done: "onDone",
        act: "onAct",
        edit: "showEditPanel",
        postpone: "onPostpone",
        start: "onStart"
      }
    }
  },
  preselectCmd: function(record) {
    return FvTouch.command.CommandManager.create("preselect", {
      uid: record.data.task.uid
    });
  },
  onPreselect: function(record) {
    var cmd;
    cmd = this.preselectCmd(record);
    return cmd["do"]();
  },
  onAct: function(record) {
    var actionSheet, addItem, items,
      _this = this;
    items = [];
    addItem = function(cmd, text, ui) {
      if (!cmd.isNone) {
        return items.push({
          text: text,
          ui: ui,
          handler: function() {
            return cmd["do"]();
          }
        });
      }
    };
    addItem(this.taskdoneCmd(record), "Done", "confirm");
    addItem(this.starttaskCmd(record), "Start", "action");
    addItem(this.postponetaskCmd(record), "Postpone", "action");
    items.push({
      text: "Edit",
      ui: "action",
      handler: function() {
        return _this.showEditPanel(record);
      }
    });
    addItem(this.deletetaskCmd(record), "Delete", "decline");
    actionSheet = Ext.create("Ext.ActionSheet", {
      hideOnMaskTap: true,
      items: items,
      listeners: {
        "hide": function() {
          return this.destroy();
        }
      },
      control: {
        button: {
          tap: function() {
            return this.hide();
          }
        }
      }
    });
    if (!actionSheet.getParent()) this.getMain().add(actionSheet);
    return actionSheet.show();
  },
  taskdoneCmd: function(record) {
    return FvTouch.command.CommandManager.create("taskdone", {
      uid: record.data.task.uid
    });
  },
  onDone: function(record) {
    var cmd;
    cmd = this.taskdoneCmd(record);
    return cmd["do"]();
  },
  deletetaskCmd: function(record) {
    return FvTouch.command.CommandManager.create("deletetask", {
      uid: record.data.task.uid
    });
  },
  onDelete: function(record) {
    var cmd;
    cmd = this.deletetaskCmd(record);
    return cmd["do"]();
  },
  postponetaskCmd: function(record) {
    return FvTouch.command.CommandManager.create("postponetask", {
      uid: record.data.task.uid
    });
  },
  onPostpone: function(record) {
    var cmd;
    cmd = this.postponetaskCmd(record);
    return cmd["do"]();
  },
  showEditPanel: function(record) {
    return this.getApplication().getController("EditTask").show(record.data.task.uid);
  },
  starttaskCmd: function(record) {
    return FvTouch.command.CommandManager.create("starttask", {
      uid: record.data.task.uid
    });
  },
  onStart: function(record) {
    var cmd;
    cmd = this.starttaskCmd(record);
    return cmd["do"]();
  }
});
