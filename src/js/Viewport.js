import MyersDiffUI from "./ui/MyersDiff";

var viewport = document.createElement('div');
document.body.appendChild(viewport);

var myersDiffUI = new MyersDiffUI(viewport);
myersDiffUI.render();