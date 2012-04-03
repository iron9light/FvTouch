
Ext.define("FvTouch.view.RunningView", {
  extend: "Ext.Panel",
  requires: ["FvTouch.view.component.RunningItem"],
  xtype: "runningview",
  config: {
    layout: "vbox",
    store: null,
    itemConfig: {},
    defaultType: "runningitem"
  },
  storeEventHooks: {
    beforeload: 'onBeforeLoad',
    load: 'onLoad',
    refresh: 'refresh',
    addrecords: 'onStoreAdd',
    removerecords: 'onStoreRemove',
    updaterecord: 'onStoreUpdate'
  },
  initialize: function() {
    return this.callParent();
  },
  applyStore: function(store) {
    var bindEvents;
    bindEvents = Ext.apply({}, this.storeEventHooks, {
      scope: this
    });
    if (store) {
      store = Ext.data.StoreManager.lookup(store);
      if (store && Ext.isObject(store) && store.isStore) {
        store.on(bindEvents);
      } else {
        Ext.Logger.warn("The specified Store cannot be found", this);
      }
    }
    return store;
  },
  updateStore: function(newStore, oldStore) {
    var bindEvents;
    bindEvents = Ext.apply({}, this.storeEventHooks, {
      scope: this
    });
    if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
      if (oldStore.autoDestroy) {
        oldStore.destroy();
      } else {
        oldStore.un(bindEvents);
      }
    }
    if (newStore) {
      if (newStore.isLoading()) this.onBeforeLoad();
      return this.refresh();
    }
  },
  onBeforeLoad: function() {},
  onLoad: function(store) {},
  refresh: function() {
    if (!this.getStore()) return;
    return this.fireAction("refresh", [this], "doRefresh");
  },
  onAfterRender: function() {
    this.callParent(arguments);
    return this.updateStore(this.getStore());
  },
  findOne: function(array, fn) {
    var x, _i, _len;
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      x = array[_i];
      if (fn(x)) return x;
    }
    return null;
  },
  doRefresh: function(me) {
    var index, itemConfig, record, recordAndIndex, records, recordsAndIndices, store, xtype, _i, _len, _results;
    store = me.getStore();
    records = store.getRange();
    xtype = me.getDefaultType();
    itemConfig = me.getItemConfig();
    recordsAndIndices = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = records.length; _i < _len; _i++) {
        record = records[_i];
        _results.push({
          record: record,
          index: store.indexOf(record)
        });
      }
      return _results;
    })();
    Ext.Array.sort(recordsAndIndices, function(r1, r2) {
      if (r1.index > r2.index) {
        return 1;
      } else {
        return -1;
      }
    });
    me.onStoreClear();
    _results = [];
    for (_i = 0, _len = recordsAndIndices.length; _i < _len; _i++) {
      recordAndIndex = recordsAndIndices[_i];
      record = recordAndIndex.record;
      index = recordAndIndex.index;
      _results.push(me.insert(index, me.getDataItemConfig(xtype, record, itemConfig)));
    }
    return _results;
  },
  onStoreClear: function() {
    return this.removeAll();
  },
  onStoreAdd: function(store, records) {
    var index, item, itemConfig, record, recordAndIndex, recordsAndIndices, xtype, _i, _len;
    xtype = this.getDefaultType();
    itemConfig = this.getItemConfig();
    recordsAndIndices = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = records.length; _i < _len; _i++) {
        record = records[_i];
        _results.push({
          record: record,
          index: store.indexOf(record)
        });
      }
      return _results;
    })();
    Ext.Array.sort(recordsAndIndices, function(r1, r2) {
      if (r1.index > r2.index) {
        return 1;
      } else {
        return -1;
      }
    });
    for (_i = 0, _len = recordsAndIndices.length; _i < _len; _i++) {
      recordAndIndex = recordsAndIndices[_i];
      record = recordAndIndex.record;
      index = recordAndIndex.index;
      item = this.getDataItemConfig(xtype, record, itemConfig);
      this.insert(index, item);
    }
  },
  onStoreRemove: function(store, records, indices) {
    var index, item, _i, _len, _results;
    Ext.Array.sort(indices, function(i1, i2) {
      if (i1 > i2) {
        return -1;
      } else {
        return 1;
      }
    });
    _results = [];
    for (_i = 0, _len = indices.length; _i < _len; _i++) {
      index = indices[_i];
      item = this.getInnerItems()[index];
      _results.push(this.remove(item));
    }
    return _results;
  },
  onStoreUpdate: function(store, record, newIndex, oldIndex) {
    var item, itemConfig, xtype;
    xtype = this.getDefaultType();
    itemConfig = this.getItemConfig();
    oldIndex = typeof oldIndex === 'undefined' ? newIndex : oldIndex;
    if (oldIndex !== newIndex) {
      item = this.getInnerItems()[oldIndex];
      this.remove(item, false);
      return this.insert(newIndex, this.getDataItemConfig(xtype, record, itemConfig));
    } else {
      item = this.getInnerItems()[newIndex];
      return item.updateRecord(record);
    }
  },
  getDataItemConfig: function(xtype, record, itemConfig) {
    var dataItemConfig;
    dataItemConfig = {
      xtype: xtype,
      record: record,
      defaults: itemConfig,
      flex: 1
    };
    return Ext.merge(dataItemConfig, itemConfig);
  }
});
