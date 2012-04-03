
Ext.define("FvTouch.view.EditTaskBase", {
  extend: "Ext.Panel",
  config: {
    showAnimation: {
      type: "slide",
      direction: "up"
    },
    hideAnimation: {
      type: "slideOut",
      direction: "down"
    },
    zIndex: 1000,
    items: [
      {
        docked: "top",
        xtype: "toolbar",
        items: [
          {
            xtype: "button",
            text: "Cancel",
            action: "cancel"
          }, {
            xtype: "spacer"
          }, {
            xtype: "button",
            text: "Save",
            action: "save",
            ui: "confirm"
          }
        ]
      }, {
        xtype: "formpanel",
        items: [
          {
            xtype: "fieldset",
            items: [
              {
                xtype: "textfield",
                name: "title"
              }
            ]
          }
        ]
      }
    ],
    listeners: {
      initialize: function() {
        return this.child("toolbar").setTitle(this.title);
      }
    },
    layout: "fit",
    control: {
      "[action=cancel]": {
        tap: function() {
          return this.fireEvent("cancel");
        }
      },
      "[action=save]": {
        tap: function() {
          return this.fireEvent("save", this.getValues());
        }
      }
    }
  },
  getValues: function() {
    return this.child("formpanel").getValues();
  },
  setValues: function(values) {
    return this.child("formpanel").setValues(values);
  },
  reset: function() {
    this.child("formpanel").reset();
    return this.child("formpanel textfield[name=title]").focus();
  }
});
