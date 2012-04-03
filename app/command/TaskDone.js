
Ext.define("FvTouch.command.TaskDone", {
  extend: "FvTouch.command.Command",
  alias: ["command.taskdone"],
  type: "taskdone",
  initData: function(config) {
    var task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", config.uid);
    todo = todosStore.findRecord("task_id", task.data.id);
    if (task.get("status") === "done") return false;
    return {
      task: {
        uid: task.data.uid,
        status: task.data.status
      },
      todo: {
        order: todo.data.order,
        preselected: todo.data.preselected
      }
    };
  },
  doImpl: function() {
    var data, order, records, task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    data = this.getCdata();
    task = tasksStore.findRecord("uid", data.task.uid);
    task.set("status", "done");
    task.set("endtime", this.getCtime());
    task.save();
    task.commit();
    todo = todosStore.findRecord("task_id", task.data.id);
    order = todo.data.order;
    todosStore.remove(todo);
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
    todosStore.sync();
    return Ext.Array.each(records, function(x) {
      return todosStore.getById(x.id).commit();
    });
  },
  undoImpl: function() {
    var data, order, records, task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    data = this.getCdata();
    task = tasksStore.findRecord("uid", data.task.uid);
    task.set("status", data.task.status);
    task.set("endtime", void 0);
    task.save();
    task.commit();
    todo = Ext.create("FvTouch.model.Todo", data.todo);
    todo.setTask(task);
    order = todo.data.order;
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
    todosStore.add(todo);
    todosStore.sync();
    todo.commit();
    return Ext.Array.each(records, function(x) {
      return todosStore.getById(x.id).commit();
    });
  }
});
