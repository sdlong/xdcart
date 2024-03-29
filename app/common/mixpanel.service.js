'use strict';

var apiKey = "40023b9e8ba94a250120b01011d39bd1";

angular.module('analytics.mixpanel')

    .config([
        '$mixpanelProvider', 
        function($mixpanelProvider) {

        $mixpanelProvider.apiKey(apiKey);
    }]);

angular.module('Mixpanel', ['analytics.mixpanel'])

    .service('Mixpanel', [
        '$rootScope', '$mixpanel', 
        function ($rootScope, $mixpanel) {

        this.trackRegister = function () {
            mixpanel.track("user.register");
            console.log('mixpanel: register');
        };
        
        this.trackLogin = function (identify, peopleInfo) {
            $mixpanel.identify(identify);
            $mixpanel.people.set(peopleInfo);
            console.log('mixpanel: user set');

            $mixpanel.track("user.login", { 'identify': identify });
            console.log('mixpanel: user login');
        };

        this.trackLogout = function () {

            $mixpanel.track("user.logout");
            console.log('mixpanel: user logout');

            // $mixpanel did not provide this feature yet. Using the global mixpanel directly.
            mixpanel.cookie.clear();
            console.log('mixpanel: mixpanel cookie  cleared');
            console.log(apiKey);
            $mixpanel.init(apiKey);
        };

        this.trackNeedLogin = function () {
            $mixpanel.track("user.needLogin");
            console.log('mixpanel: user need login');
        };

        this.trackCartItemAdd = function (itemInfo) {
            $mixpanel.track("cart.item.add", itemInfo);
            console.log('mixpanel: add item into the cart');
        };

        this.trackCartItemIncrease = function (itemInfo) {
            $mixpanel.track("cart.item.increase", itemInfo);
            console.log('mixpanel: in-cart-item increased');
        };

        this.trackCartItemDecrease = function (itemInfo) {
            $mixpanel.track("cart.item.decrease", itemInfo);
            console.log('mixpanel: in-cart-item decreased');
        };

        this.trackCartItemRemove = function (itemInfo) {
            $mixpanel.track("cart.item.remove", itemInfo);
            console.log('mixpanel: in-cart-item removed');
        };

        this.trackCheckout = function () {
            $mixpanel.track("cart.checkout");
            console.log('mixpanel: begin checkout');
        };

        this.trackPaidSuccess = function () {
            $mixpanel.track("order.paid");
            console.log('mixpanel: order has paid');
        };

        this.trackPaidFailed = function (failedInfo) {
            $mixpanel.track("order.failed", failedInfo);
            console.log('mixpanel: order paying failed');
        };

    }])

    ;
