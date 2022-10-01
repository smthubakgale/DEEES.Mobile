Array.prototype.select = function (expr)
{
    var arr = this;

    switch (typeof expr)
    {
        case 'function':
            return $.map(arr, expr);
            break;
        case 'string':
            try {
                var func = new Function(expr.split('.')[0], 'return ' + expr + ' ;');
                return $.map(arr, func);
            }
            catch (e) {
                return null;
            }
            break;
        default:
            throw new ReferenceError('expr not defined or not supported');
            break;
    }
}
/* select :: usage
   > fruits.select('x.Id');

 */
Array.prototype.where = function (filter)
{
    var collection = this;
    switch (typeof filter) {
        case 'function':
            return $.grep(collection, filter);
        case 'object':
            for (var property in filter) {
                if (!filter.hasOwnProperty(property))
                    continue;

                collection = $.grep(collection, function (item) {
                    return item[property] === filter[property];
                })
            }
            return collection.slice(0);
        default:
            throw new TypeError('func must be either a' +
                'function or an object of properties and values to filter by');
    }
}
/* where :: usage
   > fruits.where( { Id : "2" , Color : "Yellow" });

 */
Array.prototype.firstOrDefault = function (funct) {
    return this.where(func)[0] || null;
}
/* where :: usage
   > fruits.firstOrDefault( { Id : "2" , Color : "Yellow" });

 */

function processJSON(dat) {
    var ret = dat;

    if (dat.indexOf('"') != -1) {
        dat = dat.replace(/id="null"/g, ""); 
        dat = dat.replace(/"/g, '@#');
        ret = dat;
    }

    return String(ret);
} 