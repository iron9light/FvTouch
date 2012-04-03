
Ext.define("FvTouch.model.Timer", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {
        name: "uid",
        type: "string"
      }, {
        name: "time",
        type: "int"
      }, {
        name: "type",
        type: "string"
      }
    ],
    proxy: {
      type: "memory"
    }
  }
});
