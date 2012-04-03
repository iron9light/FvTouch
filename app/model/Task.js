
Ext.define("FvTouch.model.Task", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {
        name: "uid",
        type: "string"
      }, {
        name: "title",
        type: "string"
      }, {
        name: "status",
        type: "string",
        defaultValue: "open"
      }, {
        name: "createtime",
        type: "int"
      }, {
        name: "starttime",
        type: "int",
        defaultValue: void 0
      }, {
        name: "endtime",
        type: "int",
        defaultValue: void 0
      }
    ],
    identifier: "simple",
    proxy: {
      type: "localstorage",
      id: "taskitems"
    }
  },
  init: function() {
    var _base;
    return (_base = this.data).uid || (_base.uid = Ext.data.identifier.Uuid.Global.generate());
  }
});
