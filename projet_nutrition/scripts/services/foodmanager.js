
angular.module('nutritionApp')
.service('foodManager', function () {

    // Liste des aliments
    this.foods = {};


    // Ajoute un aliment à la liste 
    this.addFood = function( id, data ){
        if ( this.foods[id] == undefined )
            this.foods[id] = {
                name: data.item_name,
                calories: data.nf_calories.toFixed(2),
                fat: data.nf_saturated_fat.toFixed(2),
                salt: data.nf_sodium.toFixed(2),
                quantity: 1
            };
    }

    // Retire un aliment de la liste
    this.removeFood = function(id) {
        if ( this.foods[id] != undefined )
            delete this.foods[id];
    }

    // Incrémente la quantité d'un élément de la liste
    this.increaseFoodQuantity = function(id) {
        if ( this.foods[id] != undefined )
            this.foods[id].quantity++;
    }

    // Décrémente la quantité d'un élément de la liste
    this.decreaseFoodQuantity = function(id) {
        if ( this.foods[id] != undefined && this.foods[id].quantity > 1)
            this.foods[id].quantity--;
    }

    // Retourne le nombre total de calories de l'ensemble des aliments de la liste
    this.getCaloriesTotal = function() {
        var total = 0;

        $.each(this.foods, function(index, data) {
            total += data.calories * data.quantity;
        }); 

        return total.toFixed(2);
    }

    // Retourne le quantité totale de graisses saturées de l'ensemble des aliments de la liste
    this.getSaturatedFatTotal = function() {
        var total = 0;

        $.each(this.foods, function(index, data) {
            total += data.fat * data.quantity;
        }); 

        return total.toFixed(2);
    }

    // Retourne le quantité totale de sodium de l'ensemble des aliments de la liste
    this.getSaltTotal = function() {
        var total = 0;

        $.each(this.foods, function(index, data) {
            total += data.salt * data.quantity;
        }); 

        return total.toFixed(2);
    }

});
