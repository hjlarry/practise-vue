/*
一、 对象的属性
对象的属性即可以通过点符号，也可以通过方括号访问或设置
通过三种方式可枚举对象的属性:
for...in 依次访问一个对象及其原型链中所有可枚举的属性
Object.keys(o) 返回对象o自身（不包括原型）包含的所有可枚举属性的名称的数组
Object.getOwnPropertyNames(o) 返回对象o自身（不包括原型）包含的所有属性的名称的数组
*/
var myCar = new Object();
myCar.make = "Ford";
myCar["model"] = "Mustang";
myCar.year = 1969;
myCar.noProperty; // undefined


function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}
showProps(myCar, "myCar");

function listAllProperties(o) {
  var objectToInspect;
  var result = [];
  for (objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
    result = result.concat(Object.getOwnPropertyNames(objectToInspect));
  }
  return result;
}
listAllProperties(myCar);

/*
二、 对象的创建
可以使用字面量来创建，也可以使用构造函数来创建，还可以用Object.create()创建
*/
// 字面量创建
var myHonda = { color: "red", wheels: 4, engine: { cylinders: 4, size: 2.2 } };

// 构造函数创建
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Eagle", "Talon TSi", 1993);  // 然后用new创建实例

// 用Object.create()创建，可以为创建的对象选择一个原型对象
var Animal = {
  type: "Invertebrates", // 属性默认值
  displayType: function() {  // 用于显示type属性的方法
    console.log(this.type);
  }
}
// 创建一种新的动物——animal1 
var animal1 = Object.create(Animal);
animal1.displayType(); // Output:Invertebrates
// 创建一种新的动物——Fishes
var fish = Object.create(Animal);
fish.type = "Fishes";
fish.displayType(); // Output:Fishes

/*
三、 定义方法
方法是关联到对象的函数，js支持定义getter和setter方法
*/

// 定义方式一
objectName.methodname = function_name;

var myObj = {
  // 定义方式二
  myMethod: function(params) {
    // ...do something
  },

  // 定义方式三
  myOtherMethod(params) {
    // ...do something else
  }
};


// 初始化时添加getter和setter
var o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2
  }
};
console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25

// 已创建的对象增加getter和setter需要使用Object.defineProperties
var o = { a: 0 }
Object.defineProperties(o, {
  "b": { get: function() { return this.a + 1; } },
  "c": { set: function(x) { this.a = x / 2; } }
});
o.c = 10
console.log(o.b)

/*
四、 其他
使用delete删除属性时只能删掉不是继承而来的属性
对象是引用类型，所以两个对象相比较时永远不会相等，即使他们的属性完全相同，只有比较一个对象和该对象的引用才为true
*/