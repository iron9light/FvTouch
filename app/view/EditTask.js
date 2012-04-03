
Ext.define("FvTouch.view.EditTask", {
  extend: "FvTouch.view.EditTaskBase",
  xtype: "edittaskpanel",
  title: "Edit Task",
  config: {
    uid: void 0
  },
  getValues: function() {
    var values;
    values = this.callParent(arguments);
    values.uid = this.getUid();
    return values;
  },
  setValues: function(values) {
    this.callParent(arguments);
    return this.setUid(values.uid);
  }
});
