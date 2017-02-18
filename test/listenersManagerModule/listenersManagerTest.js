describe('listenersManager', () => {
    let listenersManager = null;

    beforeEach(() => {
        module('testApp');
        module('listenersManagerModule');
        inject(($injector) => {
            listenersManager = $injector.get('listenersManager');
        });
    });

    it('should add listeners', () => {
        const mngr = listenersManager.getManager();
        const testPrint = () => {
            console.log('dupa');
        };
        mngr.addListener(testPrint);
        expect(mngr._amountOfListeners).toBe(1);
    });

    it('should call all the listeners', () => {
        const mngr = listenersManager.getManager();

        let wasFooCalled = false;
        const foo = () => {
            wasFooCalled = true;
        };

        let wasBarCalled = false;
        const bar = () => {
            wasBarCalled = true;
        };

        mngr.addListener(foo);
        mngr.addListener(bar);
        mngr.callListeners();

        expect(wasFooCalled).toBe(true);
        expect(wasBarCalled).toBe(true);
    });

    it('should remove listeners and never call them again', () => {
        const mngr = listenersManager.getManager();

        let wasFooCalled = false;
        const foo = () => {
            wasFooCalled = true;
        };
        let cancelFooListener = angular.noop;

        cancelFooListener = mngr.addListener(foo);
        cancelFooListener();

        mngr.callListeners();

        expect(mngr._amountOfListeners).toBe(0);
        expect(wasFooCalled).toBe(false);
    });

    it('should notify whenever activity changes', () => {
        const mngr = listenersManager.getManager();
        const expectedStateChanges = 2;

        let activityChangeCount = 0;
        const stateChangeCallback = () => {
            activityChangeCount += 1;
        };

        mngr.onStateChange(stateChangeCallback);

        // adding listener triggers state change
        const testPrint = angular.noop;
        const cancelTestPrintListener = mngr.addListener(testPrint);

        cancelTestPrintListener();

        // callListeners triggers cleanRemovedListeners and thus state change
        mngr.callListeners();

        expect(activityChangeCount).toBe(expectedStateChanges);
    });
});
