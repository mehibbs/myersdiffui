import AbstractComponent from "./AbstractComponent";

export default class Console extends AbstractComponent {

    // TODO - Implement

    /**
     * @see AbstractComponent#render
     */
    render() {
        var consoleDiv = document.createElement('div');
        consoleDiv.className = 'console';

        this.renderTo.appendChild(consoleDiv);
    }

}