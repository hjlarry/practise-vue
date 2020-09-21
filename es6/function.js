/*
一、 函数声明
js中的函数总是值传递，即使参数是一个数组或者对象，在函数内改变它也会影响函数外
在同一作用域内，可以先调用再声明，这说明函数的声明可以被提升
*/
function myFunc(theObject) {
  theObject.make = "Toyota";
}
var mycar = { make: "Honda", model: "Accord", year: 1998 };
var x, y;
x = mycar.make;     // x获取的值为 "Honda"
myFunc(mycar);
y = mycar.make;     // y获取的值为 "Toyota"

/*
二、函数表达式
除了普通的函数声明方式，还可以使用函数表达式来创建函数
const square = function(number) { return number * number; };
var x = square(4); // x gets the value 16
*/
function map(f, a) {
  let result = []; // 创建一个数组
  let i; // 声明一个值，用来循环
  for (i = 0; i != a.length; i++)
    result[i] = f(a[i]);
  return result;
}
const f = function(x) {
  return x * x * x;
}
let numbers = [0, 1, 2, 5, 10];
let cube = map(f, numbers);
console.log(cube);

// 还可以根据条件来定义一个函数
var myFunc;
if (num == 0) {
  myFunc = function(theObject) {
    theObject.make = "Toyota"
  }
}

/*
三、 闭包
js支持闭包以及多层嵌套的函数
*/
var getCode = (function() {
  var secureCode = "0]Eal(eh&2";    // A code we do not want outsiders to be able to modify...
  return function() {
    return secureCode;
  };
})();
getCode();    // Returns the secret code


/*
四、参数
支持通过自带的arguments对象获取到参数，arguments.length存储了参数的长度
ES6之后支持默认参数、剩余参数(类似于py中的星号收集)
*/
function test(a, b = 6) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(b);
}
test(33); // 33, undefined, 6
test(44, 55); // 44, 55, 55

function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]


/*
五、箭头函数
一般两种情况需要引入箭头函数，一种是为了更简洁，另一种是因为this
*/
// 更简洁的情况
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium"
];
var a2 = a.map(function(s) { return s.length });
console.log(a2); // logs [ 8, 6, 7, 9 ]
var a3 = a.map(s => s.length);
console.log(a3); // logs [ 8, 6, 7, 9 ]

// 每个函数在非严格模式下会定义自己的this，严格模式下this是未定义的
function Person() {
  // 构造函数Person()将`this`定义为自身
  this.age = 0;
  setInterval(function growUp() {
    // 在非严格模式下，growUp()函数将`this`定义为“全局对象”，这与Person()定义的`this`不同，
    this.age++;
  }, 1000);
}
var p = new Person();

// ES6之前，我们把this赋值给其他变量来解决
function Person() {
  var self = this; // 有的人习惯用`that`而不是`self`，
  self.age = 0;
  setInterval(function growUp() {
    self.age++;
  }, 1000);
}

// ES6之后，我们使用箭头函数
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++; // 这里的`this`正确地指向person对象
  }, 1000);
}
var p = new Person();

/*
六、内置函数
有如下内置函数:
eval()
isFinite()
isNaN()
parseFloat()
parseInt()
decodeURI()
decodeURIComponent()
encodeURI()
encodeURIComponent()
escape()和unescape() 已经被废弃
*/