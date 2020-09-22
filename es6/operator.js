/*
一、 赋值运算符
除了最简单的`=`，还有`+=` `*=`等一系列复合赋值运算符
此外，可以解构赋值
*/
var foo = ["one", "two", "three"];
// 不使用解构
var one = foo[0];
var two = foo[1];
var three = foo[2];
// 使用解构
var [one, two, three] = foo;

/*
二、 比较运算符
多数情况下，如果比较的两个操作数是不同类型，js会尝试转换它们至恰当的类型再比较，但===和!==不会转换其类型
==  !=  ===  !==  >  >=  <  <=
*/

/*
三、 算术运算符
+  -  *  /  %  ++  --  -  +  **
其中，自增、自减和C一样支持放在变量的前缀或后缀
一元负值(-)和减号意思不同，返回操作数的负值
一元正值(+)，如操作数之前不是number，则试图将其转换为number
*/
var x = 3;
console.log(-x); //-3
console.log(+'3'); // 3
console.log('3'); // '3'
console.log(+true); // 1

/*
四、 位运算符
&  |  ^  ~  <<  >>  >>>
会把操作数视为32位的二进制串来进行位运算
如果操作数转换后多于32位，则取低的32位
~将所有的32位取反，然后其最左边的一位如果为1则表示负数，所以`~x`相当于`-x-1`
>>> 是无符号右移，将操作数右移x位，右边移出去的位丢弃，左边空的位用0补齐
*/

/*
五、 逻辑运算符
&&  ||  !
js是具备短路求值的，即false && anything 不会去运行anything而直接返回false
*/

/*
六、 特殊运算符
delete   typeof   void
*/

// delete 可删除一个对象，或一个对象的属性，或一个数组中的某个键值
x = 42;
var y = 43;
myobj = new Number();
myobj.h = 4;    // create property h
delete x;       // returns true (can delete if declared implicitly)
delete y;       // returns false (cannot delete if declared with var)
delete Math.PI; // returns false (cannot delete predefined properties)
delete myobj.h; // returns true (can delete user-defined properties)
delete myobj;   // returns true (can delete if declared implicitly)
// 删除数组元素，则该元素为undefined，但如果进行判断是不行的
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
delete trees[3];
if (3 in trees) {
  console.log("不会被执行");
}
// 但如果直接赋值为undefined，则会执行
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
trees[3] = undefined;
if (3 in trees) {
  console.log("会被执行");
}

// typeof(operand)，()是可选的
var myFun = new Function("5 + 2");
var shape = "round";
var size = 1;
var today = new Date();
typeof myFun;     // returns "function"
typeof shape;     // returns "string"
typeof size;      // returns "number"
typeof today;     // returns "object"
typeof dontExist; // returns "undefined"
typeof true; // returns "boolean"
typeof null; // returns "object"
typeof 62;            // returns "number"
typeof 'Hello world'; // returns "string"
typeof blur;        // returns "function"
typeof eval;        // returns "function"
typeof parseInt;    // returns "function"
typeof shape.split; // returns "function"
typeof Date;     // returns "function"
typeof Function; // returns "function"
typeof Math;     // returns "object"
typeof Option;   // returns "function"
typeof String;   // returns "function"

// void (expression), ()是可选的，表明运算没有返回值
<a href="javascript:void(0)">Click here to do nothing</a>

/*
七、 关系运算符
in   instanceof
*/
// Arrays
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees;        // returns true
3 in trees;        // returns true
6 in trees;        // returns false
"bay" in trees;    // returns false (必须是索引号，而不能用于数组中的值)
"length" in trees; // returns true (length is an Array property)

// Predefined objects
"PI" in Math;          // returns true
var myString = new String("coral");
"length" in myString;  // returns true

// Custom objects
var mycar = { make: "Honda", model: "Accord", year: 1998 };
"make" in mycar;  // returns true
"model" in mycar; // returns true


var theDay = new Date(1995, 12, 17);
if (theDay instanceof Date) {
  // statements to execute
}