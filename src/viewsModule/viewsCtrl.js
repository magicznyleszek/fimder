// -----------------------------------------------------------------------------
// viewsCtrl -- manages displaying different views depending on route
// -----------------------------------------------------------------------------

class ViewsController {
    static initClass() {
        ViewsController.$inject = [
            'currentRoute',
            'routesConfig'
        ];
    }

    constructor(
        currentRoute,
        routesConfig
    ) {
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this.isSearchViewVisible = false;
        this.isMoviesViewVisible = false;
        this._currentRoute.registerRouteChangeListener(
            this._onRouteChange.bind(this)
        );
    }

    _onRouteChange() {
        const route = this._currentRoute.get();
        this._hideAllViews();
        switch (route.routeId) {
            case this._routesConfig.routes.search:
                this.isSearchViewVisible = true;
                break;
            case this._routesConfig.routes.movies:
                this.isMoviesViewVisible = true;
                break;
            default:
                console.error(`Unknown route: ${route.routeId}`);
        }
    }

    _hideAllViews() {
        this.isSearchViewVisible = false;
        this.isMoviesViewVisible = false;
    }
}

ViewsController.initClass();

angular.module('viewsModule').controller('viewsCtrl', ViewsController);
