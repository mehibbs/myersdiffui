import Point from "../model/Point";

/**
 * Class representing the Myers LCS algorithm.
 * http://www.xmailserver.org/diff2.pdf
 */
export default class Myers {

    //{String} source;
    //{String} dest;
    //{Number[]} kLinePoints;
    //{Function} pathTraceFn;
    //{Function} logFn;

    //{Number} _currentStep;

    /**
     * Creates an instance of Myers algorithm, ready to run on the given texts.
     *
     * @param {Object} config
     *     @config {String} source
     *     @config {String} dest
     *     @config {Function} pathTraceFn Should accept ({Point} from, {Point} to)
     *     @config {Function} logFn Should accept ({String} text)
     */
    constructor(config) {
        this.source = config.source;
        this.dest = config.dest;
        this.pathTraceFn = config.pathTraceFn;
        this.logFn = config.logFn;
        // Array storing current (furthest) x coords on k-lines (k-line is index into array)
        // And y = x - k so any Point can be calculated
        // Initialize for the starting Point (0, -1) "differences = 0" (i.e. x = 0 on k = 1 -> y = 0 - 1) so the first path can be calculated
        this.kLinePoints = [];
        this.kLinePoints[1] = 0;
        this._currentStep = 0;
    }

    /**
     * Executes Myers diff in one go, calling back to the path tracing function for every move found.
     */
    solve() {
        // "differences" is the total number of differences (+/-) to get source -> dest, the maximum moves possible would be
        // the total of the two lengths (i.e. completely different) hence this loop, we're checking how far we can get
        // with each additional move, when we hit the bottom right a path has been found and the loop is broken.
        // A diagonal move is "free" as it is not a difference.
        for (let differences = this._currentStep ; differences <= this.source.length + this.dest.length; differences++ ) {

            this._currentStep = differences;
            if (this._seekMove(differences)) {
                return;
            }

        }
    }

    /**
     * Executes Myers diff one step at a time.
     *
     * @return {Boolean} If a solution has been reached
     */
    step() {
        return this._seekMove(this._currentStep++);
    }

    /**
     * For the given total number of differences looks for the best possible moves
     * (based on the furthest points reached for differences - 1).
     *
     * @return {Boolean} True if solution found
     */
    _seekMove(forTotalDifferences) {
        // For any given total number of differences the only k-lines that can be reached with a single move down/right
        // (or "snake" - a move including diagonals) is -differences up to +differences - this is easier to see on the EditGraph.
        // Also if you're on an odd k-line you can only reach even k-lines (and vice-versa) hence the += 2
        // (and for any even/odd number of differences you will be on an even/odd k-line respectively)
        this.logFn(`Scanning ${forTotalDifferences % 2 === 0 ? 'even' : 'odd'} k-lines from [${-forTotalDifferences}] to [${forTotalDifferences}]`);
        for (let currentK = -forTotalDifferences ; currentK <= forTotalDifferences ; currentK += 2 ) {

            // Now we need to decide whether we need to move down or to the right to reach the given k-line "k"
            let down;
            if (currentK === -forTotalDifferences) {
                // At the lower extreme the only possible move is downwards
                down = true;
            } else if (currentK == forTotalDifferences) {
                // At the upper extreme the only possible move is right
                down = false;
            } else {
                // Else choose the direction which gets us to the furthest point by checking the x value of the
                // k-lines above and below, if the one above is furthest we will move downwards from there
                // (else we'll be moving right from the one below)
                down = this.kLinePoints[currentK - 1] < this.kLinePoints[currentK + 1];
            }

            let movingFrom = down ? currentK + 1 : currentK - 1;

            // Get starting Point
            let xStart = this.kLinePoints[movingFrom];
            let yStart = xStart - movingFrom;  // because y = x - k

            // End Point after down or right move
            let xEnd = down ? xStart : xStart + 1;
            let yEnd = xEnd - currentK;

            // Callback with move
            this.pathTraceFn(new Point(xStart, yStart), new Point(xEnd, yEnd));

            // Now follow any diagonals
            let xDiagonalEnd = xEnd;
            let yDiagonalEnd = yEnd;
            while ( xEnd < this.source.length && yEnd < this.dest.length && this.source.charAt(xEnd) === this.dest.charAt(yEnd) ) {
                // Diagonal found (i.e. matching char at this point) move end point diagonally and callback with path move
                xDiagonalEnd++;
                yDiagonalEnd++;
                this.pathTraceFn(new Point(xEnd, yEnd), new Point(xDiagonalEnd, yDiagonalEnd));
                // Move "start" along in-case of more diagonal moves
                xEnd = xDiagonalEnd;
                yEnd = yDiagonalEnd;
            }

            // Store new furthest end point on this k-line, note we are not interfering with our calculations in subsequent
            // loops because we're only checking odd or even for any given difference total
            this.kLinePoints[ currentK ] = xEnd;

            // Check whether we've found a solution
            if (xEnd >= this.source.length && yEnd >= this.dest.length) {
                return true;
            }
        }
    }

}