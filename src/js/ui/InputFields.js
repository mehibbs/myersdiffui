import AbstractComponent from "./AbstractComponent";
import _ from "Lodash";

const TEMPLATE = '<div class="inputFields">' +
                    '<label>Source: <input type="text" class="sourceInput" placeholder="Enter source"/></label>' +
                    '<label>Destination: <input type="text" class="destInput" placeholder="Enter destination"/></label>' +
                    '<button class="btn btn-primary drawBtn">Draw</button>' +
                 '</div>';

/**
 * Represents the Input fields for on screen entering
 * of the source/desintation.
 */
export default class InputFields extends AbstractComponent {

    //EVENTS:
    // 'drawClicked' ( {String} sourceText, {String} destinationText )

    //{HTMLElement} _renderedEl

    /**
     * @see AbstractComponent#render
     */
    render() {
        this._renderedEl = this.getHTMLStringAsElement(TEMPLATE);
        this.renderTo.appendChild(this._renderedEl);
        this._attachDomEvents();
    }

    _attachDomEvents() {
        let el = this._renderedEl;
        var drawButton = el.querySelector('.drawBtn');
        var sourceInput = el.querySelector('.sourceInput');
        var destInput = el.querySelector('.destInput');
        drawButton.addEventListener('click', _.bind(function() {
            if (sourceInput.value && destInput.value) {
                this.fireEvent('drawClicked', sourceInput.value, destInput.value);
            } else {
                alert('Please enter values for source/destination');
            }
        }, this));
    }

}