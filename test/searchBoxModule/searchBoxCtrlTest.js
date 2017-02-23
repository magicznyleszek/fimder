describe('searchBoxCtrl', () => {
    let searchBoxCtrl = null;
    let $rootScope = null;
    const mockEl = angular.element('<div><input js-searchBox-input></div>');

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testApp');
        module('routesModule');
        module('searchBoxModule');
        inject(($injector, $controller) => {
            $rootScope = $injector.get('$rootScope');
            searchBoxCtrl = $controller('searchBoxCtrl', {
                $scope: $rootScope.$new(),
                $element: mockEl,
                currentRoute: $injector.get('currentRoute'),
                routesConfig: $injector.get('routesConfig')
            });
        });
    });

    it('should apply route parameter on initialization', () => {
        const someSearchParam = 'salem';
        searchBoxCtrl._currentRoute.setToSearch(someSearchParam);
        resolvePromises();
        expect(searchBoxCtrl.inputValue).toBe(someSearchParam);
    });

    it('should clear input value on clear call', () => {
        searchBoxCtrl.inputValue = 'test';
        searchBoxCtrl.clear();
        expect(searchBoxCtrl.inputValue).toBe('');
    });

    it('should apply input value on ENTER key', () => {
        // set initial search param value
        const firstSearchParam = 'salem';
        searchBoxCtrl._currentRoute.setToSearch(firstSearchParam);
        resolvePromises();

        // change input and mimick ENTER key
        const secondSearchParam = 'jesus';
        searchBoxCtrl.inputValue = secondSearchParam;
        searchBoxCtrl.onInputKeypress({which: 13});

        resolvePromises();
        const currentRoute = searchBoxCtrl._currentRoute.get();

        expect(currentRoute.params.searchPhrase).toBe(secondSearchParam);
    });
});
