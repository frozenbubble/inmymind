import { Component } from '@angular/core';

import {Map, Category, Notebook} from './notemodel';

import fs = require('fs');
import path = require('path');

const {dialog} = require('electron');
const book = require('./assets/store.js').book;
const process = require('process');
const serializer = require('node-serialize');
const storage = require('electron-json-storage');

// we need previous notebooks

export class NotebookProvider 
{
    private registry = {
        lastUsed: "",
        notebooks: {}
    }

    constructor(){
        this.checkRegistry().then(() => {
            storage.get('registry', (error, data) => {
                // error handling        
                this.registry = data;
            });
        }, () => {
            storage.set('registry', this.registry, (error) => {
                // error handling
                console.log(error);
            });
        });
    }


    getNotes(notebook: string) {
        let nb = require(this.registry.notebooks[notebook]);

        return serializer.deserialize(nb);
    }

    save(notebook: Notebook) {
        let data = serializer.serialize(notebook);
        let filename = this.registry[notebook.title]
        fs.writeFile(filename, data, err => {
            if (err) {
                return console.log(err);
            }

            return console.log(`notebook saved to ${filename}`);
        });
    }

    getLastUsedNotebook() {
        return this.registry.lastUsed == "" ? null : this.getNotes(this.registry.lastUsed);
    }

    getKnownNotebooks() {
        return Object.keys(this.registry.notebooks);
    }

    createNotebook(filename: string, notebook: string) {
        this.registry.notebooks[notebook] = filename;

        this.saveSettings('registry', this.registry);
    }

    openNotebook() {
        let options = {
            filters: [{name: 'imm', extensions:['imm']}]
        };

        dialog.showOpenDialog(options, fileName => {

        });
    }

    removeNotebook(n: Notebook, permanent: boolean) {
        
    }

    saveSettings(type: string, obj) {
        storage.set(type, obj, err => {
            //error handling
            console.log(err);
        });
    }

    getSettings(type: string){}

    checkRegistry() {
        return new Promise((resolve, reject) => {
           storage.has('registry', (error, hasKey) =>{
               if (hasKey) {
                   resolve();
               } else {
                   reject();
               }
           });
        });
    }
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