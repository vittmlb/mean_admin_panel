/**
 * Created by Vittorio on 30/05/2016.
 */

var mainAppModuleName = 'admin_panel';
var mainAppModule = angular.module('admin_panel', [
    'ngResource',
    'ngRoute',
    'produtos',
    'despesas',
    'estudos',
    'despesas',
    'ncms',
    'fornecedores',
    'paises',
    'estados',
    'cidades',
    'contatos',
    'categorias',
    'toaster',
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ngFileUpload',
    'oitozero.ngSweetAlert'
]);
//todo: Ver se dá pra tirar o ui.router daí.

mainAppModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

if(window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainAppModuleName]);
});

