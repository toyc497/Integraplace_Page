import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
 
 
@Component({
  selector: 'app-navigation-component',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatButtonModule, MatListModule, MatToolbarModule, MatIconModule],
  templateUrl: './navigation-component.component.html',
  styleUrl: './navigation-component.component.css'
})
export class NavigationComponentComponent {
 
  toogleHide: boolean = false;
 
  toggleOpen(){
    this.toogleHide = false;
  }
 
  toggleClose(){
    this.toogleHide = true;
  }
 
}