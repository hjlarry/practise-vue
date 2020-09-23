/*
一、 数据类型
一共8中数据类型，7种基础类型+对象类型，基础类型有:
Boolean，值为true或false
null，表名null值的特殊关键字
undefined，表示变量未定义的特殊关键字
Number，整数或浮点数，如42和3.14
BigInt，可以安全的存储和操作大整数
String，字符串，如"helloworld"
Symbol，一种实例唯一且数据不可改变的类型
*/

/*
二、 类型转换
由于动态类型语言，变量可以随时赋值任意类型
*/
// 数字和字符串的加法运算，数字会隐式转换为字符串做字符串运算
// 数字和字符串的其他运算，例如减法，字符串会被隐式转换为数字做数值运算
x = 'The answer is ' + 42 // "The answer is 42"
"37" - 7 // 30
"37" + 7 // "377"
// 字符串转数字还可以用 parseInt()和parseFloat()
parseInt('101', 2) // 5， 二进制

/*
三、 类型字面量
*/

// 数组字面量，数组中间的逗号会定义一个undefined的数组元素，而尾部的逗号会被忽略
var myList = ['home', , 'school',];

// 整数字面量可以有十进制、八进制、十六进制、二进制
var ia = -100;
var ib = 0xF3;
var ic = 0O17;
var id = 0b11;

// 浮点数字面量可以由一个可以带正负号的十进制整数、小数点、小数部分、指数部分组成
var fa = 3.14;
var fb = -.2345789 // -0.23456789
var fc = -3.12e+12  // -3.12*1012
var fd = .1e-23    // 0.1*10-23=10-24=1e-24

// 对象字面量
// 可以使用数字或字符串字面值作为属性的名字，或者在另一个字面值内嵌套上一个字面值
var car = { manyCars: { a: "Saab", "b": "Jeep" }, 7: "Mazda" };
console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda
var foo = { a: "alpha", 2: "two" };
console.log(foo.a);    // alpha
console.log(foo[2]);   // two
//console.log(foo.2);  // SyntaxError: missing ) after argument list
//console.log(foo[a]); // ReferenceError: a is not defined
console.log(foo["a"]); // alpha
console.log(foo["2"]); // two

// 正则字面量，被正斜杠围成的表达式
var re = /ab+c/;

// 字符串字面量，单引号双引号都可以
var sa = "John's cat";
// 可以直接用字面量调用字符串的方法，js会把字面量转化为一个临时的字符串对象
console.log("John's cat".length);
// 可以使用转义字符
var quote = "He read \"The Cremation of Sam McGee\" by R.W. Service.";

// 模板字面量
// 创建单行字符串
var sb = `In JavaScript '\n' is a line-feed.`
// 创建多行字符串
var sc = `In JavaScript this is
 not legal.`
// 字符串替换
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

/*
三、 索引集合
以索引进行排序的集合主要有数组Array，以及其他类似数组的数据结构，如TypedArray
数组类似于Py中的list，可以存储不同的对象，TypedArray类似于Py中的Array可存储二进制数据类型
*/

// 以下根据元素创建数组的语句等效
var arr = new Array(element0, element1, element2, elementN);
var arr = Array(element0, element1, element2, elementN);
var arr = [element0, element1, element2, elementN];

// 根据长度创建数组
var arr = new Array(arrayLength);
var arr = Array(arrayLength);
// 这样有同样的效果
var arr = [];
arr.length = arrayLength;

// Js实际上是将元素作为标准的对象属性来存储，把数组索引作为属性名
// 长度属性是特殊的，它总是返回最后一个元素的索引值加1
var cats = [];
cats[30] = ['Dusty'];
console.log(cats.length); // 31

var cats = ['Dusty', 'Misty', 'Twiggy'];
console.log(cats.length); // 3
cats.length = 2;
console.log(cats); // logs "Dusty,Misty" - Twiggy has been removed
cats.length = 0;
console.log(cats); // logs nothing; the cats array is empty
cats.length = 3;
console.log(cats); // [undefined, undefined, undefined]

// 数组遍历主要用两种方法
var colors = ['red', 'green', 'blue'];
for (var i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
var colors = ['red', 'green', 'blue'];
colors.forEach(function(color) {
  console.log(color);
});
// ES6的写法
let colors = ['red', 'green', 'blue']
colors.forEach(color => console.log(color))

/*
四、map和set
map是es6引入的，但object也可以设置键值对、根据键获取值、删除键、检测某键的存在，和map有什么区别呢？
1. object键都是Strings或Symbols类型，map键可以是任意类型
2. object的size需要手动计算，而map可以直接获取
3. map的遍历遵循插入的顺序
4. object创建时有原型，所以有一些默认的键
此外，ES6还加入了weakmap对象，以不影响GC
*/

var sayings = new Map();
sayings.set('dog', 'woof');
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
sayings.size; // 3
sayings.get('fox'); // undefined
sayings.has('bird'); // false
sayings.delete('dog');
sayings.has('dog'); // false
for (var [key, value] of sayings) { //遍历
  console.log(key + ' goes ' + value);
}
sayings.clear();
sayings.size; // 0


var mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("foo");
mySet.has(1); // true
mySet.delete("foo");
mySet.size; // 2
for (let item of mySet) console.log(item);
var a = Array.from(mySet); // 集合转列表
var b = new Set(a); // 列表转集合