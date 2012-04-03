
Ext.define("FvTouch.controller.Main", {
  extend: "Ext.app.Controller",
  requires: "FvTouch.command.CommandManager",
  config: {
    refs: {
      tabpanel: "mainview > tabpanel"
    },
    control: {
      tabpanel: {
        activeitemchange: function(container, tab) {
          var theme;
          theme = tab.id === "runningview" ? "running" : tab.id === "preselectedview" ? "preselected" : "default-theme";
          return Ext.fly("themecss").set({
            href: "css/" + theme + ".css"
          });
        }
      }
    }
  },
  init: function() {
    return FvTouch.command.CommandManager.on({
      "do": function(cmd) {
        var me;
        me = this;
        return Ext.Array.each(this.cmdDoListeners, function(listener) {
          var fn, type;
          for (type in listener) {
            fn = listener[type];
            if (type === cmd.getType()) fn.call(me, cmd);
          }
        });
      },
      undo: function(cmd) {
        var me;
        me = this;
        return Ext.Array.each(this.cmdUndoListeners, function(listener) {
          var fn, type;
          for (type in listener) {
            fn = listener[type];
            if (type === cmd.getType()) fn.call(me, cmd);
          }
        });
      },
      scope: this
    });
  },
  cmdDoListeners: [
    {
      starttask: function() {
        return this.gotoRunningView();
      }
    }, {
      deletetask: function(cmd) {
        return this.checkFinishedAllPreselecteds(cmd.getCdata().todo.order);
      },
      postponetask: function(cmd) {
        return this.checkFinishedAllPreselecteds(cmd.getCdata().todo.order);
      },
      taskdone: function(cmd) {
        return this.checkFinishedAllPreselecteds(cmd.getCdata().todo.order);
      }
    }, {
      deletetask: function(cmd) {
        return this.removeTimer(cmd.getCdata().task.uid);
      },
      postponetask: function(cmd) {
        return this.removeTimer(cmd.getCdata().task.uid);
      },
      taskdone: function(cmd) {
        return this.removeTimer(cmd.getCdata().task.uid);
      }
    }
  ],
  cmdUndoListeners: [
    {
      starttask: function(cmd) {
        return this.removeTimer(cmd.getCdata().task.uid);
      }
    }
  ],
  removeTimer: function(uid) {
    var timers, timersStore;
    timersStore = Ext.getStore("Timers");
    timers = [];
    timersStore.each(function(timer) {
      if (timer.get("uid") === uid) return timers.push(timer);
    });
    return timersStore.remove(timers);
  },
  checkFinishedAllPreselecteds: function(lastOrder) {
    var count, preselectedsStore;
    preselectedsStore = Ext.getStore("Preselecteds");
    preselectedsStore.load();
    count = preselectedsStore.getCount();
    if (count === 0) {
      return this.gotoTodoView();
    } else if (count === 1 && lastOrder === 0 && !preselectedsStore.first().get("preselected")) {
      return this.gotoTodoView();
    }
  },
  gotoRunningView: function() {
    return this.getTabpanel().setActiveItem(2);
  },
  gotoTodoView: function() {
    return this.getTabpanel().setActiveItem(0);
  }
});
