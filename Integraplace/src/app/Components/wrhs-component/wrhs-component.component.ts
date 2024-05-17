import { Component } from '@angular/core';
import { EstoqueApiService } from '../../Services/estoque-api.service';
import { EstoqueStorageService } from '../../Storages/estoque-storage.service';
import { Estoque } from '../../Interfaces/Estoque';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wrhs-component',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './wrhs-component.component.html',
  styleUrl: './wrhs-component.component.css'
})
export class WRHSComponentComponent {

  listEstoques: Estoque[] = [];

  constructor(private estoqueApiService: EstoqueApiService, private estoqueStorageService: EstoqueStorageService){}

  ngOnInit(){

    this.estoqueApiService.getAllEstoques().subscribe(
      estoqueList => this.estoqueStorageService.setEstoques(estoqueList)
    );

    this.estoqueStorageService.getEstoques().subscribe(
      estoqueList => {this.listEstoques = estoqueList, console.log(this.listEstoques)}
    );

  }

}
