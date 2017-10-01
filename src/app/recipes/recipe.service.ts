import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    constructor(private slService: ShoppingListService){}
    
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
    
    getRecipes() {
        return this.recipes.slice();
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
    
}