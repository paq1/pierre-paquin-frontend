import {Component} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [
    NgClass
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  selected: string = "dev";

  get isSelectedDev(): boolean { return this.selected === "dev"; }
  get isSelectedEtude(): boolean { return this.selected === "etudes"; }
  get isSelectedDoggoverse(): boolean { return this.selected === "doggoverse"; }

  onSelectDev(): void {
    this.selected = "dev";
  }

  onSelectEtudes(): void {
    this.selected = "etudes";
  }

  onSelectDoggoverse(): void {
    this.selected = "doggoverse";
  }
}
