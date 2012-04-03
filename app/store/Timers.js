
Ext.define("FvTouch.store.Timers", {
  extend: "Ext.data.Store",
  config: {
    model: "FvTouch.model.Timer",
    sorters: [
      {
        property: "time",
        direction: "DESC"
      }
    ],
    autoLoad: true,
    autoSync: true
  }
});
