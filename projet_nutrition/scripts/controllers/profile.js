
angular.module('nutritionApp')
.controller('ProfileController', function ($scope,foodManager) {

	// Initialisation des variables du profil utilisateur
	$scope.gender = "male";
	$scope.age = "20";

	/**
	 * Retourne vrai si le nombre total de calories du garde manger de l'utilisateur
	 * dépasse l'apport journalier idéal défini par son profil
	 */
	$scope.isExceedingDailyRecommendedCalorieIntake = function() {
		return ($scope.remainingCalories() < 0) ? true : false;
	}

	/**
	 * Retourne vrai si la quantité totale de sodium du garde manger de l'utilisateur
	 * dépasse l'apport journalier préconisé par l'OMS
	 */
	$scope.isExceedingDailyRecommendedSodiumIntake = function() {
		return (foodManager.getSaltTotal() > 5) ? true : false;
	}

	/**
	 * Retourne le nombre de calories restantes avant que le garde manger de l'utilisateur
	 * dépasse l'apport journalier idéal défini par son profil
	 * Retourne un nombre négatif si le seuil est dépassé
	 */
	$scope.remainingCalories = function() {

		// Récupération de la valeur calorifique du garde manger
		var calories = foodManager.getCaloriesTotal();

		// Variable stockant les calories restantes
		var remainingCalories = 0;

		// Calculs en fonction du sexe
		if($scope.gender == "male") {

			/**
			 * Calculs en fonction de l'age. Selon l'OMS : 
			 * -> Personne agée : + 60ans
			 * -> Adulte : entre 19 et 60 ans
			 * -> Adolescent : entre 10 et 19 ans
			 * -> Enfant : moins de 10 ans
			 */

			if ($scope.age >= 60)
				remainingCalories = 2000 - calories;
			else if ($scope.age >= 19)
				remainingCalories = 2800 - calories;
			else if ($scope.age >= 10)
				remainingCalories = 2900 - calories;
			else
				remainingCalories = 1600 - calories;
		}
		else {

			if ($scope.age >= 60)
				remainingCalories = 1800 - calories;
			else if ($scope.age >= 19)
				remainingCalories = 2200 - calories;
			else if ($scope.age >= 10)
				remainingCalories = 2400 - calories;
			else
				remainingCalories = 1600 - calories;
		}

		// Valeur arrondie au centième
		return remainingCalories.toFixed(2);
	}

});
