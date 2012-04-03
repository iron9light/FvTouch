
Ext.define("FvTouch.store.Runnings", {
  extend: "Ext.data.Store",
  config: {
    model: "FvTouch.model.Task",
    sorters: [
      {
        property: "starttime",
        direction: "DESC"
      }
    ],
    filters: [
      {
        property: "status",
        value: "running"
      }
    ],
    autoLoad: true
  },
  constructor: function() {
    var tasksStore;
    this.callParent(arguments);
    tasksStore = Ext.getStore("Tasks");
    return tasksStore.on("beforesync", this.load, this, {
      delay: 10
    });
  }
});
