
Ext.define("FvTouch.store.Tasks", {
  extend: "Ext.data.Store",
  config: {
    model: "FvTouch.model.Task",
    autoLoad: true,
    autoSync: true
  }
});
