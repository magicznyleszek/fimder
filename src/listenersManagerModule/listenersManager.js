// -----------------------------------------------------------------------------
// listenersManager is a factory that creates new instance of listeners manager.
// A listener manager object is an implementation of logic pattern that manages
// list of listeners. It handles adding listeners, running them and removing.
// Any service that would like to keep list of listeners of some kind, can
// easily use this object for handling common logic of keeping and controlling
// sets of callback (listeners) functions.
// -----------------------------------------------------------------------------

class ListenerManager {
    constructor() {
        this._listeners = [];
        this._amountOfListeners = 0;
        this._listenersToRemove = [];
        this._amountToRemove = 0;
        this._stateListeners = [];
        this._isActive = false;
    }

    _createCancelFunction(listenerToCancel, afterCancelCallback) {
        return () => {
            afterCancelCallback(listenerToCancel);
            listenerToCancel = null;
            afterCancelCallback = null;
        };
    }

    _afterCancel(listenerToRemove) {
        this._amountToRemove = this._listenersToRemove.push(
            listenerToRemove
        );
    }

    _cleanRemovedListeners() {
        for (const listenerToRemove of this._listenersToRemove) {
            const indexOf = this._listeners.indexOf(listenerToRemove);
            if (indexOf !== -1) {
                this._listeners.splice(indexOf, 1);
            }
        }

        this._amountOfListeners = this._listeners.length;
        this._amountToRemove = 0;
        this._listenersToRemove.length = 0;
        this._updateState(this._amountOfListeners > 0);
    }

    _updateState(newActiveState) {
        if (this._isActive === newActiveState) {
            return;
        }

        this._isActive = newActiveState;

        for (const stateListener of this._stateListeners) {
            stateListener(this._isActive);
        }
    }

    addListener(newListener) {
        this._amountOfListeners = this._listeners.push(newListener);
        this._updateState(true);
        return this._createCancelFunction(
            newListener,
            this._afterCancel.bind(this)
        );
    }

    callListeners(...args) {
        if (this._amountToRemove !== 0) {
            this._cleanRemovedListeners();
        }

        if (!this._isActive) {
            return;
        }

        if (this._amountOfListeners === 1) {
            this._listeners[0].apply(null, args);
            return;
        }

        for (const listener of this._listeners) {
            listener.apply(null, args);
        }
    }

    onStateChange(stateListener) {
        return this._stateListeners.push(stateListener);
    }
}

angular.module('listenersManagerModule').factory('listenersManager', () => {
    return {
        getManager() {
            return new ListenerManager();
        }
    }
});
