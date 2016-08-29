import { Component } from '@angular/core';

import {Map, Category} from './notemodel';

//const fs = require('fs');
const book = require('./assets/store.js').book;
var fs = require('fs');

export class NotebookProviderService 
{
    getNotes() {
        return DateHelper.Deserialize(book);
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