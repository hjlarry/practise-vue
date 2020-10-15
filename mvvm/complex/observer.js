function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value);
}


class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }

  walk(data) {
    let me = this;
    Object.keys(data).forEach(function(key) {
      me.convert(key, data[key]);
    });
  }

  convert(key, value) {
    this.defineReactive(this.data, key, value);
  }

  defineReactive(data, key, val) {
    let dep = new Dep();
    let childObj = observe(val); //监听子属性
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

class Dep {
  constructor() {
    this.subs = [];
    this.id = uid++;
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  }

  depend() {
    Dep.target.addDep(this);
  }
}


Dep.target = null;