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

/*
五、 基于类的Java和基于原型的JS关于对象系统的对比

Java: 类和实例是不同的事物。  JS: 所有的对象都是实例
Java: 通过类定义来定义类，构造器方法来实例化。  JS: 通过构造器函数来定义和创建一组对象
Java和JS均通过new操作符来创建单个对象
Java: 通过类定义来定义子类，从而构建对象的层级结构。  JS: 指定一个对象为原型，与构造函数一起构建对象的层级结构
Java: 类定义时确定了实例的所有属性，无法运行时动态添加属性。  JS: 构造器函数或原型只是指定实例初始的属性集，允许动态地向单个的对象或者整个对象集中添加或移除属性
*/

// ES6
// class Employee {
//   constructor() {
//     this.name = '';
//     this.dept = 'general';
//   }
// }


function Employee() {
  this.name = '';
  this.dept = 'general';
}

function Manager() {
  Employee.call(this);
  this.reports = [];
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

function WorkerBee() {
  Employee.call(this);
  this.projects = [];
}
WorkerBee.prototype = Object.create(Employee.prototype);
WorkerBee.prototype.constructor = WorkerBee;

function SalesPerson() {
  WorkerBee.call(this);
  this.dept = 'sales';
  this.quota = 100;
}
SalesPerson.prototype = Object.create(WorkerBee.prototype);
SalesPerson.prototype.constructor = SalesPerson;

function Engineer() {
  WorkerBee.call(this);
  this.dept = 'engineering';
  this.machine = '';
}
Engineer.prototype = Object.create(WorkerBee.prototype)
Engineer.prototype.constructor = Engineer;

/*
Java写法对比
public class Employee {
   public String name = "";
   public String dept = "general";
}

public class Manager extends Employee {
   public Employee[] reports =
       new Employee[0];
}

public class WorkerBee extends Employee {
   public String[] projects = new String[0];
}

public class SalesPerson extends WorkerBee {
   public String dept = "sales";
   public double quota = 100.0;
}

public class Engineer extends WorkerBee {
   public String dept = "engineering";
   public String machine = "";
}
*/

var jim = new Employee;
// jim.name is ''
// jim.dept is 'general'

var sally = new Manager;
// sally.name is ''
// sally.dept is 'general'
// sally.reports is []

var mark = new WorkerBee;
// mark.name is ''
// mark.dept is 'general'
// mark.projects is []

var fred = new SalesPerson;
// fred.name is ''
// fred.dept is 'sales'
// fred.projects is []
// fred.quota is 100

var jane = new Engineer;
// jane.name is ''
// jane.dept is 'engineering'
// jane.projects is []
// jane.machine is ''

/*
六、 更灵活的构造器
*/

function Employee(name, dept) {
  this.name = name || "";
  this.dept = dept || "general";
}

function WorkerBee(projs) {
  this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

function Engineer(projs, mach) {
  this.base = WorkerBee;
  this.base(projs);
  this.machine = mach || "";
}
Engineer.prototype = new WorkerBee;

var mark = new WorkerBee([1, 3, 5]);
// mark.name is ''
// mark.dept is ''
// mark.projects is [1, 3, 5]

var jane = new Engineer(["navigator", "javascript"], "belau");
// jane.name is ''
// jane.dept is ''
// jane.projects is ["navigator", "javascript"]
// jane.machine is 'belau'

// base只是一个新的属性，指向WorkerBee的构造函数，也可以叫别的名字
// 还可以使用别的形式
function Engineer(projs, mach) {
  WorkerBee.call(this, projs);
  this.machine = mach || "";
}

/*
七、 属性继承
*/

// 在构造器中的属性，如果运行时修改，则无法影响到继承者，因为继承者会创建一个本地值
function Employee() {
  this.name = "empty";
}
function WorkerBee() {
}
WorkerBee.prototype = new Employee;

var amy = new WorkerBee;
Employee.prototype.name = "Unknown"
console.log(amy.name); // empty

// 不在构造器中则可以
function Employee() {
}
Employee.prototype.name = "empty";
function WorkerBee() {
}
WorkerBee.prototype = new Employee;

var amy = new WorkerBee;
Employee.prototype.name = "Unknown"
console.log(amy.name); // Unknown