import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    constructor(){}
    
    private recipes: Recipe[] = [
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
    ];
    
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    getRecipes() {
        return this.recipes.slice();
    }
    
    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}