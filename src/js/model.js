import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
    recipe: {},
    search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
},
};

const createRecipeObject = function (data) {
const { recipe } = data.data;
    return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookTime: recipe.cooking_time,
    ingredients: data.data.recipe.ingredients,
    };
};

export const loadRecipe = async (id) => {
    try {
    const url = `${API_URL}/${id}`;
    const data = await getJSON(url);
    state.recipe = createRecipeObject(data);
} catch (error) {
    console.error(`${error} 💥💥💥💥`);
    throw error;
}
};

export const loadSearchResults = async (query) => {
    try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}/?search=${query}`);

    state.search.results = data.data.recipes.map((rec) => ({
    id: rec.id,
    title: rec.title,
    publisher: rec.publisher,
    image: rec.image_url,
    }));
    state.search.page = 1;
} catch (error) {
    console.error(`${error} 💥💥💥💥`);
    throw error;
}
};

export const getSearchResultsPage = function (page = state.search.page) {
state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    state.search.resultsPage = state.search.results.slice(start, end);
    return state.search.resultsPage;
};