
Ext.define("FvTouch.command.EditTask", {
  extend: "FvTouch.command.Command",
  alias: ["command.edittask"],
  type: "edittask",
  initData: function(config) {
    var newTitle, oldTitle, task, tasksStore;
    tasksStore = Ext.getStore("Tasks");
    task = tasksStore.findRecord("uid", config.uid);
    newTitle = config.title;
    oldTitle = task.getData().title;
    if (newTitle === oldTitle) return false;
    return {
      uid: config.uid,
      "new": {
        title: newTitle
      },
      old: {
        title: oldTitle
      }
    };
  },
  doImpl: function() {
    var data, task, tasksStore;
    tasksStore = Ext.getStore("Tasks");
    data = this.getCdata();
    task = tasksStore.findRecord("uid", data.uid);
    task.set("title", data["new"].title);
    task.save();
    return task.commit();
  },
  undoImpl: function() {
    var data, task, tasksStore;
    tasksStore = Ext.getStore("Tasks");
    data = this.getCdata();
    task = tasksStore.findRecord("uid", data.uid);
    task.set("title", data.old.title);
    task.save();
    return task.commit();
  }
});
