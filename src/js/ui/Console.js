import AbstractComponent from "./AbstractComponent";

const TEMPLATE = '<div class="console">' +
                     '<div class="panel panel-info">' +
                         '<div class="panel-heading">' +
                         '<h3 class="panel-title">Console</h3>' +
                     '</div>' +
                     '<div class="panel-body"/>' +
                 '</div>';

/**
 * Represents the on screen "console" for information
 * about the running algorithm.
 */
export default class Console extends AbstractComponent {

    //{HTMLElement} _consoleEl

    /**
     * @see AbstractComponent#render
     */
    render() {
        this.renderTo.insertAdjacentHTML('beforeend', TEMPLATE);
        this._consoleEl = this.renderTo.lastElementChild.querySelector('.panel-body');
    }

    /**
     * Logs the given text to our "console".
     *
     * @param {String} text
     */
    addText(text) {
        this._consoleEl.appendChild(document.createTextNode(text));
        this._consoleEl.appendChild(document.createElement('br'));
        this._consoleEl.scrollTop = this._consoleEl.scrollHeight;
    }

    /**
     * Clears the console.
     */
    clear() {
        this._consoleEl.innerHTML = '';
    }

}