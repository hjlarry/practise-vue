var data = { name: "hello" };
observe(data);
data.name = "newworld";

function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, val) {
  observe(val); //监听子属性
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      return val;
    },
    set: function(newVal) {
      console.log("监听到值的变化", val, "--->", newVal);
      val = newVal;
    }
  });
}