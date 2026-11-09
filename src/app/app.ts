import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataType } from './data-type/data-type';
import { PropertyBinding } from './property-binding/property-binding';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataType, PropertyBinding],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular21');
}
