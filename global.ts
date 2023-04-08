globalThis.requires = function requires(path) {
    var r = require, p = r("path").join(__dirname, path);
    r("fs").readdirSync(p, { withFileTypes: true }).filter((d: any) => d.isFile()).map((d: any) => d.name).forEach((f: any) => { r(`${p}/` + f) });
}

globalThis.query = function query(query) {
    return new Promise((res, rej) => {
        const connection = APP.mysql_connection;
        connection.query(query, (err, result, fields) => {
            if (err) rej(err)
            res({ result, fields })
        })
    })
};