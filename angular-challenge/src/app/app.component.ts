import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { render } from '../../render';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<div id="container"></div>',
})

class AppComponent {
  @HostListener('window:load', ['$event'])
  onLoad(event: Event): void {
    render();
  }
}

export { AppComponent };