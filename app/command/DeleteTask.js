
Ext.define("FvTouch.command.DeleteTask", {
  extend: "FvTouch.command.Command",
  alias: ["command.deletetask"],
  type: "deletetask",
  initData: function(config) {
    var task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", config.uid);
    todo = todosStore.findRecord("task_id", task.data.id);
    return {
      task: {
        uid: task.data.uid,
        title: task.data.title,
        status: task.data.status,
        createtime: task.data.createtime,
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
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    data = this.getCdata();
    task = tasksStore.findRecord("uid", data.task.uid);
    todo = todosStore.findRecord("task_id", task.data.id);
    tasksStore.remove(task);
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
    task = Ext.create("FvTouch.model.Task", data.task);
    tasksStore.add(task);
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
