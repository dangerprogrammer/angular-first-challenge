import { Component } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppHeaderComponent, LeftSidebarComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

class AppComponent {
}

export { AppComponent };