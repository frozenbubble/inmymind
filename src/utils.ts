export class Utils {
    readonly apiUrl = "";

    static callServer (urlPart, obj){
        var url = '/api/' + urlPart;
        console.log(url);
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.onload = function () {
                var me = <any>this;
                if (me.status >= 200 && me.status < 300) {
                    resolve(JSON.parse(xhr.responseText || "null"));
                } else {
                    reject({
                    status: me.status,
                    statusText: xhr.statusText
                    });
                }
            };

            xhr.onerror = function () {
                reject({
                    status: (<any>this).status,
                    statusText: xhr.statusText
                });
            };
            
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(obj));
        });
    }
}