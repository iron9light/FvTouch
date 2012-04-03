
Ext.define("FvTouch.view.TaskListBase", {
  extend: "Ext.dataview.DataView",
  requires: ["FvTouch.view.component.TodoItem"],
  config: {
    useComponents: true,
    defaultType: "todoitem",
    listeners: {
      itemtaphold: function(dataview, index, dataitem, record) {
        return dataview.fireEvent("act", record);
      },
      itemswipe: function(dataview, index, dataitem, record, e) {
        if (e.direction === "right") {
          return dataview.fireEvent("done", record);
        } else {
          return dataview.fireEvent("postpone", record);
        }
      }
    },
    control: {
      todoitem: {
        doubletap: function(record) {
          return this.fireEvent("edit", record);
        },
        taphold: function(record) {
          return this.fireEvent("act", record);
        },
        icontap: function(record) {
          return this.fireEvent("preselect", record);
        },
        icontap2: function(record) {
          return this.fireEvent("start", record);
        }
      }
    },
    bubbleEvents: ["done", "postpone", "edit", "act", "preselect", "start"]
  },
  prepareData: function(data, recordIndex, record) {
    var store, task;
    store = Ext.getStore("Tasks");
    task = store.getById(data.task_id);
    data.task = task.getData();
    data.index = recordIndex;
    return data;
  },
  initialize: function() {
    var tasksStore;
    this.callParent();
    tasksStore = Ext.getStore("Tasks");
    return tasksStore.on("beforesync", this.refresh, this, {
      delay: 10
    });
  }
});
