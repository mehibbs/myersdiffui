import AbstractComponent from "./AbstractComponent";

const GRID_COLOUR = '#000';
const K_LINE_COLOUR = '#ccc';

export default class Graph extends AbstractComponent {

    //canvas;
    //width;
    //height;
    //cellSize;

    /**
     * @override AbstractComponent#render
     *
     * @param {Number} [cellSize=50]
     */
    render(cellSize) {
        this.cellSize = cellSize || 50;
        this.canvas = document.createElement('canvas');

        this.renderTo.appendChild(this.canvas);
    }

    /**
     * Fetch the canvas rendering context.
     *
     * @returns {CanvasRenderingContext2D}
     */
    getContext() {
        // Allows unit testing of the drawing maths
        return this.canvas.getContext('2d');
    }

    /**
     * Clears the currently rendered graph.
     */
    clear() {
        this.getContext().clearRect(0, 0, this.width, this.height);
    }

    /**
     * Draws a "graph" with the specified number of x/y points.
     *
     * @param x X points on graph
     * @param y Y points on graph
     */
    drawGraph(x, y) {
        this._setDimensions((x + 3) * this.cellSize, (y + 3) * this.cellSize);
        this._drawXLines(x, y);
        this._drawYLines(y, x);
        this._drawKLines(x, y);
    }

    _setDimensions(width, height) {
        this.width = width;
        this.height = height;

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
    }

    // Could combine drawX/Y but it's much more readable like this
    _drawXLines(x, count) {
        let startX = this.cellSize;
        let endX = this.cellSize * x;
        let currentY = 0;
        let context = this.getContext();
        context.strokeStyle = GRID_COLOUR;
        for (let i = 0; i < count; i++) {
            context.beginPath();
            currentY += this.cellSize;
            context.moveTo(startX, currentY);
            context.lineTo(endX, currentY);
            context.stroke();
        }
    }

    _drawYLines(y, count) {
        let startY = this.cellSize;
        let endY = this.cellSize * y;
        let currentX = 0;
        let context = this.getContext();
        context.strokeStyle = GRID_COLOUR;
        for (let i = 0; i < count; i++) {
            context.beginPath();
            currentX += this.cellSize;
            context.moveTo(currentX, startY);
            context.lineTo(currentX, endY);
            context.stroke();
        }
    }

    _drawKLines(x, y) {
        let context = this.getContext();

        const maxX = (x + 1) * this.cellSize;
        const maxY = (y + 1) * this.cellSize;

        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        let k = 0;
        let lineEnd;

        context.strokeStyle = K_LINE_COLOUR;
        context.font = '10px Courier';
        context.fillStyle = K_LINE_COLOUR;

        for (let i = 0; i < (x + y - 3); i++) {
            context.beginPath();
            context.moveTo(startX, startY);
            endX = startX;
            endY = startY;

            lineEnd = Math.min(maxX - endX, maxY - endY);
            endX += lineEnd;
            endY += lineEnd;

            context.lineTo(endX, endY);
            context.stroke();
            context.fillText(k.toString(), endX + (k < 0 ? 0 : 10), endY + 10);

            if (i === y - 2) {
                startY = 0;
                k = 0;
            }

            if (i < y - 2) {
                startY += this.cellSize;
                k--;
            } else {
                k++;
                startX += this.cellSize;
            }
        }
    }

}