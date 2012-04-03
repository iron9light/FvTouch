
Ext.define("FvTouch.command.AddTask", {
  extend: "FvTouch.command.Command",
  alias: ["command.addtask"],
  type: "addtask",
  initData: function(config) {
    if (!config.title) return false;
    return {
      title: config.title,
      uid: config.uid || Ext.data.identifier.Uuid.Global.generate()
    };
  },
  doImpl: function() {
    var data, newTask, newTodo, order, tasksStore, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    order = todosStore.getCount();
    data = this.getCdata();
    newTask = Ext.create("FvTouch.model.Task", {
      title: data.title,
      uid: data.uid,
      createtime: this.getCtime()
    });
    tasksStore.add(newTask);
    newTask.commit();
    newTodo = Ext.create("FvTouch.model.Todo", {
      order: order
    });
    newTodo.setTask(newTask);
    todosStore.add(newTodo);
    todosStore.sync();
    return newTodo.commit();
  },
  undoImpl: function() {
    var task, tasksStore, todo, todosStore;
    todosStore = Ext.getStore("Todos");
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", this.getCdata().uid);
    todo = todosStore.findRecord("task_id", task.data.id);
    todosStore.remove(todo);
    tasksStore.remove(task);
    return todosStore.sync();
  }
});
