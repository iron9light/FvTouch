
Ext.define("FvTouch.command.Command", {
  type: void 0,
  config: {
    cid: void 0,
    ctime: void 0,
    cdata: void 0
  },
  constructor: function(config) {
    config.cdata || (config.cdata = this.initData(config));
    if (!config.cdata) return FvTouch.command.NoneCommand;
    config.cid || (config.cid = Ext.data.identifier.Uuid.Global.generate());
    return this.initConfig(config);
  },
  "do": function() {
    if (!this.getCtime()) this.setCtime(Date.now());
    return FvTouch.command.CommandManager["do"](this);
  },
  getType: function() {
    return this.type;
  },
  initData: function(config) {},
  doImpl: Ext.emptyFn,
  undoImpl: Ext.emptyFn
});
