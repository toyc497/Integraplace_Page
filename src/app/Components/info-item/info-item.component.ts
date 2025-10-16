import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemStoreService } from '../../Storages/item-store.service';
import { ItemServiceService } from '../../Services/item-service.service';
import { Item } from '../../Interfaces/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-item',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './info-item.component.html',
  styleUrl: './info-item.component.css'
})
export class InfoItemComponent {

  itemAux!: Item;

  constructor(
    private itemStoreService: ItemStoreService,
    private itemService: ItemServiceService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.itemStoreService.getInfoItem().subscribe(item => {
      if (item) {
        this.itemAux = item;
      }
    });
  }

  cancel() {
    this.route.navigate(['/item']);
  }

  updateItem() {
    this.itemService.updateItem(this.itemAux).subscribe({
      next: (response) => {
        this.showSnack('Item atualizado com sucesso!', true);
        this.itemStoreService.updateItemState(response);
      },
      error: (err) => {
        console.error(err);
        this.showSnack('Erro ao atualizar item.', false);
      }
    });
  }

  showSnack(message: string, success: boolean) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: success ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  verifyTypeOfItem(type: string){
    if(type == "S"){
      return "Serviço";
    }
    return "Material";
  }

}
