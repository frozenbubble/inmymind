import { Component } from '@angular/core';

import {Map, Category, Notebook} from './notemodel';

import fs = require('fs');
import path = require('path');

const {dialog} = require('electron').remote;
const book = require('./assets/store.js').book;
const process = require('process');
const serializer = require('node-serialize');
const settings = require('electron-settings');

class NotebookEntry {
    title: string;
    path: string;
}

export class NotebookProvider 
{
    private lastUsed: string;
    private lastFolder: string;
    private notebooks: NotebookEntry[] = [];

    constructor() {
        let folder = settings.getSync('lastFolder');
        let lastUsed = settings.getSync('lastUsed');
        
        if (folder && folder !== '') {
            console.log(`last folder: ${folder}`);
            this.lastFolder = folder;
            this.notebooks = this.checkFolder(folder);

            if (lastUsed && lastUsed !== '') {
                this.lastUsed = lastUsed;
            }
        }
        
    }

    getNotebooks() {
        return this.notebooks.map(entry => entry.title);
    }

    openNotebook(notebook: string): Promise<Notebook> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.getPathForTitle(this.lastFolder, notebook), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let nb = JSON.parse(data.toString());
                    
                    // error handling
                    settings.set('lastUsed', notebook);
                    resolve(nb);
                }
            })
        });
    }

    save(notebook: Notebook, nbPath = undefined) {
        return new Promise((resolve, reject) =>{
            let data = JSON.stringify(notebook);
            
            console.log('service notebooks: ' + this.notebooks);

            // error handling
            let filename = nbPath || this.getPathForTitle(this.lastFolder, notebook.title);
            
            fs.writeFile(filename, data, err => {
                if (err) {
                    reject(err);
                }

                resolve(filename);                
            });
        });
    }

    getLastUsedNotebook() {
        return new Promise((resolve, reject) => {
            fs.exists(this.getPathForTitle(this.lastFolder, this.lastUsed), exists => {
                if (exists) {
                    resolve(this.lastUsed)
                } else {
                    reject('last used notebook not found');
                }
            });
        });
    }

    private getPathForTitle(folder, title) {
        return path.join(folder.toString(), `${title}.imm`);
    }

    createNotebook(title: string): Promise<string[]> {
        let notebook = new Notebook(title);
        let nbPath = this.getPathForTitle(this.lastFolder.toString(), title);
        console.log(`createing notebook: ${title} to path: ${nbPath}`);

        return new Promise((resolve, reject) => {
            fs.writeFile(nbPath, JSON.stringify(notebook), err => {
                if (err) {
                    reject(err);
                } else {
                    this.notebooks.push({title: title, path: nbPath})
                    resolve (this.getNotebooks());
                }
            });
        });
    }

    openFolder(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            dialog.showOpenDialog({
                title: 'Open folder',
                properties: ['openDirectory']
            }, folder => {
                this.lastFolder = folder;
                this.notebooks = this.checkFolder(folder);
                settings.set('lastFolder', folder);

                resolve(this.notebooks.map(entry => entry.title));
            });
        });
    }

    private getTitleFromPath(p: string) {
        if (p.endsWith('.imm')) {
            return p.substr(0, p.length - 4);
        } else {
            throw `not an imm map: ${p}`; 
        }
    } 

    private checkFolder(folder: string) {
        console.log(`checking folder: ${folder.toString()}`);

        let notebooks = fs.readdirSync(folder.toString()).filter(x => x.endsWith('.imm'));
        return notebooks.map(p => {
            return {
                title: this.getTitleFromPath(path.basename(p)),
                path: p
            };
        });
    }

    removeNotebook(notebook: string): Promise<string[]> {
        let nbPath = this.getPathForTitle(this.lastFolder, notebook);

        return new Promise((resolve, reject) => {
            fs.unlink(nbPath, err =>{
                if (err) {
                    reject(err);
                } else {
                    this.notebooks = this.checkFolder(this.lastFolder);
                    resolve(this.notebooks.map(entry => entry.title));
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