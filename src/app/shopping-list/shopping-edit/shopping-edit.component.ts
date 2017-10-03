import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  editIndex: number;
  editItem: Ingredient;
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditting.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
      );
  }
  
  onAddOrUpdateItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editIndex, newIngredient);
    }
    else {
      this.slService.addIngredient(newIngredient); 
    }
    this.editMode = false;
    form.reset();
  }
  
  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }
  
  onDelete(){
    this.slService.deleteIngredient(this.editIndex);
    this.onClear();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
