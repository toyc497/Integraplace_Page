import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarAlertService } from '../../Storages/snack-bar-alert.service';

@Component({
  selector: 'app-snack-bar-alert',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snack-bar-alert.component.html',
  styleUrl: './snack-bar-alert.component.css'
})
export class SnackBarAlertComponent {
  msg: string = "Cadastrado com Sucesso";

  constructor(private snackBarAlertService: SnackBarAlertService){}

  ngOnInit(){

    this.snackBarAlertService.getSnackBarMessage().subscribe(
      response => this.msg = response
    );

  }

  snackBarRef = inject(MatSnackBarRef);
}
