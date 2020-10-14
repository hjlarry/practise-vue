class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el);
      this.init();
      this.$el.appendChild(this.$fragment);
    }
  }

  init() {
    this.compileElement(this.$fragment);
  }

  node2Fragment(el) {
    let fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compileElement(el) {
    let childNodes = el.childNodes;
    let me = this;
    [].slice.call(childNodes).forEach(function(node) {
      let text = node.textContent;
      let reg = /\{\{(.*)\}\}/;
      if (me.isElementNode(node)) {
        me.compile(node);
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1);
      }
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  }

  compile(node) {
    let nodeAttrs = node.attributes;
    let me = this;
    [].slice.call(nodeAttrs).forEach(function(attr) {
      let attrName = attr.name;
      if (me.isDirective(attrName)) {
        let exp = attr.value;
        let dir = attrName.substring(2);
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
      }
    });
  }

  compileText(node, exp) {
    compileUtil.text(node, this.$vm, exp);
  }

  isElementNode(node) {
    return node.nodeType == 1;
  }

  isTextNode(node) {
    return node.nodeType == 3;
  }

  isDirective(attr) {
    return attr.indexOf('v-') == 0;
  }

  isEventDirective(dir) {
    return dir.indexOf('on') === 0;
  }
}


var compileUtil = {
  text: function(node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },
  html: function(node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },
  class: function(node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },
  model: function(node, vm, exp) {
    this.bind(node, vm, exp, 'model');
    let me = this;
    let val = this._getVMVal(vm, exp);
    node.addEventListener('input', function(e) {
      let newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },
  bind: function(node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater'];
    updaterFn && updaterFn(node, vm[exp]);
    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },
  _getVMVal: function(vm, exp) {
    let val = vm;
    exp = exp.split('.');
    exp.forEach(function(k) {
      val = val[k];
    });
    return val;
  },
  _setVMVal: function(vm, exp, value) {
    let val = vm;
    exp = exp.split('.');
    exp.forEach(function(k, i) {
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  },
  eventHandler: function(node, vm, exp, dir) {
    let eventType = dir.split(':')[1];
    let fn = vm.$options.methods && vm.$options.methods[exp];
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  }
}

var updater = {
  textUpdater: function(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  htmlUpdater: function(node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  modelUpdater: function(node, value) {
    node.value = typeof value == 'undefined' ? '' : value;
  },
}