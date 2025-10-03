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

  onClickTitle(): void {
    this.moveToRoute('home').then(_ => {});
  }

  onClickMenuBurger(): void { this.switchActif() }

  onClickHome(): void {
    this.moveToRoute('home').then(() => this.switchActif());
  }

  onClickAbout(): void {
    this.moveToRoute('about').then(() => this.switchActif());;
  }

  onClickPortfolio(): void {
    this.moveToRoute('portfolio').then(() => this.switchActif());
  }

  private moveToRoute(path: string): Promise<boolean> {
    return this.router.navigate([path])
  }

  private switchActif(): void {
    this.isActif = !this.isActif;
  }
}
