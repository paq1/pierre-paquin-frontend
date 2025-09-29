import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  isActif: Boolean = false;


  constructor(private readonly router: Router) {
  }

  onClickMenuBurger(): void { this.switchActif() }

  onClickHome(): void {
    this.moveToRoute('home');
  }

  onClickCv(): void {
    this.moveToRoute('cv');
  }

  onClickPortfolio(): void {
    this.moveToRoute('portfolio');
  }


  private moveToRoute(path: string) {
    this.router.navigate([path]).then(() => this.switchActif());
  }

  private switchActif(): void {
    this.isActif = !this.isActif;
  }
}
