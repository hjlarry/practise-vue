/*
一、 条件判断语句
有两种，if...else 和 switch
条件语句中这些都被视为false: false undefined null 0 NaN ""
*/

/*
二、 异常
throw exception;语句用来抛出异常，尽管可以抛出任意对象，但通常是两种类型 ECMAScript exceptions， DOMException or DOMError
try...catch...finally 用来捕获异常，和大多数语言并无不同
*/

// Create an object type UserException
function UserException(message) {
  this.message = message;
  this.name = "UserException";
}

// Make the exception convert to a pretty string when used as
// a string (e.g. by the error console)
UserException.prototype.toString = function() {
  return this.name + ': "' + this.message + '"';
}

// Create an instance of the object type and throw it
throw new UserException("Value too high");


function f() {
  try {
    console.log(0);
    throw "bogus";
  } catch (e) {
    console.log(1);
    return true; // this return statement is suspended until finally block has completed
    console.log(2); // not reachable
  } finally {
    console.log(3);
    return false; // overwrites the previous "return"
    console.log(4); // not reachable
  }
  // "return false" is executed now  
  console.log(5); // not reachable
}
f(); // console 0, 1, 3; returns false

/*
三、 循环
for、 while、 do...while和C中的差不多，可以有label作用于break、continue中
*/

var num = 0;
for (var i = 0; i < 10; i++) {   // i 循环
  for (var j = 0; j < 10; j++) { // j 循环
    if (i == 5 && j == 5) {
      break; // i = 5，j = 5 时，会跳出 j 循环
    } // 但 i 循环会继续执行，等于跳出之后又继续执行更多次 j 循环
    num++;
  }
}
alert(num); // 输出 95

var num = 0;
outPoint:
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outPoint; // 在i=5，j=5时，跳出所有循环，返回到整个outPoint下方，继续执行
    }
    num++;
  }
}
alert(num); // 输出 55

// for...in 返回一个对象的所有可枚举的属性
// for...of 语句在可迭代对象（包括Array、Map、Set、arguments 等等）上创建了一个循环，对值的每一个独特属性调用一次迭代
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
  console.log(i); // 输出 "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); // 输出 "3", "5", "7"
}
