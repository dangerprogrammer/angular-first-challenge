import { Component, Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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

class AppComponent implements OnInit {
  title = 'angular-challenge';

    constructor(
        private _renderer2: Renderer2, 
        @Inject(DOCUMENT) private _document: Document
    ) { }

    public ngOnInit() {

        let script = this._renderer2.createElement('script');
        script.src = 'https://ifc-js-viewer.vercel.app/bundle.js';

        this._renderer2.appendChild(this._document.body, script);
    }
}

export { AppComponent };