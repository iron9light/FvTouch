
Ext.define("FvTouch.command.Preselect", {
  extend: "FvTouch.command.Command",
  alias: ["command.preselect"],
  type: "preselect",
  initData: function(config) {
    var task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", config.uid);
    todo = todosStore.findRecord("task_id", task.data.id);
    if (todo.get("order") === 0 || task.get("status") !== "open") return false;
    return {
      uid: config.uid
    };
  },
  doImpl: function() {
    var preselected, task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", this.getCdata().uid);
    todo = todosStore.findRecord("task_id", task.data.id);
    preselected = !todo.get("preselected");
    todo.set("preselected", preselected);
    todo.save();
    todosStore.sync();
    return todo.commit();
  },
  undoImpl: function() {
    return this.doImpl();
  }
});
