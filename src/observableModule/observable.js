// -----------------------------------------------------------------------------
// observable is a factory that creates a new instance of observer pattern.
// It handles adding observers, running them and removing.
// Any service that would like to keep a list of observers of some kind, can
// easily use this object for handling common logic of keeping and controlling
// sets of callback (observers) functions.
// -----------------------------------------------------------------------------

class ObservableModel {
    constructor() {
        this._observers = [];
        this._amountOfObservers = 0;
        this._observersToRemove = [];
        this._amountToRemove = 0;
        this._stateObservers = [];
        this._isActive = false;
    }

    _createCancelFunction(observerToCancel, afterCancelCallback) {
        return () => {
            afterCancelCallback(observerToCancel);
            observerToCancel = null;
            afterCancelCallback = null;
        };
    }

    _afterCancel(observerToRemove) {
        this._amountToRemove = this._observersToRemove.push(
            observerToRemove
        );
    }

    _cleanRemovedObservers() {
        for (const observerToRemove of this._observersToRemove) {
            const indexOf = this._observers.indexOf(observerToRemove);
            if (indexOf !== -1) {
                this._observers.splice(indexOf, 1);
            }
        }

        this._amountOfObservers = this._observers.length;
        this._amountToRemove = 0;
        this._observersToRemove.length = 0;
        this._updateState(this._amountOfObservers > 0);
    }

    _updateState(newActiveState) {
        if (this._isActive === newActiveState) {
            return;
        }

        this._isActive = newActiveState;

        for (const stateObserver of this._stateObservers) {
            stateObserver(this._isActive);
        }
    }

    register(newObserver) {
        this._amountOfObservers = this._observers.push(newObserver);
        this._updateState(true);
        return this._createCancelFunction(
            newObserver,
            this._afterCancel.bind(this)
        );
    }

    notify(...args) {
        if (this._amountToRemove !== 0) {
            this._cleanRemovedObservers();
        }

        if (!this._isActive) {
            return;
        }

        if (this._amountOfObservers === 1) {
            this._observers[0].apply(null, args);
            return;
        }

        for (const observer of this._observers) {
            observer.apply(null, args);
        }
    }

    onStateChange(stateObserver) {
        return this._stateObservers.push(stateObserver);
    }
}

angular.module('observableModule').factory('Observable', () => {
    return ObservableModel;
});
