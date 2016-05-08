import AbstractComponent from "./AbstractComponent";
import Point from "../model/Point";

const GRID_COLOUR = '#000';
const K_LINE_STYLE = '#ccc';
const BRIDGE_STYLE = '#cc00cc';
const SNAKE_STYLE = '#ff3300';
const SNAKE_WIDTH =  3;
const K_LINE_NUMBER_FONT = '10px Courier';
const COMPARE_TEXT_FONT = '20px Courier bold';


/**
 * Edit Graph UI class.
 */
export default class EditGraph extends AbstractComponent {

    //{HTMLCanvas} canvas;
    //{Number} width;
    //{Number} height;
    //{Number} cellSize;

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
     * Draws an edit graph based on the given source/destination text.
     *
     * @param {String} source
     * @param {String} dest
     */
    drawGraph(source, dest) {
        this.clear();

        let x = source.length + 1;
        let y = dest.length + 1;
        this._setDimensions((x + 3) * this.cellSize, (y + 3) * this.cellSize);
        this._drawSourceText(source);
        this._drawDestText(dest);
        this._drawXLines(x, y);
        this._drawYLines(y, x);
        this._drawKLines(x, y);
        this._drawBridges(source, dest);
    }

    /**
     * Draws a link from the given coordinates to the given coordinates.
     *
     * @param {Point} fromPoint
     * @param {Point} toPoint
     */
    drawLink(fromPoint, toPoint) {
        this.getContext().lineWidth = SNAKE_WIDTH; // reset?
        this._drawLineFromPoints(fromPoint, toPoint, SNAKE_STYLE);
    }

    _setDimensions(width, height) {
        this.width = width;
        this.height = height;

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
    }

    /**
     * Given point coordinates in the graph, e.g. (0, 1), will
     * return the position on screen where the point is represented.
     *
     * @param {Point} point
     * @return {Object} Containing x and y
     */
    _getPointPosition(point) {
        var position = {};
        position.x = this.cellSize * (point.xCoord + 1);
        position.y = this.cellSize * (point.yCoord + 1);

        return position;
    }

    _drawLineFromPoints(fromPoint, toPoint, colour) {
        let context = this.getContext();
        context.strokeStyle = colour;
        context.beginPath();
        let position = this._getPointPosition(fromPoint);
        context.moveTo(position.x, position.y);
        position = this._getPointPosition(toPoint);
        context.lineTo(position.x, position.y);
        context.stroke();
    }

    _drawBridges(source, dest) {
        // Compare every character, where they match draw a diagonal bridge on the graph
        [...source].forEach(function(sourceChar, sourceIndex) {
           [...dest].forEach(function(destChar, destIndex) {
                if (sourceChar === destChar) {

                    let startPoint = new Point(sourceIndex, destIndex);
                    let endPoint = new Point(sourceIndex + 1, destIndex + 1);
                    this._drawLineFromPoints(startPoint, endPoint, BRIDGE_STYLE);

                }
            }, this);
        }, this);
    }

    // Could combine drawX/Y/Source/Destination though it's a bit less readable if you do

    _drawSourceText(text) {
        let context = this.getContext();
        context.font = COMPARE_TEXT_FONT;

        let yPos = this.cellSize - 25;
        let xPos;
        let textSize;
        for (let i = 0; i < text.length; i++) {
            textSize = context.measureText(text.charAt(i));
            xPos = (this.cellSize * (i + 2)) - Math.round(textSize.width / 2);
            context.fillText(text.charAt(i), xPos, yPos);
        }
    }

    _drawDestText(text) {
        let context = this.getContext();
        context.font = COMPARE_TEXT_FONT;

        let xPos = this.cellSize - 25;
        let yPos;
        let textSize;
        for (let i = 0; i < text.length; i++) {
            textSize = context.measureText(text.charAt(i));
            // TextMetrics has no text height, so this is a little naive but is close enough
            yPos = (this.cellSize * (i + 2)) + Math.round(textSize.width / 2);
            context.fillText(text.charAt(i), xPos, yPos);
        }
    }


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

        context.strokeStyle = K_LINE_STYLE;
        context.fillStyle = K_LINE_STYLE;
        context.font = K_LINE_NUMBER_FONT;
        context.globalAlpha = 0.5;

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

        context.globalAlpha = 1;
    }

}