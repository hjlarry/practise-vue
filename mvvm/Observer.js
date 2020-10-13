function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, val) {
  var dep = new Dep();
  observe(val); //监听子属性
  Object.defineProperty(data, key, {
    enumerable: true,   //可枚举的
    configurable: false,    // 不可再define
    get: function() {
      // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      console.log("监听到值的变化", val, "--->", newVal);
      val = newVal;
      dep.notify();
    }
  });
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  }
};
