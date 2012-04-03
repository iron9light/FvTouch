
Ext.define("FvTouch.store.Todos", {
  extend: "Ext.data.Store",
  config: {
    model: "FvTouch.model.Todo",
    sorters: [
      {
        property: "order",
        direction: "ASC"
      }
    ],
    autoLoad: true
  }
});
