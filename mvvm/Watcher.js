class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.depIds = {};
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = this.parseGetter(expOrFn.trim());
    }
    this.value = this.get();
  }

  update() {
    this.run();
  }

  run() {
    let value = this.get();
    let oldValue = this.value;
    if (value != oldValue) {
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }

  get() {
    Dep.target = this;
    let value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  parseGetter(exp) {
    if (/[^\w.$]/.test(exp)) return;
    let exps = exp.split('.');
    return function(obj) {
      for (let i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    }
  }

  addDep(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  }
}


