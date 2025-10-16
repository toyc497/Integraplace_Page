import { Component } from '@angular/core';
import { Item } from '../../Interfaces/item';
import { Router } from '@angular/router';
import { ItemServiceService } from '../../Services/item-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemStoreService } from '../../Storages/item-store.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    CommonModule,
    FormsModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  listItems: Item[] = [];
  searchTerm: string = "";

  constructor(public dialog: MatDialog, private itemStoreService: ItemStoreService, private itemServiceService: ItemServiceService, private route: Router){}

  ngOnInit(){

    if(this.listItems.length == 0){
      this.itemServiceService.findAllItem().subscribe(
        listAux => this.itemStoreService.setItemState(listAux)
      );
    }
    
    this.itemStoreService.getItemState().subscribe(
      listAux => this.listItems = listAux
    );

  }

  openAddItemDialog(){
    this.dialog.open(AddItemComponent,{
      width: '40%',
      height: '75%',
    });
  }

  setInfoItem(item: Item){
    this.itemStoreService.setInfoItem(item);
    this.route.navigate(['/info-item']);
  }


  verifyTypeOfItem(type: string){
    if(type == "S"){
      return "Serviço";
    }
    return "Material";
  }

  searchItems(){
    if(this.searchTerm == ''){
      this.itemStoreService.getItemState().subscribe(
        listAux => this.listItems = listAux
      );
    }else{
      let listAux: Item[] = [];

      for(let i=0; i < this.listItems.length; i++){
        if(this.listItems[i].code.toLowerCase() == this.searchTerm.toLowerCase() || this.listItems[i].name.toLowerCase().includes(this.searchTerm.toLowerCase())){
          listAux.push(this.listItems[i]);
        }
      }

      this.listItems = listAux
    }
  }

}
