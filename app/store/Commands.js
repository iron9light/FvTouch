
Ext.define("FvTouch.store.Commands", {
  extend: "Ext.data.Store",
  config: {
    model: "FvTouch.model.Command",
    autoLoad: true,
    autoSync: true
  }
});
