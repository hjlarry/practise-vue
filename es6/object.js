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

