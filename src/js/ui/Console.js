import AbstractComponent from "./AbstractComponent";

const TEMPLATE = '<div class="console" style="font-family: Courier, monospace">' + // TODO - Move to CSS
                 '</div>';

export default class Console extends AbstractComponent {

    /**
     * @see AbstractComponent#render
     */
    render() {
        this.renderTo.insertAdjacentHTML('beforeend', TEMPLATE);
        this._renderedEl = this.renderTo.lastElementChild;
    }

    /**
     * Logs the given text to our "console".
     *
     * @param {String} text
     */
    addText(text) {
        this._renderedEl.appendChild(document.createTextNode(text));
        this._renderedEl.appendChild(document.createElement('br'));
    }

}