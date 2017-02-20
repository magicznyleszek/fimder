describe('viewsCtrl', () => {
    let viewsCtrl = null;
    let $rootScope = null;

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testApp');
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

    it('should show movies view when route is movies', () => {
        viewsCtrl._currentRoute.setToMovies('123');
        resolvePromises();
        expect(viewsCtrl.isMoviesViewVisible).toBeTruthy();
    });
});
