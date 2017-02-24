describe('Observable', () => {
    let Observable = null;

    beforeEach(() => {
        module('testAppModule');
        module('observableModule');
        inject(($injector) => {
            Observable = $injector.get('Observable');
        });
    });

    it('should add observers', () => {
        const observable = new Observable();
        const testPrint = () => {
            console.log('dupa');
        };
        observable.register(testPrint);
        expect(observable._amountOfObservers).toBe(1);
    });

    it('should call all the observers', () => {
        const observable = new Observable();

        let wasFooCalled = false;
        const foo = () => {
            wasFooCalled = true;
        };

        let wasBarCalled = false;
        const bar = () => {
            wasBarCalled = true;
        };

        observable.register(foo);
        observable.register(bar);
        observable.notify();

        expect(wasFooCalled).toBe(true);
        expect(wasBarCalled).toBe(true);
    });

    it('should remove observers and never call them again', () => {
        const observable = new Observable();

        let wasFooCalled = false;
        const foo = () => {
            wasFooCalled = true;
        };
        let cancelFooObserver = angular.noop;

        cancelFooObserver = observable.register(foo);
        cancelFooObserver();

        observable.notify();

        expect(observable._amountOfObservers).toBe(0);
        expect(wasFooCalled).toBe(false);
    });

    it('should notify whenever activity changes', () => {
        const observable = new Observable();
        const expectedStateChanges = 2;

        let activityChangeCount = 0;
        const stateChangeCallback = () => {
            activityChangeCount += 1;
        };

        observable.onStateChange(stateChangeCallback);

        // adding observer triggers state change
        const testPrint = angular.noop;
        const cancelTestPrintObserver = observable.register(testPrint);

        cancelTestPrintObserver();

        // notify triggers cleanRemovedObservers and thus state change
        observable.notify();

        expect(activityChangeCount).toBe(expectedStateChanges);
    });
});
