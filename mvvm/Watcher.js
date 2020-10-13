function Watcher(vm, expOrFn, cb) {
  this.vm = vm;
  this.expOrFn = expOrFn;
  this.cb = cb;
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = this.parseGetter(expOrFn.trim());
  }
  this.value = this.get();
}

Watcher.prototype = {
  update: function() { this.run(); },
  run: function() {
    var value = this.get();
    var oldValue = this.value;
    if (value != oldValue) {
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  },
  get: function() {
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  },
  parseGetter: function(exp) {
    if (/[^\w.$]/.test(exp)) return;
    var exps = exp.split('.');
    return function(obj) {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    }
  }
}