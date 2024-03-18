import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchViews.js";
import resultsView from "./views/ResultView.js";
import paginationView from "./views/paginationView.js";

async function controlRecipes() {
  try {
    let id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error.message);
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView._getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    const resultados = model.getSearchResultsPage(model.state.search.page);
    resultsView.render(resultados);
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err.message);
  }
};

init();

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////