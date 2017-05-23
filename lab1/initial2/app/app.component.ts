import {Component} from '@angular/core';

interface Note {
    text: string;
}

@Component({
    selector: 'my-app',
    template: ' <h1>Notes Angular 2 App</h1> <notes></notes>'
})
export class AppComponent {
    name="John";
}