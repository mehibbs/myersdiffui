/**
 * Listener class for use with Observable.
 * // Seems import {} is bugged at the moment, otherwise would consider nesting this class in Observable.js
 */
export default class Listener {

    //{Function} _listenerFcn;
    //{Object} _scope;

    /**
     * Creates a new listener with the given function and optional scope.
     *
     * @param {Function} listenerFcn
     * @param {Object} [scope]
     */
    constructor(listenerFcn, scope) {
        this._listenerFcn = listenerFcn;
        this._scope = scope;
    }

    /**
     * Fires the listener with any arguments given.
     *
     * @param {*[]} eventArgs
     */
    fire(eventArgs) {
        this._listenerFcn.call(this._scope, ...eventArgs);
    }

}