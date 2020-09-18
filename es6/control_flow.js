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