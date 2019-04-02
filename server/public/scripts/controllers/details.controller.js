myApp.controller('DetailsController', ['DataFactory', 'AuthUserFactory', '$location', '$firebaseAuth', function(DataFactory, AuthUserFactory, $location, $firebaseAuth) {

console.log('Details controller running');
const self = this;

self.recipeDetails = DataFactory.details;

self.saveRecipe = function(recipe) {
  // console.log('recipe to save:', recipe);
  let saveInfo = {
    title: recipe.title,
    imageURL: recipe.image_url,
    recipeID: recipe.recipe_id,
    sourceURL: recipe.source_url,
    ingredients: recipe.ingredients
  };
  // console.log(saveInfo);
  AuthUserFactory.saveRecipe(saveInfo);
}



}]);


//Sample Response for API call
// Request: http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken
