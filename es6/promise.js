/*
一、 promise概念
promise本质上是一个函数返回的对象，我们可以在这个对象上绑定回调函数，这样就不需要一开始就把回调函数传入了
*/

// 传统写法
// 成功的回调函数
function successCallback(result) {
  console.log("音频文件创建成功: " + result);
}
// 失败的回调函数
function failureCallback(error) {
  console.log("音频文件创建失败: " + error);
}
createAudioFileAsync(audioSettings, successCallback, failureCallback)

// 使用promise
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);


// 多重异步操作，回调地狱
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

// 使用Promise链解决
doSomething().then(function(result) {
  return doSomethingElse(result);
}).then(function(newResult) {
  return doThirdThing(newResult);
}).then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
}).catch(failureCallback); // .catch(failureCallback)相当于 .then(null, failureCallback);

// 也可以用箭头函数简写为
doSomething().then(result => doSomethingElse(result))
  .then(newResult => doThirdThing(newResult))
  .then(finalResult => {
    console.log(`Got the final result: ${finalResult}`);
  }).catch(failureCallback);
