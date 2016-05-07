import Observable from "../util/Observable";

/**
 * Abstract Component Class.
 * All UI components should inherit from here to get default behaviours.
 */
export default class AbstractComponent extends Observable {

    //{HTMLElement} renderTo

    /**
     * Creates an instance of this UI Component.
     *
     * @param {Object} config
     *     @config {HTMLElement} [renderTo=document.body] The place to render in the document
     *     @config {Object} [listeners] eventName / listener combination
     */
    constructor(config) {
        super();
        config = config || {};

        this.renderTo = config.renderTo || document.body;
        this._attachListeners(config.listeners);
    }

    _attachListeners(listeners) {
        if (listeners) {
            Object.keys(listeners).forEach(function(key) {
                this.addListener(key, listeners[key]);
            }, this);
        }
    }

    /**
     * Renders this component to this.renderTo.
     *
     * @abstract
     */
    render() {
        throw new Error('Extending class should implement #render');
    }

    /**
     * Turns the given HTML string into an element.
     * Assumes single root element within the HTML string.
     *
     * @param {String} html
     * @return {HTMLElement}
     */
    getHTMLStringAsElement(html) {
        //.insertAdjacentHTML('beforeend', html) is a neat trick, but it unfortunately doesn't return the created element
        let tempEl = document.createElement('div');
        tempEl.innerHTML = html;

        return tempEl.firstChild;
    }

}