describe('searchBoxCtrl', () => {
    let searchBoxCtrl = null;
    const mockEl = angular.element('<div><input js-searchBox-input></div>');

    beforeEach(() => {
        module('testApp');
        module('addressBarModule');
        module('searchBoxModule');
        inject(($injector, $controller, $rootScope) => {
            searchBoxCtrl = $controller('searchBoxCtrl', {
                $scope: $rootScope.$new(),
                $element: mockEl,
                $timeout: $injector.get('$timeout'),
                currentRoute: $injector.get('currentRoute'),
                addressBarConfig: $injector.get('addressBarConfig')
            });
        });
    });

    it('should clear input value on clear call', () => {
        searchBoxCtrl.inputValue = 'test';
        searchBoxCtrl.clear();
        expect(searchBoxCtrl.inputValue).toBe('');
    });
});
