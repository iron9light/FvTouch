
Ext.define("FvTouch.view.component.RunningItem", {
  extend: "Ext.Container",
  xtype: "runningitem",
  config: {
    record: null,
    layout: "vbox",
    items: [
      {
        xtype: "label",
        itemId: "title"
      }, {
        xtype: "progressbar",
        itemId: "progressbar",
        striped: true,
        active: true
      }
    ],
    hideAnimation: "fadeOut",
    showAnimation: "fadeIn"
  },
  updateRecord: function(newRecord) {
    var uid;
    if (newRecord) {
      this.child("#title").setHtml(newRecord.get("title"));
      uid = newRecord.get("uid");
      this.updateTimer();
    }
    return this.callParent(arguments);
  },
  updateTimer: function() {
    var me, record, timer, timerTime, timerType, timersStore, uid;
    record = this.getRecord();
    uid = record.get("uid");
    timersStore = Ext.getStore("Timers");
    timer = timersStore.findRecord("uid", uid);
    if (timer) {
      timerTime = timer.get("time");
      timerType = timer.get("type");
    } else {
      timerTime = record.get("starttime");
      if (!timerTime) return;
      timerType = "go";
      timersStore.add({
        uid: uid,
        time: timerTime,
        type: timerType
      });
    }
    if (this.timer) clearInterval(this.timer);
    me = this;
    return this.timer = setInterval(function() {
      var duration, now, progressbar, value;
      if (!me) return;
      progressbar = me.child("#progressbar");
      now = Date.now();
      duration = now - timerTime;
      if (timerType === "go") {
        value = duration / 15000;
        progressbar.setValue(value);
        progressbar.setUi(null);
        if (value > 100) {
          clearInterval(me.timer);
          return delete me.timer;
        }
      } else {
        value = 100 - duration / 3000;
        progressbar.setValue(value);
        progressbar.setUi("confirm");
        if (value < 0) {
          clearInterval(me.timer);
          return delete me.timer;
        }
      }
    }, 1000);
  },
  destroy: function() {
    if (this.timer) clearInterval(this.timer);
    return this.callParent();
  }
});
