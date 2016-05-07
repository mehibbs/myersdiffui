/**
 * Observable, ideally would be a mixin (or interface with default functions).
 */
export default class Observable {

    //{Object} __listeners;

    constructor() {
        this.__listeners = {};
    }

    /**
     * Adds a listener for the given event name.
     *
     * @param {String} eventName
     * @param {Listener} listener
     */
    addListener(eventName, listener) {
        if (!this.hasListeners(eventName)) {
            this.__listeners[eventName] = [];
        }
        this.__listeners[eventName].push(listener);
    }

    /**
     * Fires the given event.
     *
     * @param {String} eventName
     * @param {*} eventArgs
     */
    fireEvent(eventName, ...eventArgs) {
        if (this.hasListeners(eventName)) {
            this.__listeners[eventName].forEach(listener => listener.fire(eventArgs));
        }
    }

    /**
     * Checks whether there are any listeners for the given event name.
     *
     * @param {String} eventName
     * @returns {boolean}
     */
    hasListeners(eventName) {
        return !!this.__listeners[eventName];
    }

}