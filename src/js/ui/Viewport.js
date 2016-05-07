import AbstractComponent from "./AbstractComponent";
import Graph from "./EditGraph";
import InputFields from "./InputFields";
import Console from "./Console";
import Listener from "../util/Listener";

export default class Viewport extends AbstractComponent {

    //EVENTS:
    //  'diffTextChanged' ( {String} source, {String} destination );

    //{Console} console;
    //{EditGraph} graph;

    /**
     * @see AbstractComponent#constructor
     */
    constructor(config) {
        super(config);

        // TODO - Move to AbstractComponent#addChildComponent
        this.graph = new Graph({ renderTo: this.renderTo });
        this.inputFields = new InputFields({
            renderTo: this.renderTo,
            listeners: {
                'drawClicked': new Listener(function(source, destination) {
                    this.graph.drawGraph(source, destination);
                    this.fireEvent('diffTextChanged', source, destination);
                }, this)
            }
        });
        this.console = new Console({ renderTo: this.renderTo });

        // TODO - Testing only
        window.graph = this.graph;
    }

    /**
     * @override AbstractComponent#render
     */
    render() {
        this.graph.render();
        this.inputFields.render();
        this.console.render();
    }

}