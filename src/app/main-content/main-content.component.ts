import { Component } from '@angular/core';

@Component({
  selector: 'main-content',
  standalone: true,
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})

class MainContentComponent {
  loadingText = 'Loading...'.split('');
}

export { MainContentComponent };