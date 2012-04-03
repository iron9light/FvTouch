
Ext.define("FvTouch.view.AddTask", {
  extend: "FvTouch.view.EditTaskBase",
  xtype: "addtaskpanel",
  title: "New Task",
  initialize: function() {
    this.callParent();
    return this.child("toolbar").add({
      xtype: "button",
      text: "Save and add more",
      action: "addmore",
      ui: "confirm",
      handler: function() {
        return this.onSaveAndAddMore();
      },
      scope: this
    });
  },
  onSaveAndAddMore: function() {
    return this.fireEvent("addmore", this.getValues());
  }
});
