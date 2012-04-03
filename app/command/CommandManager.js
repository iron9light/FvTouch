
Ext.define("FvTouch.command.CommandManager", {
  mixins: ["Ext.mixin.Observable"],
  singleton: true,
  "do": function(cmd) {
    var record, store;
    store = Ext.getStore("Commands");
    record = Ext.create(FvTouch.model.Command, {
      type: cmd.getType(),
      cid: cmd.getCid(),
      ctime: cmd.getCtime(),
      cdata: cmd.getCdata()
    });
    cmd.doImpl();
    store.add(record);
    return Ext.defer(function() {
      return this.fireEvent("do", cmd);
    }, 10, this);
  },
  undo: function() {
    var cmd, record, store;
    store = Ext.getStore("Commands");
    record = store.last();
    if (record) {
      cmd = this.create(record.data.type, record.data);
      cmd.undoImpl();
      store.remove(record);
      return Ext.defer(function() {
        return this.fireEvent("undo", cmd);
      }, 10, this);
    }
  },
  create: function(type, config) {
    return Ext.createByAlias("command." + type, config);
  }
});
