
Ext.define("FvTouch.command.NoneCommand", {
  extend: "FvTouch.command.Command",
  singleton: true,
  alias: ["command.none"],
  type: "none",
  isNone: true,
  constructor: function() {},
  "do": function() {}
});
