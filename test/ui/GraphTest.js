import Chai from "chai";
import Sinon from "Sinon";
import Graph from "../../src/js/ui/Graph";

describe('GraphTest', function() {

    describe('Drawing a graph', function () {

        let lines = [];
        let currentLine = 0;
        let drawingLine = false;
        // Interfaces would be nice!
        let contextMock = {
            fillText: Sinon.stub(),
            beginPath: function() {
                if (drawingLine) throw new Error('Unexpected beginPath() call');
                drawingLine = true;
            },
            moveTo: function(x, y) {
                if (!drawingLine) throw new Error('Unexpected moveTo() call (no beginPath())');
                lines[currentLine] = { start: { x: x, y: y } };
            },
            lineTo: function(x, y) {
                if (!lines[currentLine]) throw new Error('Unexpected moveTo() call (no moveTo())');
                lines[currentLine].end = { x: x, y: y };
            },
            stroke: function() {
                if (!lines[currentLine].end) throw new Error('Unexpected stroke() call (no lineTo())'); // Will also undefined error if other unexpected call
                currentLine++;
                drawingLine = false;
            }
        };
        let graph = new Graph();
        Sinon.stub(graph, 'getContext', function() {
            return contextMock;
        });

        it('Should draw the correct lines for a given x/y', function () {


        });

    });

});