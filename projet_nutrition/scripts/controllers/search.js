
angular.module('nutritionApp')
.controller('SearchController', function ($scope,$http,foodManager) {

	// Initialisation de la valeur du filtre sur le seuil de calories max
	$scope.filter_calories = 100;

	/**
	 * Observe les changements d'états de plusieurs élements :
	 * -> la barre de recherche : ajout ou suppresion d'un caractère
	 * -> la checkbox permettant l'activation du filtre
	 * -> La zone de saisie de la valeur du filtre
	 */
    $scope.$watchGroup(['input','filter','filter_calories'], function() {

    	// Si la barre de recherche n'est pas vide, on lance une recherche
    	if($scope.input)
    		search();
    	else
    		$scope.results = {};
    	
    });

    // Recherche les aliments en fonction des termes saisis dans la barre de recherche
    function search() {

    	// Url à laquelle est envoyée la requête
    	var $url = "https://api.nutritionix.com/v1_1/search";

    	// Création d'un objet vide pour les filtres éventuels
    	var filters = {}

    	// Si le filtre est activé par l'utilisateur, on prend en compte sa valeur
    	if($scope.filter) {
	    	filters.nf_calories = {
				lt: $scope.filter_calories
			}
		}

		// Objet de la requête envoyé à l'API nutrionix
    	var $data = {
  			appId	: "f79c74ae",
  			appKey	: "bc00918aedfe38738a714251ba84736e",  
  			query	: $scope.input,
  			fields	: ["item_name","nf_calories","nf_saturated_fat","nf_sodium"],
  			filters : filters
		}

		// Requête Ajax questionnant l'API
		$http({
			method	: 'POST',
			url		: $url,
			data	: $data
		}).then( function(response) {

			// Mise à jour des résultats de recherche
			$scope.results = response.data.hits;
		});
	}

	// Ajoute un aliment présent dans les résultats de recherche dans le garde manger
	$scope.addToPantry = function(id,data) {
		foodManager.addFood(id,data);
	}

});
