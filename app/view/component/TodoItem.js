
Ext.define("FvTouch.view.component.TodoItem", {
  extend: "Ext.dataview.component.DataItem",
  xtype: "todoitem",
  config: {
    iconCls: null,
    iconCls2: null,
    text: null,
    layout: "hbox",
    onUpdatedata: Ext.emptyFn,
    items: [
      {
        xtype: "button",
        cls: "taskitemicon",
        iconMask: true,
        docked: "left",
        action: "icon",
        itemId: "icon"
      }, {
        xtype: "button",
        cls: "taskitemicon2",
        iconMask: true,
        docked: "right",
        action: "icon2",
        itemId: "icon2"
      }, {
        xtype: "label",
        width: "100%",
        cls: "title",
        action: "title",
        itemId: "title"
      }
    ],
    cls: "taskitem",
    hideAnimation: "fadeOut",
    showAnimation: "fadeIn",
    draggable: {
      constraint: null,
      direction: "horizontal",
      listeners: {
        dragend: function() {
          var elem;
          this.setOffset(0, 0, {
            easingX: "ease-out",
            duration: 300
          });
          elem = this.getElement();
          elem.removeCls("" + (this.getDraggingCls()) + "right");
          return elem.removeCls("" + (this.getDraggingCls()) + "left");
        },
        drag: function(x, e, offsetX) {
          var elem, leftCls, rightCls;
          if (offsetX) {
            rightCls = this.getDraggingCls() + "right";
            leftCls = this.getDraggingCls() + "left";
            elem = this.getElement();
            if (offsetX > 0) {
              elem.addCls(rightCls);
              return elem.removeCls(leftCls);
            } else {
              elem.addCls(leftCls);
              return elem.removeCls(rightCls);
            }
          }
        }
      }
    },
    listeners: {
      updatedata: function(item, data) {
        return this.getOnUpdatedata()(item, data);
      }
    },
    control: {
      "#icon": {
        tap: "onIcontap"
      },
      "#icon2": {
        tap: "onIcontap2"
      }
    }
  },
  initialize: function() {
    this.callParent();
    return this.innerElement.on({
      longpress: "onLongpress",
      doubletap: "onDoubletap",
      scope: this
    });
  },
  updateIconCls: function(newIconCls) {
    var iconComponent;
    iconComponent = this.child("#icon");
    if (newIconCls) {
      iconComponent.setIconCls(newIconCls);
      return iconComponent.show();
    } else {
      return iconComponent.hide();
    }
  },
  updateIconCls2: function(newIconCls) {
    var iconComponent;
    iconComponent = this.child("#icon2");
    if (newIconCls) {
      iconComponent.setIconCls(newIconCls);
      return iconComponent.show();
    } else {
      return iconComponent.hide();
    }
  },
  updateText: function(newText) {
    return this.child("#title").setHtml(newText);
  },
  onLongpress: function() {
    return this.fireEvent("taphold", this.getRecord());
  },
  onDoubletap: function() {
    return this.fireEvent("doubletap", this.getRecord());
  },
  onIcontap: function() {
    return this.fireEvent("icontap", this.getRecord());
  },
  onIcontap2: function() {
    return this.fireEvent("icontap2", this.getRecord());
  }
});
