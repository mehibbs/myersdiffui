import AbstractComponent from "./AbstractComponent";
import Graph from "./EditGraph";
import InputFields from "./InputFields";
import Console from "./Console";
import Listener from "../util/Listener";

export default class Viewport extends AbstractComponent {

    //EVENTS:
    //  'drawClicked' ( {String} source, {String} destination );
    //  'solveClicked'
    //  'stepClicked'

    //{Console} console;
    //{EditGraph} graph;

    /**
     * @see AbstractComponent#constructor
     */
    constructor(config) {
        super(config);

        this.graph = new Graph({ renderTo: this.renderTo });

        this.inputFields = new InputFields({
            renderTo: this.renderTo,
            listeners: {
                'drawClicked': new Listener(function(source, destination) {
                    this.graph.drawGraph(source, destination);
                    this.fireEvent('drawClicked', source, destination);
                }, this),
                'solveClicked': new Listener(function() {
                    this.fireEvent('solveClicked');
                }, this),
                'stepClicked': new Listener(function() {
                    this.fireEvent('stepClicked');
                }, this)
            }
        });

        this.console = new Console({ renderTo: this.renderTo });
    }

    /**
     * @override AbstractComponent#render
     */
    render() {
        this.graph.render();
        this.inputFields.render();
        this.console.render();
    }

    /**
     * Enables/disables the solution (solve/step) buttons.
     *
     * @param {Boolean} enabled
     */
    setSolutionButtonsEnabled(enabled) {
        this.inputFields.setSolveButtonEnabled(enabled);
        this.inputFields.setStepButtonEnabled(enabled);
    }

    /**
     * Renders a path from/to the points.
     *
     * @param {Point} fromPoint
     * @param {Point} toPoint
     */
    renderPath(fromPoint, toPoint) {
        this.graph.drawLink(fromPoint, toPoint);
    }

}