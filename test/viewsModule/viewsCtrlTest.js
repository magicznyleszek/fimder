describe('viewsCtrl', () => {
    let viewsCtrl = null;
    let $rootScope = null;

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testAppModule');
        module('routesModule');
        module('viewsModule');
        inject(($injector, $controller) => {
            viewsCtrl = $controller('viewsCtrl', {
                currentRoute: $injector.get('currentRoute'),
                routesConfig: $injector.get('routesConfig')
            });
            $rootScope = $injector.get('$rootScope');
        });
    });

    it('should show search view when route is search', () => {
        viewsCtrl._currentRoute.setToSearch('test');
        resolvePromises();
        expect(viewsCtrl.isSearchViewVisible).toBeTruthy();
    });

    it('should show movie view when route is movie', () => {
        viewsCtrl._currentRoute.setToMovie('123');
        resolvePromises();
        expect(viewsCtrl.isMovieViewVisible).toBeTruthy();
    });
});
