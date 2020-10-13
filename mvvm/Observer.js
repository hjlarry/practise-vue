function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value);
}

function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function(data) {
    var me = this;
    Object.keys(data).forEach(function(key) {
      me.convert(key, data[key]);
    });
  },
  convert: function(key, value) {
    this.defineReactive(this.data, key, value);
  },
  defineReactive: function(data, key, val) {
    var dep = new Dep();
    var childObj = observe(val); //监听子属性
    Object.defineProperty(data, key, {
      enumerable: true,   //可枚举的
      configurable: false,    // 不可再define
      get: function() {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function(newVal) {
        if (val === newVal) {
          return;
        }
        console.log("监听到值的变化", val, "--->", newVal);
        val = newVal;
        childObj = observe(newVal);
        dep.notify();
      }
    });
  }
}

var uid = 0;

function Dep() {
  this.subs = [];
  this.id = uid++;
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  },
  depend: function() {
    Dep.target.addDep(this);
  }
};

Dep.target = null;