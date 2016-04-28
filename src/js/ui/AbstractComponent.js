export default class AbstractComponent {

    //renderTo

    /**
     * Creates an instance of this UI Component.
     *
     * @param {Object} config
     *     @config {HTMLElement} [renderTo=document.body] The place to render in the document
     */
    constructor(config) {
        config = config || {};

        this.renderTo = config.renderTo || document.body;
    }

    /**
     * Renders this component to this.renderTo.
     */
    render() {
        throw new Error('Missing render() implementation');
    }

}