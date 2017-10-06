import { Effect, Actions } from '@ngrx/effects';
import * as RecipesActions from './recipes.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromRecipes from './recipes.reducers';


@Injectable()
export class RecipesEffects {
    @Effect()
        recipesFetch = this.actions$
            .ofType(RecipesActions.FETCH_RECIPES)
            .switchMap((action: RecipesActions.FetchRecipes) => {
                 return this.httpClient.get<Recipe[]>(`https://angular-tutorial-http-3b3b6.firebaseio.com/recipes.json`,
                 {
                     observe: 'body',
                     responseType: 'json'
                 })
            })
            .map(
                (recipes) => {
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipesActions.SET_RECIPES,
                        payload: recipes
                    }
                })
                
    @Effect({dispatch: false})
        recipeStore = this.actions$
            .ofType(RecipesActions.STORE_RECIPES)
            .withLatestFrom(this.store.select('recipes'))
            .switchMap(([action, state]) => {
                const req = new HttpRequest(
                    'PUT',
                    'https://angular-tutorial-http-3b3b6.firebaseio.com/recipes.json',
                    state.recipes,
                    { reportProgress: true/*, params: new HttpParams().set('auth', token)*/}
                    )
                return this.httpClient.request(req)
            })
        
        constructor(private actions$: Actions,
                    private httpClient: HttpClient,
                    private store: Store<fromRecipes.FeatureState>){}
    
}