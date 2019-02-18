import { Component } from '@angular/core';

/**
 * Generated class for the LelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lel',
  templateUrl: 'lel.html'
})
export class LelComponent {

  text: string;

  constructor() {
    console.log('Hello LelComponent Component');
    this.text = 'Hello World';
  }

}
