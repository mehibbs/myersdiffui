import Chai from "chai";
import Sinon from "Sinon";
import _ from "lodash";
import Graph from "../../src/js/ui/EditGraph";

var assert = Chai.assert;

describe('GraphTest', function() {

    describe('Drawing a graph', function () {

        // --ContextMock--
        let lines = [];
        let currentLine = 0;
        let drawingLine = false;
        let contextMock = { // Interfaces would be nice!
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
        graph.render();
        Sinon.stub(graph, 'getContext', function() {
            return contextMock;
        });

        let assertDrawnLines = function(message, expectedLines) {
            assert.equal(message, expectedLines.length, lines.length);
            // TODO - Search the array then uses deepEqual assert, remove the line from the array
            // Given that the order in which the lines are produced does not affect the layout
        };

        afterEach(function() {
            lines.length = 0;
        });

        it('Should draw the correct lines for a given x == y', function () {
            graph.drawGraph(3, 3);
            var expectedLines = [
                { start: { x: 50, y: 50 }, end: { x: 150, y: 50 } },
                { start: { x: 50, y: 101 }, end: { x: 150, y: 100 } },
                { start: { x: 50, y: 150 }, end: { x: 150, y: 150 } },
                { start: { x: 50, y: 50 }, end: { x: 50, y: 150 } },
                { start: { x: 100, y: 50 }, end: { x: 100, y: 150 } },
                { start: { x: 150, y: 50 }, end: { x: 150, y: 150 } },
                { start: { x: 0, y: 0 }, end: { x: 200, y: 200 } },
                { start: { x: 0, y: 50 }, end: { x: 150, y: 200 } },
                { start: { x: 50, y: 0 }, end: { x: 200, y: 150 } }
            ];

            assertDrawnLines('3 x 3 (9) graph lines', expectedLines)
        });

        it('Should draw the correct lines for a given x > y', function () {

        });

        it('Should draw the correct lines for a given x < y', function () {

        });

    });

});