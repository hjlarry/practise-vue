import { create, createReportList } from './modules/canvas.js';
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';
import randomSquare from './modules/square.js';

let myCanvas = create('myCanvas', document.body, 480, 320);
let reportList = createReportList(myCanvas.id);

let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

// Use the default
let square2 = randomSquare(myCanvas.ctx);

/*
一、 默认导入导出
每个模块只允许有一个默认导出，如square.js中的
export default randomSquare;
也可以让它变成匿名的:
export default function(ctx) {
  ...
}
匿名的函数导入时就可以这样写:
import {default as randomSquare} from './modules/square.js';


二、 导入和导出都是可以重命名的
export {
  function1 as newFunctionName,
  function2 as anotherNewFunctionName
};

import { function1 as newFunctionName,
         function2 as anotherNewFunctionName } from '/modules/module.js';


三、 模块可以作为一个对象，使导入更简洁
import * as Module from '/modules/module.js';
调用时:
Module.function1()
Module.function2()


四、 动态加载模块
比如说有个按钮点击后才需要加载某个模块去绘制图形:
let squareBtn = document.querySelector('.square');
squareBtn.addEventListener('click', () => {
  import('/js-examples/modules/dynamic-module-imports/modules/square.js').then((Module) => {
    let square1 = new Module.Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, 'blue');
    square1.draw();
    square1.reportArea();
    square1.reportPerimeter();
  })
});
*/