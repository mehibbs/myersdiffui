import MyersDiffUI from "./ui/Viewport";
import MyersAlgorithm from "./algorithm/Myers";
import Listener from "./util/Listener";

let myersDiffUI = new MyersDiffUI();
myersDiffUI.render();

let myersAlgorithm;

myersDiffUI.addListener('drawClicked', new Listener(function(source, destination) {
    myersAlgorithm = new MyersAlgorithm(source, destination, function(fromPoint, toPoint) {
        myersDiffUI.renderPath(fromPoint, toPoint);
    });
    // Ready to solve/step, enable the buttons
    myersDiffUI.setSolutionButtonsEnabled(true);
}, this));

myersDiffUI.addListener('solveClicked', new Listener(function() {
    myersAlgorithm.solve();
    myersDiffUI.setSolutionButtonsEnabled(false);
}, this));

myersDiffUI.addListener('stepClicked', new Listener(function() {
    if (myersAlgorithm.step()) {
        // Solution has been found, disable the buttons
        myersDiffUI.setSolutionButtonsEnabled(false);
    }
}, this));
