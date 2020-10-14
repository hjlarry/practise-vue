function Compile(el, vm) {
  this.$vm = vm;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  init: function() { this.compileElement(this.$fragment); },
  node2Fragment: function(el) {
    var fragment = document.createDocumentFragment();
    var child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  },
  compileElement: function(el) {
    var childNodes = el.childNodes;
    var me = this;
    [].slice.call(childNodes).forEach(function(node) {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;
      if (me.isElementNode(node)) {
        me.compile(node);
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1);
      }
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },
  compile: function(node) {
    var nodeAttrs = node.attributes;
    var me = this;
    [].slice.call(nodeAttrs).forEach(function(attr) {
      var attrName = attr.name;
      if (me.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
      }
    });
  },
  compileText: function(node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },
  isElementNode: function(node) { return node.nodeType == 1; },
  isTextNode: function(node) { return node.nodeType == 3; },
  isDirective: function(attr) {
    return attr.indexOf('v-') == 0;
  },
  isEventDirective: function(dir) {
    return dir.indexOf('on') === 0;
  },
};

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
    var me = this;
    var val = this._getVMVal(vm, exp);
    node.addEventListener('input', function(e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },
  bind: function(node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];
    updaterFn && updaterFn(node, vm[exp]);
    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },
  _getVMVal: function(vm, exp) {
    var val = vm;
    exp = exp.split('.');
    exp.forEach(function(k) {
      val = val[k];
    });
    return val;
  },
  _setVMVal: function(vm, exp, value) {
    var val = vm;
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
    var eventType = dir.split(':')[1];
    var fn = vm.$options.methods && vm.$options.methods[exp];
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