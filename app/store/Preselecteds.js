
Ext.define("FvTouch.store.Preselecteds", {
  extend: "Ext.data.Store",
  config: {
    model: "FvTouch.model.Todo",
    sorters: [
      {
        property: "order",
        direction: "DESC"
      }
    ],
    filters: [
      {
        filterFn: function(item) {
          return item.data.order === 0 || item.data.preselected;
        }
      }
    ],
    autoLoad: true
  },
  constructor: function() {
    var todosStore;
    this.callParent(arguments);
    todosStore = Ext.getStore("Todos");
    return todosStore.on("beforesync", this.load, this, {
      delay: 10
    });
  }
});
