
Ext.define("FvTouch.command.StartTask", {
  extend: "FvTouch.command.Command",
  alias: ["command.starttask"],
  type: "starttask",
  initData: function(config) {
    var task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", config.uid);
    if (task.get("status") !== "open") return false;
    todo = todosStore.findRecord("task_id", task.data.id);
    return {
      task: {
        uid: config.uid,
        status: task.data.status
      },
      todo: {
        order: todo.get("order"),
        preselected: todo.get("preselected")
      }
    };
  },
  doImpl: function() {
    var data, maxorder, order, records, task, tasksStore, todo, todosStore;
    tasksStore = Ext.getStore("Tasks");
    data = this.getCdata();
    task = tasksStore.findRecord("uid", data.task.uid);
    task.set("status", "running");
    task.set("starttime", this.getCtime());
    task.save();
    task.commit();
    todosStore = Ext.getStore("Todos");
    todo = todosStore.findRecord("task_id", task.data.id);
    if (!data.todo.preselected) todo.set("preselected", true);
    order = todo.get("order");
    records = [];
    maxorder = todosStore.getCount() - 1;
    if (order < maxorder) {
      todosStore.each(function(record) {
        var o;
        o = record.get("order");
        if (o > order) {
          return records.push({
            id: record.get("id"),
            order: o - 1
          });
        }
      });
      Ext.Array.each(records, function(x) {
        var r;
        r = todosStore.getById(x.id);
        r.set("order", x.order);
        return r.save();
      });
      todo.set("order", maxorder);
    }
    todo.save();
    todosStore.sync();
    todo.commit();
    return Ext.Array.each(records, function(x) {
      return todosStore.getById(x.id).commit();
    });
  },
  undoImpl: function() {
    var data, maxorder, order, records, task, tasksStore, todo, todosStore;
    tasksStore = Ext.getStore("Tasks");
    data = this.getCdata();
    task = tasksStore.findRecord("uid", data.task.uid);
    task.set("status", data.task.status);
    task.set("starttime", void 0);
    task.save();
    task.commit();
    todosStore = Ext.getStore("Todos");
    todo = todosStore.findRecord("task_id", task.data.id);
    if (!data.todo.preselected) todo.set("preselected", false);
    order = data.todo.order;
    records = [];
    maxorder = todosStore.getCount() - 1;
    if (order < maxorder) {
      todosStore.each(function(record) {
        var o;
        o = record.get("order");
        if (o === maxorder) {
          return records.push({
            id: record.get("id"),
            order: order
          });
        } else if (o >= order) {
          return records.push({
            id: record.get("id"),
            order: o + 1
          });
        }
      });
      Ext.Array.each(records, function(x) {
        var r;
        r = todosStore.getById(x.id);
        r.set("order", x.order);
        return r.save();
      });
    }
    todo.save();
    todosStore.sync();
    todo.commit();
    return Ext.Array.each(records, function(x) {
      return todosStore.getById(x.id).commit();
    });
  }
});
