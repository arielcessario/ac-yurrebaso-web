(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('myApp', [
      'ngRoute',
      'myApp.version'
    ]).
    config(['$routeProvider', function($routeProvider) {
      //$routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .controller('MainCtrl', MainCtrl)
    .factory('MainService', MainService);

    MainCtrl.$inject = ['$scope', '$interval', 'MainService'];
    MainService.$inject = ['$http'];

    /**
     *
     * @param $scope
     * @constructor
     */
    function MainCtrl($scope, $interval, MainService) {
        var vm = this;

        //Declaración e inicialización de variables
        vm.message = '';
        vm.mail = '';
        vm.name = '';
        vm.subject = '';
        vm.comment = '';
        vm.slide = 1;

        //Declaración de Funciones
        vm.callAtTimeout = callAtTimeout;
        vm.goToMenu = goToMenu;
        vm.goToService = goToService;
        vm.goToFacility = goToFacility;
        vm.goToContact = goToContact;
        vm.goToAboutMe = goToAboutMe;
        vm.goToInfo = goToInfo;
        vm.sendMail = sendMail;

        //========================Funciones=========================
        $interval(callAtTimeout, 5000);

        /**
         * Llamada para el slider
         */
        function callAtTimeout(){
            vm.slide = (vm.slide == 4)? 1 : vm.slide + 1;
        }

        /**
         * Vuelve al menú
         */
        function goToMenu() {

        }

        /**
         * Manda a la sección Servicios
         */
        function goToService() {

        }

        /**
         *
         */
        function goToFacility() {

        }

        /**
         *
         */
        function goToContact() {

        }

        /**
         *
         */
        function goToAboutMe() {

        }

        /**
         *
         */
        function goToInfo() {

        }

        /**
         * Envia el mail con la consulta
         */
        function sendMail() {
            console.log(vm.mail);
            if(vm.mail.trim().length > 0 && vm.name.trim().length > 0 && vm.subject.trim().length > 0 && vm.comment.trim().length > 0) {
                if(validateEmail(vm.mail.trim())) {
                    MainService.sendMail(vm.email.trim(), vm.name.trim(), vm.subject.trim(), vm.comment.trim(), function(success) {
                        if(success == "true") {
                            cleanContactControl();
                            vm.message = 'Su consulta fue enviada';
                        }
                        else {
                            vm.message = 'Ocurrio un problema enviando el mail';
                        }
                    });
                }
                else {
                    vm.message = 'El mail ingresado no tiene el formato correcto. Por favor ingrese un mail valido.';
                }
            }
            else {
                vm.message = 'Por favor complete todos los campos para poder enviar el mail.';
            }
        }

        //================================FUNCIONES PRIVADAS==================================
        /**
         *
         */
        function cleanContactControl() {
            vm.mail = '';
            vm.name = '';
            vm.subject = '';
            vm.comment = '';
        }

        /**
         * Valida si el mail ingresado es valido.
         * @param email
         * @returns {boolean}
         */
        function validateEmail(email)
        {
            var re = /\S+@\S+\.\S+/;
            return re.test(email)
        }
    }

    function MainService($http) {
        //Variables
        var service = {};

        //Function declarations
        service.sendMail = sendMail;

        return service;

        function sendMail(mail, name, subject, comment, callback) {
            return $http.post('contact.php',
                {
                    'email': mail,
                    'nombre': name,
                    'mensaje': comment,
                    'asunto': subject
                })
                .success(function (data) {
                    callback(data);
                })
                .error()
        }
    }

})();
