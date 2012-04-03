
Ext.application({
  name: "FvTouch",
  requires: ["FvTouch.command.NoneCommand", "FvTouch.command.AddTask", "FvTouch.command.DeleteTask", "FvTouch.command.EditTask", "FvTouch.command.PostponeTask", "FvTouch.command.Preselect", "FvTouch.command.TaskDone", "FvTouch.command.StartTask"],
  icon: 'img/icon.png',
  phoneStartupScreen: 'img/loading.jpg',
  views: ["Main", "AddTask", "EditTask"],
  controllers: ["Main", "TodoList", "Toolbar", "AddTask", "EditTask"],
  models: ["Task", "Todo", "Command", "Timer"],
  stores: ["Tasks", "Todos", "Commands", "Preselecteds", "Runnings", "Timers"],
  launch: function() {
    return Ext.create("FvTouch.view.Main");
  }
});
