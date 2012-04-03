
Ext.define("FvTouch.view.component.ProgressBar", {
  extend: "Ext.Component",
  xtype: "progressbar",
  config: {
    baseCls: Ext.baseCSSPrefix + "progressbar",
    value: 0,
    striped: false,
    active: false
  },
  template: [
    {
      tag: 'div',
      cls: "bar",
      reference: 'barElement'
    }
  ],
  updateValue: function(newValue) {
    var width;
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    width = "" + newValue + "%";
    return this.barElement.setWidth(width);
  },
  updateStriped: function(striped) {
    if (striped) {
      return this.addCls("progress-striped");
    } else {
      return this.removeCls("progress-striped");
    }
  },
  updateActive: function(active) {
    if (active) {
      return this.addCls("active");
    } else {
      return this.removeCls("active");
    }
  }
});
