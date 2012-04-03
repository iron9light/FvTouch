
Ext.define("FvTouch.controller.Store", {
  extend: "Ext.app.Controller",
  init: function() {
    var _this = this;
    this.load();
    return window.addEventListener("unload", function() {
      return _this.save();
    });
  },
  load: function() {
    var commands, commandsStore, store;
    store = window.localStorage;
    if (store) {
      commands = Ext.JSON.decode(store.getItem("commands"));
      if (commands) {
        commandsStore = Ext.getStore("Commands");
        return Ext.Array.each(commands, function(c) {
          var cmd;
          cmd = FvTouch.command.Command.create(c.type, c);
          return cmd["do"]();
        });
      }
    }
  },
  save: function() {
    var store;
    store = window.localStorage;
    if (store) return store.setItem("commands", this.store2str("Commands"));
  },
  store2str: function(name) {
    var fields, model, store;
    store = Ext.getStore(name);
    model = store.getModel();
    fields = model.getFields();
    return Ext.JSON.encode(Ext.Array.map(store.getData().all, function(r) {
      var d;
      d = {};
      fields.each(function(field) {
        name = field.getName();
        return d[name] = r.get(name);
      });
      return d;
    }));
  }
});
