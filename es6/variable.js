/*
一、 基础
变量区分大小写
分号表示语句的结束，但如果一行只有一条语句分号可以省略，但最佳实践是每个语句都加分号
源码从左向右扫描，被转换成一系列由token、控制字符、行终止符、注释和空白字符组成的输入元素

二、 变量声明
var声明一个变量，如果在函数内则是局部变量，否则是全局变量
let声明一个块作用域内的局部变量
const声明一个块作用域内的只读常量

声明变量弱没有初始化，其值为`undefined`，它也可以用在if语句中代表false，如果用在数值环境中，会得到NaN
`var a; a+2;`的结果就是NaN

三、 变量提升
可以提前使用变量而不必声明被称为变量提升，好像变量声明被提升到前面的位置一样。
var会变量提升，let和const不会
所以函数中的var声明尽量在顶部，便于理解
*/

// 例一
console.log(x === undefined); // true
var x = 3;
// 相当于
var x;
console.log(x === undefined); // true
x = 3;

//例子2
var myvar = "my value";
(function() {
  console.log(myvar); // undefined
  var myvar = "local value";
})();
// 相当于
var myvar = "my value";
(function() {
  var myvar;
  console.log(myvar); // undefined
  myvar = "local value";
})();

/*
四、 全局变量
全局变量是全局对象的属性。对于网页来说，默认的全局对象是window，所以可以通过`window.abc`来设置和访问全局变量

五、 常量
常量是只读的，无法运行期修改，必须初始化为某个值，作用域规则和let相同
如果把对象、数组赋值给常量，则其不会被保护为只读
*/
