import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    console.log("value : " + form.value.name, "Amount : " + form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }
  onDeleteClicked() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearClicked();
  }
  onClearClicked() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
}
