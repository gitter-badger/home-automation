requirejs.config({
    baseUrl: "js",
    paths : {
        // Major libraries
        jquery: '../bower_components/jquery/dist/jquery',
        // backbone
        underscore: '../bower_components/lodash/dist/lodash.underscore',
        backbone: '../bower_components/backbone/backbone',
        // advanced libs
        'jquery-ui': 'libs/vendor/jquery-ui-1.10.4.custom',
        alpaca: 'libs/alpaca/alpaca-full',
        // react
        react: '../bower_components/react/react-with-addons',
        morearty: '../bower_components/moreartyjs/dist/morearty',
        immutable: '../bower_components/immutable/dist/Immutable',
        director: '../bower_components/director/build/director',
        // ace
        ace: '../bower_components/ace-builds/src/ace',
        'theme-chrome': '../bower_components/ace-builds/src/theme-chrome',
        'mode-javascript': '../bower_components/ace-builds/src/mode-javascript',
        'mode-json': '../bower_components/ace-builds/src/mode-json',
        'worker-javascript': '../bower_components/ace-builds/src/worker-javascript',
        // require
        text: '../bower_components/requirejs-text/text',
        // templates
        templates: '../templates',
        // temp
        sticky: 'libs/home-automation/sticky'
    },
    map: {
        '*': {
            'lodash': 'underscore',
            'Backbone': 'backbone'
        }
    },
    shim : {
        jquery : {
            exports : '$'
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        cookie : {
            deps: ['jquery'],
            exports : '$.cookie'
        },
        dragsort : {
            deps: ['jquery'],
            exports : '$.dragsort'
        },
        magicsuggest: {
            deps: ['jquery'],
            exports: '$.magicsuggest'
        },
        drags: {
            deps: ['jquery'],
            exports: '$.drags'
        },
        underscore : {
            exports : '_'
        },
        backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },
        sticky: {
            exports: 'Sticky'
        },
        ace: {
            deps : ['jquery']
        },
        'mode-javascript': {
            deps : ['ace']
        },
        'mode-json': {
            deps : ['ace']
        },
        'theme-chrome': {
            deps : ['ace']
        },
        'worker-javascript': {
            deps : ['ace']
        },
        alpaca: {
            deps: ['jquery', 'ace', 'mode-javascript', 'mode-json', 'jquery-ui', 'theme-chrome', 'worker-javascript']
        },
        'colpick': {
            deps: ['jquery']
        },
        react: {
            exports: 'React'
        },
        director: {
            exports: 'Router'
        },
        immutable: {
            exports: 'Immutable'
        },
        morearty: {
            exports: 'Morearty',
            deps: ['immutable', 'react']
        }
    },
    // modules
    packages: [
        {
            name: 'Preferences',
            location: 'modules/preferences'//,
        },
        {
            name: 'Notifications',
            location: 'modules/notifications'//,
        },
        {
            name: 'ServerSync',
            location: 'modules/serversync'//,
        },
        {
            name: 'App',
            location: 'modules/core'
        },
        {
            name: 'Widgets',
            location: 'modules/widgets'
        },
        {
            name: 'CommonMixins',
            location: 'mixins/common'
        }
    ]
});

require([
    // libraries
    'react',
    'immutable',
    'director',
    'sticky',
    // helpers
    'helpers/js',
    // contexts
    'state/default',
    'state/preferences',
    'state/services',
    'state/data'
], function (
    // libraries
    React,
    Immutable,
    Director,
    Sticky,
    // helpers
    HelpersJS,
    // bindings
    defaultBinding,
    preferencesBinding,
    servicesBinding,
    dataBinding
    ) {
    'use strict';

    window.React = React;
    window.Immutable = Immutable;

    require(['morearty'], function (Morearty) {
        var Ctx = Morearty.createContext({
            default: defaultBinding,
            preferences: preferencesBinding,
            services: servicesBinding,
            data: dataBinding
        }, {
            requestAnimationFrameEnabled: true
        });

        // reg module in global namespace
        Sticky.set('App.Helpers.JS', HelpersJS, Ctx, {});

        require(['./bootstrap'], function (Bootstrap) {
            // render bootstrap
            React.renderComponent(
                Bootstrap({ctx: Ctx}),
                document.getElementById('app-container')
            );
        });

    });
});