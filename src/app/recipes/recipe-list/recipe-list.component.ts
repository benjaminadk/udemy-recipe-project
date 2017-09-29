import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'A description of recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUt6OuuuzP6rX82a66X8RrWoVbcfLOTSCmygJ9RgiwT-G0d20iw'),
    new Recipe('A test recipe', 'A description of recipe', 'http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg')
    ];
  
  constructor() { }

  ngOnInit() {
  }
  
  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
