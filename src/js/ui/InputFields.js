import AbstractComponent from "./AbstractComponent";
import _ from "Lodash";

const TEMPLATE = '<div class="inputFields">' +
                    '<label>Source: <input type="text" class="sourceInput" placeholder="Enter source"/></label>' +
                    '<label>Destination: <input type="text" class="destInput" placeholder="Enter destination"/></label>' +
                    '<button class="btn btn-primary drawBtn">Draw</button>' +
                    '<button class="btn btn-success solveBtn" disabled>Solve</button>' +
                    '<button class="btn btn-info stepBtn" disabled>Step</button>' +
                 '</div>';

/**
 * Represents the Input fields for on screen entering
 * of the source/desintation.
 */
export default class InputFields extends AbstractComponent {

    //EVENTS:
    // 'drawClicked' ( {String} sourceText, {String} destinationText )
    // 'solveClicked'
    // 'stepClicked'

    //{HTMLElement} _renderedEl

    /**
     * @see AbstractComponent#render
     */
    render() {
        this._renderedEl = this.getHTMLStringAsElement(TEMPLATE);
        this.renderTo.appendChild(this._renderedEl);
        this._attachDomEvents();
    }

    setSolveButtonEnabled(enabled) {
        var solveButton = this._renderedEl.querySelector('.solveBtn');
        solveButton.disabled = !enabled;
    }

    setStepButtonEnabled(enabled) {
        var stepButton = this._renderedEl.querySelector('.stepBtn');
        stepButton.disabled = !enabled;
    }

    _attachDomEvents() {
        let el = this._renderedEl;
        var drawButton = el.querySelector('.drawBtn');
        var solveButton = el.querySelector('.solveBtn');
        var stepButton = el.querySelector('.stepBtn');
        var sourceInput = el.querySelector('.sourceInput');
        var destInput = el.querySelector('.destInput');

        drawButton.addEventListener('click', _.bind(function() {
            if (sourceInput.value && destInput.value) {
                this.fireEvent('drawClicked', sourceInput.value, destInput.value);
            } else {
                alert('Please enter values for source/destination');
            }
        }, this));

        solveButton.addEventListener('click', _.bind(function() {
            this.fireEvent('solveClicked');
        }, this));

        stepButton.addEventListener('click', _.bind(function() {
            this.fireEvent('stepClicked');
        }, this));
    }

}