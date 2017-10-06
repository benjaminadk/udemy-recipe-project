import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.reducers';


export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Salmon Yum',
        'A tasty salmon dish',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUt6OuuuzP6rX82a66X8RrWoVbcfLOTSCmygJ9RgiwT-G0d20iw',
        [
            new Ingredient('Salmon', 1),
            new Ingredient('Veggies', 10)
            ]),
        new Recipe('Chicken Burger',
        'A tasty Burger', 
        'http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg',
        [
            new Ingredient('Bun', 1),
            new Ingredient('Chicken', 1),
            new Ingredient('Fries', 20)
            ])
    ]
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions){
    switch(action.type){
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipesActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipesActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            }
        default:
            return state;
    }
}