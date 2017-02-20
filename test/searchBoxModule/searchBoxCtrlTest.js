describe('searchBoxCtrl', () => {
    let searchBoxCtrl = null;
    const mockEl = angular.element('<div><input js-searchBox-input></div>');

    beforeEach(() => {
        module('testApp');
        module('routesModule');
        module('searchBoxModule');
        inject(($injector, $controller, $rootScope) => {
            searchBoxCtrl = $controller('searchBoxCtrl', {
                $scope: $rootScope.$new(),
                $element: mockEl,
                $timeout: $injector.get('$timeout'),
                currentRoute: $injector.get('currentRoute'),
                routesConfig: $injector.get('routesConfig')
            });
        });
    });

    it('should clear input value on clear call', () => {
        searchBoxCtrl.inputValue = 'test';
        searchBoxCtrl.clear();
        expect(searchBoxCtrl.inputValue).toBe('');
    });
});
