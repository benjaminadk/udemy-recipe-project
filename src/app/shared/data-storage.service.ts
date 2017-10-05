import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService{
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService){}
    
    storeRecipes(){
        //const token = this.authService.getToken();
        /*
        return this.httpClient.put(`https://angular-tutorial-http-3b3b6.firebaseio.com/recipes.json`,
        this.recipeService.getRecipes(), {
            observe: 'body',
            params: new HttpParams().set('auth', token)
        })*/
        //enables logging progress - good for uploads
        //using interceptor to set headers
        const req = new HttpRequest(
            'PUT',
            'https://angular-tutorial-http-3b3b6.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(),
            { reportProgress: true/*, params: new HttpParams().set('auth', token)*/}
            )
        return this.httpClient.request(req)
    }
    
    fetchRecipes(){
        //const token = this.authService.getToken();
        
        this.httpClient.get<Recipe[]>(`https://angular-tutorial-http-3b3b6.firebaseio.com/recipes.json`)
            .map(
                (recipes) => {
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes
                }
                )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
                )
    }
    
}