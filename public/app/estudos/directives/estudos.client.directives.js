/**
 * Created by Vittorio on 06/06/2016.
 */
angular.module('estudos')
    .directive('barraBtns', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-btns.html'
        }
    })
    .directive('partConfig', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-configs.html'
        }
    })
    .directive('partTabelaProdutos', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-tabela-produtos.html'
        }
    })
    .directive('partIboxLucro', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-box-lucro.html'
        }
    })
    .directive('partIboxCntr', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-box-cntr.html'
        }
    })
    .directive('partIboxComparacao', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-box-comparacao.html'
        }
    })
    .directive('partIboxResultados', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-tabela-resultados.html'
        }
    })
    .directive('partIboxDespesas', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-box-despesas.html'
        }
    })
    .directive('partIboxEstudo', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-box-estudo.html'
        }
    })
    .directive('partMyModal', function () {
        return {
            templateUrl: 'app/estudos/views/partials_pratica/part-my-modal.html'
        }
    });