export class Utils {
    static apiUrl: string = "http://localhost:3000";

    static callServer (urlPart, obj, resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.apiUrl + '/api/' + urlPart);
        xhr.onload = function () {
            if ((<any>this).status >= 200 && (<any>this).status < 300) {
                if (resolve) {
                    resolve(JSON.parse(xhr.responseText || 'null'));
                }
            } else {
                if (reject) {
                    console.log('bad status code');

                    reject({
                        status: (<any>this).status,
                        statusText: xhr.statusText
                    });
                }
            }
        };
        xhr.onerror = function () {
            console.log('xhr onerror');
            if (reject) {
                reject({
                    status: (<any>this).status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(obj));
    };
}