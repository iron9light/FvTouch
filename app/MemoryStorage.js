
Ext.define("FvTouch.MemoryStorage", {
  extend: "Ext.data.proxy.WebStorage",
  alias: 'proxy.memorystorage',
  getStorageObject: function() {
    return this.self.mystorage;
  },
  statics: {
    mystorage: {
      data: {},
      getItem: function(key) {
        return this.data[key.toString()];
      },
      setItem: function(key, value) {
        return this.data[key.toString()] = value.toString();
      },
      removeItem: function(key) {
        return delete this.data[key.toString()];
      }
    }
  }
});
