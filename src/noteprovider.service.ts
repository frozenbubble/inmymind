import { Component } from '@angular/core';

import {Map, Category} from './notemodel';

const book = require('./assets/store.js').book;
const fs = require('fs');
const serializer = require('node-serialize');

// we need previous notebook

export class NotebookProvider 
{
    getNotes() {
        return DateHelper.Deserialize(book);
    }

    save(notebook: Category[], filename: string) {
        let data = serializer.serialize(notebook);
        fs.writeFile(filename, data, err => {
            if (err) {
                return console.log(err);
            }

            return console.log(`notebook saved to ${filename}`);
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