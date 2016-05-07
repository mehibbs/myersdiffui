import MyersDiffUI from "./ui/Viewport";
import MyersAlgorithm from "./algorithm/Myers";
import Listener from "./util/Listener";

var myersDiffUI = new MyersDiffUI();
myersDiffUI.render();

myersDiffUI.addListener('diffTextChanged', new Listener(function(source, destination) {
    // TODO - Run through algorithm
}, this));

var myersAlgorithm = new MyersAlgorithm();

