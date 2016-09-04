import { Component } from '@angular/core';

import {Map, Category, Notebook} from './notemodel';

import fs = require('fs');
import path = require('path');

const {dialog} = require('electron').remote;
const book = require('./assets/store.js').book;
const process = require('process');
const serializer = require('node-serialize');
const settings = require('electron-settings');


export class NotebookProvider 
{
    private lastUsed;
    private notebooks;

    constructor() {
        this.setDefaults();
        
        this.notebooks = settings.getSync('knownNotebooks');
        this.notebooks = this.checkNotebooks(this.notebooks);
        this.lastUsed = settings.getSync('lastUsed');
        
    }

    // this should be in a separate provider
    setDefaults() {
        settings.defaults({
            lastUsed: "",
            knownNotebooks: {}
        });
    }

    hasNotes() {
        return Object.keys(this.notebooks).length > 0;
    }

    checkNotebooks(notebooks) {
        let checked = {};

        Object.keys(notebooks).forEach(title => {
           if (fs.existsSync(notebooks[title])) {
               checked[title] = notebooks[title];
           } 
        });

        return checked;
    }

    getNotes(notebook: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(notebook, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let nb = serializer.deserialize(data.toString());
                    resolve(nb);
                }
            })
        });
    }

    getNotesSync(notebook: string) {
        try {
            return serializer.deserialize(fs.readFileSync(notebook)) as Notebook;
        } catch (error) {
            console.log(error);
            return new Notebook();            
        }
    }

    save(notebook: Notebook) {
        let data = serializer.serialize(notebook);
        let filename = this.notebooks[notebook.title]
        fs.writeFile(filename, data, err => {
            if (err) {
                return console.log(err);
            }

            return console.log(`notebook saved to ${filename}`);
        });
    }

    getLastUsedNotebook() {
        return this.lastUsed === "" ? null : this.getNotesSync(this.lastUsed);
    }

    getKnownNotebooks() {
        return this.notebooks ? Object.keys(this.notebooks) : [];
    }

    createNotebook( notebook: string) {
        let newNotebook = {
            title: notebook,
            categories: []
        };

        let options = {
            title: 'Create Notebook',
            filters: ['imm']
        };

        dialog.showSaveDialog(options, filename => {
            // error handling!!
            fs.writeFile(filename, newNotebook) 
            
            this.notebooks[notebook] = filename;
            settings.set('notebooks', this.notebooks).catch(err => console.log(err));
        });

    }

    openNotebook() {
        let options = {
            filters: [{name: 'imm', extensions:['imm']}]
        };

        // this has to be a promise!
        return new Promise((resolve, reject) => {
            dialog.showOpenDialog(options, fileName => {
                return this.getNotes(fileName);
            });
        });
    }

    removeNotebook(n: string, permanent: boolean) {
        
    }

    getSettings(type: string) { }
}

class DateHelper {
    public static Deserialize(data: string) {
        return JSON.parse(data, DateHelper.ExtractDate)
    }

    public static ExtractDate(key: any, value: any) {
        if (typeof value === 'string') {
            let timestamp = Date.parse(value);

            if (!Number.isNaN(timestamp)) {
                return new Date(timestamp);
            }
        }

        return value;
    }
}