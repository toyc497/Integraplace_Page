import { Component } from '@angular/core';
import { NavigationComponentComponent } from './Components/navigation-component/navigation-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Integraplace';
}
