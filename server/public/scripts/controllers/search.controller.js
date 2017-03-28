myApp.controller('SearchController', ['DataFactory', 'AuthUserFactory', '$location', '$firebaseAuth', function(DataFactory, AuthUserFactory, $location, $firebaseAuth) {

console.log('Search controller running');
var self = this;

self.errorMessage = '';
// self.placeholder = DataFactory.holder;

self.search = {};
self.returnedRecipes = DataFactory.results;
if (self.returnedRecipes.list.length === 0) {
  self.errorMessage = 'Please check your search spelling or try changing the criteria if you want more results.'
}

self.recipeDetails = DataFactory.details;

self.findRecipes = function (searchCriteria){
  // console.log('controller side log:', searchCriteria);
   DataFactory.findRecipes(searchCriteria);
   $location.path('/search').replace();
}

self.moreDetails = function(recipeID) {
  // console.log('ID of recipe selected:', recipeID);
  DataFactory.moreDetails(recipeID);
  $location.path('/details').replace();
}

self.saveRecipe = function(recipe) {
  // console.log('recipe to save:', recipe);
  var saveInfo = {
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
