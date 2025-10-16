import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-analyze-competitor',
  standalone: true,
  imports: [],
  templateUrl: './analyze-competitor.component.html',
  styleUrl: './analyze-competitor.component.css'
})
export class AnalyzeCompetitorComponent {

  constructor(public dialogRef: MatDialogRef<AnalyzeCompetitorComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }

}
