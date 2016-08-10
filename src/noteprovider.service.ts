import { Component } from 'angular2/core';

import {Map, Category} from './notemodel';

//const fs = require('fs');
const book = require('./assets/store.js').book;

export class NotebookProviderService 
{
    getNotes() {
        console.log(book);

        return DateHelper.Deserialize(book);
    }
}

class DateHelper {
    public static Deserialize(data: string) {
        return JSON.parse(data, DateHelper.ExtractDate)
    }

    public static ExtractDate(key: any, value: any) {
        if (typeof value === 'string')
        {
            let timestamp = Date.parse(value);
            if (timestamp !== NaN)
            {
                return new Date(timestamp);
            }
        }

        return value;
    }
}