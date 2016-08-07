import { Component } from 'angular2/core';

const fs = require('fs');

export class NoteProvider 
{
    getNotes() {
        return [
            {
                notebook: "notebook1",
            }
        ];
    }
}