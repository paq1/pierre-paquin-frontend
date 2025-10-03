import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from './pages/shared/menu/menu.component';
import {ProceduralBgComponent} from './pages/shared/procedural-bg/procedural-bg.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, ProceduralBgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
