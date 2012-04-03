
Ext.define("FvTouch.model.Command", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {
        name: "type",
        type: "string"
      }, {
        name: "cid",
        type: "string"
      }, {
        name: "ctime",
        type: "int"
      }, {
        name: "cdata"
      }
    ],
    proxy: {
      type: "localstorage",
      id: "commands"
    }
  }
});
