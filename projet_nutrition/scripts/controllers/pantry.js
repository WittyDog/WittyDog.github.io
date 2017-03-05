
angular.module('nutritionApp')
.controller('PantryController', function ($scope,foodManager) {

	$scope.foods = foodManager.foods;

	// Retourne le nombre de calories de l'ensemble des aliments du garde manger
	$scope.caloriesTotal = function() {
		return foodManager.getCaloriesTotal();
	}

	// Retourne le quantité de graisses saturées de l'ensemble des aliments du garde manger
	$scope.saturatedFatTotal = function() {
		return foodManager.getSaturatedFatTotal();
	}

	// Retourne le quantité de sodium de l'ensemble des aliments du garde manger
	$scope.saltTotal = function() {
		return foodManager.getSaltTotal();
	}

	// Retire un aliment du garde manger
	$scope.removeFromPantry = function(id) {
		foodManager.removeFood(id);
	}

	// Incrémente la quantité d'un aliment du garde manger
	$scope.increaseQuantity = function(id) {
		foodManager.increaseFoodQuantity(id);
	}

	// Décrémente la quantité d'un aliment du garde manger
	$scope.decreaseQuantity = function(id) {
		foodManager.decreaseFoodQuantity(id);
	}

});
