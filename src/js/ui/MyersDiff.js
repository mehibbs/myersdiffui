import AbstractComponent from "./AbstractComponent";
import Console from "./Console";
import Graph from "./Graph";

export default class MyersDiff extends AbstractComponent {

    /**
     * @see AbstractComponent#constructor
     */
    constructor(config) {
        super(config);

        this.console = new Console(this.renderTo);
        this.graph = new Graph(this.renderTo);

        // TODO - Testing only
        window.graph = this.graph;
    }

    /**
     * @override AbstractComponent#render
     */
    render() {
        this.graph.render();
        this.console.render();
    }

}