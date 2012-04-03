
Ext.define("FvTouch.command.PostponeTask", {
  extend: "FvTouch.command.Command",
  alias: ["command.postponetask"],
  type: "postponetask",
  initData: function(config) {
    var task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", config.uid);
    todo = todosStore.findRecord("task_id", task.data.id);
    if (todosStore.getCount() - 1 === todo.data.order && !todo.data.preselected && task.get("status") !== "running") {
      return false;
    }
    return {
      task: {
        status: task.data.status,
        starttime: task.data.starttime
      },
      todo: {
        order: todo.data.order,
        preselected: todo.data.preselected
      }
    };
  },
  doImpl: function() {
    var data, order, records, task, tasksStore, todo, todosStore;
    tasksStore = Ext.getStore("Tasks");
    todosStore = Ext.getStore("Todos");
    data = this.getCdata();
    order = data.todo.order;
    todo = todosStore.findRecord("order", order);
    task = tasksStore.getById(todo.data.task_id);
    if (data.task.status !== "open") {
      task.set("status", "open");
      task.set("starttime", void 0);
      task.save();
      task.commit();
    }
    records = [];
    todosStore.each(function(record) {
      var o;
      o = record.get("order");
      if (o > order) {
        records.push({
          id: record.get("id"),
          order: o - 1
        });
      }
      return true;
    });
    Ext.Array.each(records, function(x) {
      var r;
      r = todosStore.getById(x.id);
      r.set("order", x.order);
      return r.save();
    });
    todo.set("order", todosStore.getCount() - 1);
    if (data.todo.preselected) todo.set("preselected", false);
    todo.save();
    todosStore.sync();
    todo.commit();
    return Ext.Array.each(records, function(x) {
      return todosStore.getById(x.id).commit();
    });
  },
  undoImpl: function() {
    var data, order, records, task, tasksStore, todo, todosStore;
    tasksStore = Ext.getStore("Tasks");
    todosStore = Ext.getStore("Todos");
    data = this.getCdata();
    order = data.todo.order;
    todo = todosStore.last();
    task = tasksStore.getById(todo.data.task_id);
    if (data.task.status !== "open") {
      task.set("status", data.task.status);
      task.set("starttime", data.task.starttime);
      task.save();
      task.commit();
    }
    records = [];
    todosStore.each(function(record) {
      var o;
      o = record.get("order");
      if (o >= order) {
        records.push({
          id: record.get("id"),
          order: o + 1
        });
      }
      return true;
    });
    Ext.Array.each(records, function(x) {
      var r;
      r = todosStore.getById(x.id);
      r.set("order", x.order);
      return r.save();
    });
    todo.set("order", order);
    todo.set("preselected", data.preselected);
    todo.save();
    todosStore.sync();
    todo.commit();
    return Ext.Array.each(records, function(x) {
      return todosStore.getById(x.id).commit();
    });
  }
});
