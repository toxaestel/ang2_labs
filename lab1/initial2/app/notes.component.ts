import {Component} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface Note {
    text: string;
}

@Component({
    selector: 'notes',
    template: `Notes list:
    <ul>
        <li *ngFor="let note of notes; let i=index">
            {{note.text}} <button (click)="remove(i)">remove</button>
            <button (click)="sendToTop(i)">to to</button>
        </li>
    </ul>
    <textarea [(ngModel)]="text"></textarea>
    <button (click)="add()">Add</button>`
})
export class NotesComponent {
    private notesUrl = 'http://localhost:8080/notes';

    constructor(private http: Http) {
        this.getNotes().then(notes=>{
            this.notes=notes;
            console.log(notes);
        });
    }

    notes: Note[] = [
        {text:"Note one"},
        {text:"Note two"}
    ];
    text: string;
    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    };
    add() {
        let note = { text: this.text };
        this.notes.push(note);
        this.text = "";
    };
    remove(idx) {
        this.notes.splice(idx,1);
    };
    sendToTop(idx) {
        let topNote = this.notes.splice(idx, 1);
        this.notes.unshift(topNote[0]);
    }
}