import { Component, Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html'
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