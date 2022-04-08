var e = "\uE000", t = "\uE001";
function o(r2) {
    var p2, a1, l, s, c = arguments, i = this, n = 0, d = [], h = 0, u = [], f = 0;
    d.root = true;
    var g = function(e2, o2, r3) {
        o2 === void 0 && (o2 = []);
        var p3 = 0;
        return (e2 = r3 || e2 !== t ? e2.replace(/\ue001/g, (e3)=>u[f++]
        ) : u[f++].slice(1, -1)) ? (e2.replace(/\ue000/g, (t2, r4)=>(r4 && o2.push(e2.slice(p3, r4)), p3 = r4 + 1, o2.push(c[++h]))
        ), p3 < e2.length && o2.push(e2.slice(p3)), o2.length > 1 ? o2 : o2[0]) : e2;
    }, m = ()=>{
        [d, s, ...p2] = d, d.push(i(s, ...p2));
    };
    return r2.join(e).replace(/<!--[^]*-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (e2)=>(u.push(e2), t)
    ).replace(/\s+/g, " ").replace(/(?:^|>)([^<]*)(?:$|<)/g, (e2, t2, r3, p3)=>{
        var c2, i2;
        if (r3 && p3.slice(n, r3).replace(/(\S)\/$/, "$1 /").split(" ").map((e3, t3)=>{
            if (e3[0] === "/") c2 = i2 || e3.slice(1) || 1;
            else if (t3) {
                if (e3) {
                    var r4 = d[2] || (d[2] = {
                    });
                    e3.slice(0, 3) === "..." ? Object.assign(r4, arguments[++h]) : ([a1, l] = e3.split("="), r4[g(a1)] = !l || g(l));
                }
            } else {
                for(i2 = g(e3); o.close[d[1] + i2];)m();
                d = [
                    d,
                    i2,
                    null
                ], o.empty[i2] && (c2 = i2);
            }
        }), c2) for(m(); s !== c2 && o.close[s];)m();
        n = r3 + e2.length, t2 && t2 !== " " && g((s = 0, t2), d, true);
    }), d.root || m(), d.length > 1 ? d : d[0];
}
o.empty = {
}, o.close = {
}, "area base br col command embed hr img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((e2)=>o.empty[e2] = o.empty[e2.toUpperCase()] = true
);
var r = {
    li: "",
    dt: "dd",
    dd: "dt",
    p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table",
    rt: "rp",
    rp: "rt",
    optgroup: "",
    option: "optgroup",
    caption: "tbody thead tfoot tr colgroup",
    colgroup: "thead tbody tfoot tr caption",
    thead: "tbody tfoot caption",
    tbody: "tfoot caption",
    tfoot: "caption",
    tr: "tbody tfoot",
    td: "th tr",
    th: "td tr tbody"
}, p = function(e2) {
    [
        ...r[e2].split(" "),
        e2
    ].map((t2)=>{
        o.close[e2] = o.close[e2.toUpperCase()] = o.close[e2 + t2] = o.close[e2.toUpperCase() + t2] = o.close[e2 + t2.toUpperCase()] = o.close[e2.toUpperCase() + t2.toUpperCase()] = true;
    });
};
for(var a in r)p(a);
const xhtm = o;
const ElementalSymbol = Symbol.for("Elemental");
class ElementalClass {
    constructor(components = {
    }, options = {
    }){
        const { middleware , errorComponentFactory  } = options;
        this.components = components || {
        };
        this.middleware = middleware || {
        };
        this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory;
        this.html = xhtm.bind((...args)=>this.createElement(...args)
        );
        this.html[ElementalSymbol] = this;
        this.css = Elemental.css;
    }
    createElement(...args) {
        Elemental.debug && console.debug(`args is:`, args);
        for (const middleware of (this.middleware[Elemental.allTags] || []).concat(this.middleware[args[0]] || [])){
            try {
                args = eachMiddleWare(args);
            } catch (error) {
                console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args);
            }
        }
        let [key, properties, ...children] = args;
        Elemental.debug && console.debug(`key, properties, children is:`, key, properties, children);
        if (this.components[key] instanceof Function) {
            key = this.components[key];
        }
        if (key instanceof Function) {
            let output;
            try {
                output = isConstructor(key) ? new key({
                    ...properties,
                    children
                }) : key({
                    ...properties,
                    children
                });
            } catch (error) {
                return this.errorComponentFactory({
                    ...properties,
                    children
                }, key, error);
            }
            if (output instanceof Promise) {
                const elementPromise = output;
                const placeholder = elementPromise.placeholder || document.createElement("div");
                setTimeout(async ()=>placeholder.replaceWith(await elementPromise)
                , 0);
                return placeholder;
            } else {
                return output;
            }
        }
        const isSvg = Elemental.exclusivelySvgElements.has(key);
        const element = isSvg ? document.createElementNS("http://www.w3.org/2000/svg", key) : document.createElement(key);
        if (properties instanceof Object) {
            for (const [key2, value] of Object.entries(properties)){
                try {
                    if (isSvg) {
                        const kebabCase = key2.replace(/(?<=[a-z])([A-Z])(?=[a-z])/g, (each2)=>`-${each2.toLowerCase()}`
                        );
                        element.setAttribute(kebabCase, value);
                    } else {
                        element.setAttribute(key2.toLowerCase(), value);
                    }
                } catch (error) {
                }
                try {
                    element[key2] = value;
                } catch (error1) {
                }
            }
        }
        return appendChildren(element, ...children);
    }
    extend(additionalComponents = {
    }, options = {
    }) {
        const { middleware , ...other } = options;
        return Elemental({
            ...this.components,
            ...additionalComponents
        }, {
            middleware: {
                ...this.middleware,
                ...middleware
            },
            ...other
        });
    }
}
const proxySymbol = Symbol.for("Proxy");
const Elemental = (...args)=>{
    const originalThing = new ElementalClass(...args).html;
    const proxyObject = new Proxy(originalThing, {
        ownKeys (original) {
            return Reflect.ownKeys(original[ElementalSymbol]);
        },
        get (original, key) {
            if (key == proxySymbol) {
                return true;
            }
            const originalValue = original[ElementalSymbol][key];
            if (originalValue) {
                return originalValue;
            }
            return Reflect.get(original, key, ...args);
        }
    });
    return proxyObject;
};
Elemental.allTags = Symbol.for("allTags");
Elemental.exclusivelySvgElements = new Set([
    "svg",
    "animate",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "defs",
    "desc",
    "discard",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "hatch",
    "hatchpath",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tspan",
    "unknown",
    "use",
    "view"
]);
Elemental.css = function(...args) {
    const element = document.createElement("div");
    if (args.length == 1) {
        if (args instanceof Object) {
            Object.assign(element.style, args);
        }
    } else if (args.length > 1) {
        const [strings, ...values] = args;
        let finalString = "";
        for (const each2 of strings){
            finalString += each2;
            if (values.length > 0) {
                finalString += `${values.shift()}`;
            }
        }
        element.style = finalString;
    }
    return element.style;
};
function appendChildren(element, ...children) {
    for (const each2 of children){
        if (typeof each2 == "string") {
            element.appendChild(new window.Text(each2));
        } else if (each2 == null) {
            element.appendChild(new window.Text(""));
        } else if (!(each2 instanceof Object)) {
            element.appendChild(new window.Text(`${each2}`));
        } else if (each2 instanceof Node) {
            element.appendChild(each2);
        } else if (each2 instanceof Array) {
            appendChildren(element, ...each2);
        } else if (each2 instanceof Function) {
            appendChildren(element, each2());
        } else if (each2 instanceof Promise) {
            const elementPromise = each2;
            const placeholder = elementPromise.placeholder || document.createElement("div");
            setTimeout(async ()=>placeholder.replaceWith(await elementPromise)
            , 0);
            element.appendChild(placeholder);
        } else if (each2 != null && each2 instanceof Object) {
            element.appendChild(each2);
        }
    }
    return element;
}
function defaultErrorComponentFactory({ children , ...properties }, key, error) {
    const element = document.createElement("div");
    const errorDetails = document.createElement("code");
    const childContainer = document.createElement("div");
    element.style.all = "unset";
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.padding = "1.5rem";
    element.style.backgroundColor = "#f5a5a8";
    element.style.color = "white";
    element.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
    element.style.fontSize = "18px";
    element.style.fontWeight = "400";
    element.style.overflow = "auto";
    element.innerHTML = `I'm sorry, there was an error when loading this part of the page \u{1F641} `;
    let errorElementPart;
    if (typeof key == "string") {
        errorElementPart = `<${key} />`;
    } else {
        try {
            errorElementPart = `<${key.prototype.constructor.name} />`;
        } catch (error2) {
            errorElementPart = `<${key} />`;
        }
    }
    let errorJsonObject = {
    };
    for (const [key2, value] of Object.entries(properties)){
        try {
            errorJsonObject[key2] = JSON.parse(JSON.stringify(value));
        } catch (error2) {
            errorJsonObject[key2] = `${value}`;
        }
    }
    errorDetails.innerHTML = `tag: ${errorElementPart}
properties: ${JSON.stringify(errorJsonObject)}
error: ${error}`;
    errorDetails.style.padding = "1rem";
    errorDetails.style.backgroundColor = "#161b22";
    errorDetails.style.color = "#789896";
    element.appendChild(errorDetails);
    childContainer.style.all = "unset";
    childContainer.style.display = "flex";
    childContainer.style.flexDirection = "column";
    childContainer.style.marginTop = "1.3rem";
    if (children instanceof Array) {
        for (const [key2, value] of Object.entries(children)){
            if (typeof each == "string") {
                childContainer.appendChild(new window.Text(value));
            } else if (value instanceof Node) {
                childContainer.appendChild(value);
            }
        }
    }
    element.appendChild(childContainer);
    return element;
}
function isConstructor(obj) {
    return !!obj.prototype && !!obj.prototype.constructor.name;
}
try {
    const originalHead = document.head;
    Object.defineProperty(document, "head", {
        set: (element)=>appendChildren(originalHead, ...element.childNodes)
        ,
        get: ()=>originalHead
        ,
        writable: true
    });
} catch (error) {
}
const html = Elemental();
Elemental.css;
Elemental.allTags;
[
    Uint16Array,
    Uint32Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Int32Array,
    Int8Array,
    Float32Array,
    Float64Array,
    globalThis.BigInt64Array,
    globalThis.BigUint64Array
].filter((each)=>each
);
const allKeys = function(obj) {
    let keys = [];
    if (obj == null) {
        return [];
    }
    if (!(obj instanceof Object)) {
        obj = Object.getPrototypeOf(obj);
    }
    while(obj){
        keys = keys.concat(Reflect.ownKeys(obj));
        obj = Object.getPrototypeOf(obj);
    }
    return keys;
};
const allKeyDescriptions = function(obj) {
    let keys = [];
    if (obj == null) {
        return [];
    }
    if (!(obj instanceof Object)) {
        obj = Object.getPrototypeOf(obj);
    }
    let prevObj = obj;
    while(obj && obj != prevObj){
        keys = keys.concat(allKeyDescriptions(obj));
        obj = Object.getPrototypeOf(obj);
    }
    return keys;
};
Object.getPrototypeOf(new Map().keys());
Object.getPrototypeOf(new Set().keys());
let GeneratorFunction = class {
};
let AsyncGeneratorFunction = class {
};
try {
    GeneratorFunction = eval("((function*(){})()).constructor");
    AsyncGeneratorFunction = eval("((async function*(){})()).constructor");
} catch (error1) {
}
Symbol.for("deepCopy");
Symbol();
const getThis = Symbol();
Object.getPrototypeOf(function() {
})[getThis] = function() {
    return this;
};
var allKeys1 = allKeys;
const get = ({ from , keyList , failValue  })=>{
    try {
        for (var each of keyList){
            if (from instanceof Object && each in from) {
                from = from[each];
            } else {
                return failValue;
            }
        }
    } catch (error) {
        return failValue;
    }
    return from;
};
const remove = ({ keyList , from  })=>{
    if (keyList.length == 1) {
        try {
            delete from[keyList[0]];
        } catch (error) {
            return false;
        }
    } else if (keyList.length > 1) {
        keyList = [
            ...keyList
        ];
        let last = keyList.pop();
        let parentObj = get({
            keyList,
            from
        });
        return remove({
            keyList: [
                last
            ],
            from: parentObj
        });
    }
};
const merge = ({ oldData , newData  })=>{
    if (!(newData instanceof Object) || !(oldData instanceof Object)) {
        return newData;
    }
    let output = {
    };
    if (newData instanceof Array) {
        output = [];
    }
    Object.assign(output, oldData);
    for(const key in newData){
        if (!(key in output)) {
            output[key] = newData[key];
        } else {
            output[key] = merge(oldData[key], newData[key]);
        }
    }
    return output;
};
const recursivelyAllKeysOf = (obj)=>{
    if (!(obj instanceof Object)) {
        return [];
    }
    const output = [];
    for (let eachKey of Object.keys(obj)){
        output.push([
            eachKey
        ]);
        let newAttributes = recursivelyAllKeysOf(obj[eachKey]);
        for (let eachNewAttributeList of newAttributes){
            eachNewAttributeList.unshift(eachKey);
            output.push(eachNewAttributeList);
        }
    }
    return output;
};
Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};
Object.keys || function(obj) {
    const keys = [];
    for(const key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key);
    }
    return keys;
};
const indent = ({ string , by ="    " , noLead =false  })=>(noLead ? "" : by) + string.replace(/\n/g, "\n" + by)
;
const toRepresentation = (item)=>{
    if (typeof item == 'string') {
        return `"${item.replace(/"|\n|\t|\r|\\/g, (__char)=>{
            switch(__char){
                case '"':
                    return '\\"';
                case '\n':
                    return '\\n';
                case '\t':
                    return '\\t';
                case '\r':
                    return '\\r';
                case '\\':
                    return '\\\\';
            }
        })}"`;
    }
    if (item instanceof Array) {
        return `[${item.map((each)=>toRepresentation(each)
        ).join(",")}]`;
    }
    if (item instanceof Set) {
        return `{${[
            ...item
        ].map((each)=>toRepresentation(each)
        ).join(",")}}`;
    }
    if (item instanceof Object && item.constructor == Object) {
        let string = "{";
        for (const [key, value] of Object.entries(item)){
            const stringKey = toRepresentation(key);
            const stringValue = toRepresentation(value);
            string += `\n  ${stringKey}: ${indent({
                string: stringValue,
                by: "  ",
                noLead: true
            })},`;
        }
        string += "\n}";
        return string;
    }
    if (item instanceof Map) {
        let string = "Map {";
        for (const [key, value] of item.entries()){
            const stringKey = toRepresentation(key);
            const stringValue = toRepresentation(value);
            if (!stringKey.match(/\n/g)) {
                string += `\n  ${stringKey} => ${indent({
                    string: stringValue,
                    by: "  ",
                    noLead: true
                })},`;
            } else {
                string += `\n  ${indent({
                    string: stringKey,
                    by: "  ",
                    noLead: true
                })}\n    => ${indent({
                    string: stringValue,
                    by: "    ",
                    noLead: true
                })},`;
            }
        }
        string += "\n}";
        return string;
    }
    return item ? item.toString() : `${item}`;
};
class Event extends Set {
}
const trigger = async (event, ...args)=>Promise.all([
        ...event
    ].map((each)=>each(...args)
    ))
;
const once = (event)=>{
    let selfRemovingRanFirst = false;
    let output;
    let resolve;
    const selfRemoving = async (...args)=>{
        event.delete(selfRemoving);
        output = args;
        selfRemovingRanFirst = true;
        if (resolve) {
            resolve(output);
        }
    };
    event.add(selfRemoving);
    return new Promise((res)=>{
        resolve = res;
        if (selfRemovingRanFirst) {
            resolve(output);
        }
    });
};
var e1 = "", t1 = "";
function o1(r1) {
    var p1, a1, l, s, c1 = arguments, i1 = this, n = 0, d = [], h = 0, u = [], f = 0;
    d.root = !0;
    var g = function(e11, o11, r2) {
        void 0 === o11 && (o11 = []);
        var p2 = 0;
        return (e11 = r2 || e11 !== t1 ? e11.replace(/\ue001/g, (e)=>u[f++]
        ) : u[f++].slice(1, -1)) ? (e11.replace(/\ue000/g, (t, r3)=>(r3 && o11.push(e11.slice(p2, r3)), p2 = r3 + 1, o11.push(c1[++h]))
        ), p2 < e11.length && o11.push(e11.slice(p2)), o11.length > 1 ? o11 : o11[0]) : e11;
    }, m = ()=>{
        [d, s, ...p1] = d, d.push(i1(s, ...p1));
    };
    return r1.join(e1).replace(/<!--[^]*-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (e2)=>(u.push(e2), t1)
    ).replace(/\s+/g, " ").replace(/(?:^|>)([^<]*)(?:$|<)/g, (e3, t11, r4, p3)=>{
        var c, i;
        if (r4 && p3.slice(n, r4).replace(/(\S)\/$/, "$1 /").split(" ").map((e4, t2)=>{
            if ("/" === e4[0]) c = i || e4.slice(1) || 1;
            else if (t2) {
                if (e4) {
                    var r5 = d[2] || (d[2] = {
                    });
                    "..." === e4.slice(0, 3) ? Object.assign(r5, arguments[++h]) : ([a1, l] = e4.split("="), r5[g(a1)] = !l || g(l));
                }
            } else {
                for(i = g(e4); o1.close[d[1] + i];)m();
                d = [
                    d,
                    i,
                    null
                ], o1.empty[i] && (c = i);
            }
        }), c) for(m(); s !== c && o1.close[s];)m();
        n = r4 + e3.length, t11 && " " !== t11 && g((s = 0, t11), d, !0);
    }), d.root || m(), d.length > 1 ? d : d[0];
}
o1.empty = {
}, o1.close = {
}, "area base br col command embed hr img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((e)=>o1.empty[e] = o1.empty[e.toUpperCase()] = !0
);
var r1 = {
    li: "",
    dt: "dd",
    dd: "dt",
    p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table",
    rt: "rp",
    rp: "rt",
    optgroup: "",
    option: "optgroup",
    caption: "tbody thead tfoot tr colgroup",
    colgroup: "thead tbody tfoot tr caption",
    thead: "tbody tfoot caption",
    tbody: "tfoot caption",
    tfoot: "caption",
    tr: "tbody tfoot",
    td: "th tr",
    th: "td tr tbody"
}, p1 = function(e5) {
    [
        ...r1[e5].split(" "),
        e5
    ].map((t)=>{
        o1.close[e5] = o1.close[e5.toUpperCase()] = o1.close[e5 + t] = o1.close[e5.toUpperCase() + t] = o1.close[e5 + t.toUpperCase()] = o1.close[e5.toUpperCase() + t.toUpperCase()] = !0;
    });
};
for(var a1 in r1)p1(a1);
const xhtm1 = o1;
const ElementalSymbol1 = Symbol.for("Elemental");
class ElementalClass1 {
    constructor(components = {
    }, options = {
    }){
        const { middleware , errorComponentFactory  } = options;
        this.components = components || {
        };
        this.middleware = middleware || {
        };
        this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory1;
        this.html = xhtm1.bind((...args)=>this.createElement(...args)
        );
        this.html[ElementalSymbol1] = this;
        this.css = Elemental1.css;
    }
    createElement(...args) {
        Elemental1.debug && console.debug(`args is:`, args);
        for (const middleware of (this.middleware[Elemental1.allTags] || []).concat(this.middleware[args[0]] || [])){
            try {
                args = eachMiddleWare(args);
            } catch (error) {
                console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args);
            }
        }
        let [key, properties, ...children] = args;
        Elemental1.debug && console.debug(`key, properties, children is:`, key, properties, children);
        if (this.components[key] instanceof Function) {
            key = this.components[key];
        }
        if (key instanceof Function) {
            let output;
            try {
                output = isConstructor1(key) ? new key({
                    ...properties,
                    children
                }) : key({
                    ...properties,
                    children
                });
            } catch (error2) {
                return this.errorComponentFactory({
                    ...properties,
                    children
                }, key, error2);
            }
            if (output instanceof Promise) {
                const elementPromise = output;
                const placeholder = elementPromise.placeholder || document.createElement("div");
                setTimeout(async ()=>placeholder.replaceWith(await elementPromise)
                , 0);
                return placeholder;
            } else {
                return output;
            }
        }
        const isSvg = Elemental1.exclusivelySvgElements.has(key);
        const element = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', key) : document.createElement(key);
        if (properties instanceof Object) {
            for (const [key, value] of Object.entries(properties)){
                try {
                    if (isSvg) {
                        const kebabCase = key.replace(/(?<=[a-z])([A-Z])(?=[a-z])/g, (each)=>`-${each.toLowerCase()}`
                        );
                        element.setAttribute(kebabCase, value);
                    } else {
                        element.setAttribute(key.toLowerCase(), value);
                    }
                } catch (error) {
                }
                try {
                    element[key] = value;
                } catch (error1) {
                }
            }
        }
        return appendChildren1(element, ...children);
    }
    extend(additionalComponents = {
    }, options = {
    }) {
        const { middleware , ...other } = options;
        return Elemental1({
            ...this.components,
            ...additionalComponents
        }, {
            middleware: {
                ...this.middleware,
                ...middleware
            },
            ...other
        });
    }
}
const proxySymbol1 = Symbol.for('Proxy');
const Elemental1 = (...args)=>{
    const originalThing = new ElementalClass1(...args).html;
    const proxyObject = new Proxy(originalThing, {
        ownKeys (original) {
            return Reflect.ownKeys(original[ElementalSymbol1]);
        },
        get (original, key) {
            if (key == proxySymbol1) {
                return true;
            }
            const originalValue = original[ElementalSymbol1][key];
            if (originalValue) {
                return originalValue;
            }
            return Reflect.get(original, key, ...args);
        }
    });
    return proxyObject;
};
Elemental1.allTags = Symbol.for("allTags");
Elemental1.exclusivelySvgElements = new Set([
    "svg",
    "animate",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "defs",
    "desc",
    "discard",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "hatch",
    "hatchpath",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tspan",
    "unknown",
    "use",
    "view", 
]);
Elemental1.css = function(...args) {
    const element = document.createElement("div");
    if (args.length == 1) {
        if (args instanceof Object) {
            Object.assign(element.style, args);
        }
    } else if (args.length > 1) {
        const [strings, ...values] = args;
        let finalString = "";
        for (const each of strings){
            finalString += each;
            if (values.length > 0) {
                finalString += `${values.shift()}`;
            }
        }
        element.style = finalString;
    }
    return element.style;
};
function appendChildren1(element, ...children) {
    for (const each of children){
        if (typeof each == 'string') {
            element.appendChild(new window.Text(each));
        } else if (each == null) {
            element.appendChild(new window.Text(""));
        } else if (!(each instanceof Object)) {
            element.appendChild(new window.Text(`${each}`));
        } else if (each instanceof Node) {
            element.appendChild(each);
        } else if (each instanceof Array) {
            appendChildren1(element, ...each);
        } else if (each instanceof Function) {
            appendChildren1(element, each());
        } else if (each instanceof Promise) {
            const elementPromise = each;
            const placeholder = elementPromise.placeholder || document.createElement("div");
            setTimeout(async ()=>placeholder.replaceWith(await elementPromise)
            , 0);
            element.appendChild(placeholder);
        } else if (each != null && each instanceof Object) {
            element.appendChild(each);
        }
    }
    return element;
}
function defaultErrorComponentFactory1({ children , ...properties }, key, error3) {
    const element = document.createElement("div");
    const errorDetails = document.createElement("code");
    const childContainer = document.createElement("div");
    element.style.all = "unset";
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.padding = "1.5rem";
    element.style.backgroundColor = "#f5a5a8";
    element.style.color = "white";
    element.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
    element.style.fontSize = '18px';
    element.style.fontWeight = '400';
    element.style.overflow = 'auto';
    element.innerHTML = `I'm sorry, there was an error when loading this part of the page 🙁 `;
    let errorElementPart;
    if (typeof key == 'string') {
        errorElementPart = `<${key} />`;
    } else {
        try {
            errorElementPart = `<${key.prototype.constructor.name} />`;
        } catch (error) {
            errorElementPart = `<${key} />`;
        }
    }
    let errorJsonObject = {
    };
    for (const [key1, value] of Object.entries(properties)){
        try {
            errorJsonObject[key1] = JSON.parse(JSON.stringify(value));
        } catch (error) {
            errorJsonObject[key1] = `${value}`;
        }
    }
    errorDetails.innerHTML = `tag: ${errorElementPart}\nproperties: ${JSON.stringify(errorJsonObject)}\nerror: ${error3}`;
    errorDetails.style.padding = "1rem";
    errorDetails.style.backgroundColor = "#161b22";
    errorDetails.style.color = "#789896";
    element.appendChild(errorDetails);
    childContainer.style.all = "unset";
    childContainer.style.display = "flex";
    childContainer.style.flexDirection = "column";
    childContainer.style.marginTop = "1.3rem";
    if (children instanceof Array) {
        for (const [key, value] of Object.entries(children)){
            if (typeof each == 'string') {
                childContainer.appendChild(new window.Text(value));
            } else if (value instanceof Node) {
                childContainer.appendChild(value);
            }
        }
    }
    element.appendChild(childContainer);
    return element;
}
function isConstructor1(obj) {
    return !!obj.prototype && !!obj.prototype.constructor.name;
}
try {
    const originalHead = document.head;
    Object.defineProperty(document, "head", {
        set: (element)=>appendChildren1(originalHead, ...element.childNodes)
        ,
        get: ()=>originalHead
        ,
        writable: true
    });
} catch (error4) {
}
const html1 = Elemental1();
Elemental1.css;
Elemental1.allTags;
const title = ({ style , children , ...props })=>html1`<h1 class="tutorialize-title">
    ${children}
</h1>`
;
const text = ({ style , children , ...props })=>html1`<span class="tutorialize-text">
    ${children}
</span>`
;
const container = ({ style , children , ...props })=>html1`<div
    style=${{
        display: "flex",
        flexDirection: "column"
    }}
    >
        ${children}
</div>`
;
const input = ({ style , children , ...props })=>html1`<input class="tutorialize-input" ...${props} />`
;
const html2 = html1.extend({
    text,
    title,
    container,
    input
});
const showText = ({ title: title1 , body  })=>({ value , Tutorializer: Tutorializer1  })=>({
            loadSlide: ()=>{
                Tutorializer1.content = html2`<container>
            <title>
                ${title1}
            </title>
            <text>
                ${body}
            </text>
        </container>`;
            },
            valueIsValid: (value)=>true
            ,
            ifValueInvalid: ()=>{
            }
        })
;
const askLine = ({ question  })=>({ value: value1 , Tutorializer: Tutorializer2  })=>({
            loadSlide () {
                console.debug(`this is:`, this);
                this.errorMessageElement = html2`<text></text>`;
                Tutorializer2.content = html2`<container>
            <text>
                ${question}
            </text>
            <input
                onkeyup=${({ key , target  })=>{
                    value1.set(target.value);
                    if (key == "Enter") {
                        Tutorializer2.goNext();
                    }
                }}
                />
            <div style=${{
                    height: "3rem",
                    overflow: "visible"
                }}>
                ${this.errorMessageElement}
            </div>
        </container>`;
            },
            valueIsValid (value) {
                console.debug(`value is:`, value);
                console.debug(`typeof value == 'string' is:`, typeof value == 'string');
                console.debug(`value.length > 0 is:`, value.length > 0);
                return typeof value == 'string' && value.length > 0;
            },
            ifValueInvalid () {
                this.errorMessageElement.innerHTML = `
            the input box needs at least one character
        `;
            }
        })
;
const Tutorial1 = async ({ Tutorializer: Tutorializer3 , slide  })=>{
    console.log(`start:Tutorial`);
    console.debug(`Tutorializer is:`, Tutorializer3);
    const githubUsername = await slide("githubUsername", askLine({
        question: "Whats the github username for the repository?"
    }));
    await slide("didReadSummary1", showText({
        title: `Confirmation Check`,
        body: html2`
                <span>So is this the url to your profile?</span>
                <a href=${`https://github.com/${githubUsername}`}>
                    https://github.com/${githubUsername}
                </a>
            `
    }));
    await slide("didReadSummary2", showText({
        title: `What This Does`,
        body: `Testing testing`
    }));
};
const theme1 = {
    name: "DefaultTheme",
    settings: {
        slideFadeInMiliseconds: 600
    },
    styles: `
        :root {
            --off-white: whitesmoke;
            --blue: cornflowerblue;
            --light-gray: lightgray;
            
            --background: var(--off-white);
            --arrow-button-accent: var(--blue);
            --title-size: 32px;
            --text-size: 22px;
            --text-default-color: gray;
            --bottom-row-height: 7rem;
        }

        .tutorialize-root {
            display: flex; 
            flex-direction: column;
            align-items: flex-start; 
            justify-content: flex-start;
            overflow: hidden;
            font-family: sans-serif;
            height: 100%;
            width: 100%;
            font-size: var(--text-size);
            color: var(--text-default-color);
            background: var(--background);
        }

        .tutorialize-title {
            font-size: var(--title-size);
            padding: 1rem;
            text-decoration: underline;
        }

        .tutorialize-text {
            padding: 2rem;
        }

        .tutorialize-input {
            color: gray;
            background: transparent;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid gray;
            transition: all 0.5s ease-in-out 0s;
            outline: none;
        }
        
        .tutorialize-arrow-buttons {
            display: flex; 
            align-items: center; 
            justify-content: center;
            font-size: 25px; 
            height: 100%;
            flex-grow: 1;
            transition: all 0.5s ease-in-out 0s;
            color: var(--arrow-button-accent);
            text-decoration: underline;
            background: white;
            --border-size: 2px;
            margin-left: -var(--border-size);
        }
        .tutorialize-arrow-buttons:not(:hover) {
            border: var(--border-size) var(--light-gray) solid;
        }
        .tutorialize-arrow-buttons:hover {
            border: var(--border-size) var(--arrow-button-accent) solid;
            z-index: 1;
        }

        .tutorialize-main {
            display: flex; 
            align-items: center; 
            justify-content: center;
            transition: all 0.5s ease-in-out 0s;
            height: 100%;
            width: 100%;
            padding: 2rem;
            flex-direction: column;
            overflow: auto;
            max-height: calc(100vh - var(--bottom-row-height));
        }

        .tutorialize-container-of-arrow-buttons {
            height: var(--bottom-row-height);
            display: inline-flex; 
            flex-wrap: wrap;
            align-items: flex-start; 
            justify-content: flext-start;
            flex-direction: row;
            width: 100%;
        }
    `
};
globalThis.allKeys = allKeys1;
const tutorializerSymbol = Symbol.for("tutorializer");
const GoingBackDontMindMeException = class extends Error {
};
class TutorializerClass {
    constructor(){
        this.pendingData = {
        };
        this.progressData = [];
        this.tutorial = Tutorial1;
        this.main = html`
            <div class="tutorialize-main" >
                Howdy!
            </div>
        `;
        this.element = null;
        this.events = {
            attemptGoingToNext: new Event(),
            goingBack: new Event()
        };
        this._style = document.createElement("style");
        this._theme = theme1;
    }
    get data() {
        return Object.fromEntries([
            ...this.progressData,
            Object.entries(this.pendingData)
        ].flat(1));
    }
    has(id) {
        console.log(`start:has()`);
        return id in this.data;
    }
    add(id, value) {
        this.pendingData[id] = value;
    }
    get content() {
        return this.main.children;
    }
    set content(element) {
        console.log(`start:set content`);
        this.main.style.opacity = 0;
        setTimeout(()=>{
            this.main.children = [
                element
            ];
            this.main.style.opacity = 1;
        }, this.theme.settings.slideFadeInMiliseconds);
    }
    get theme() {
        return this._theme;
    }
    set theme(newTheme) {
        if (!(newTheme instanceof Object) || typeof newTheme.name !== 'string' || typeof newTheme.styles !== 'string') {
            throw Error(`I was creating a theme, I expected an object like {name:"blah", styles: ".thing { color: red: }" }\nHowever, instead I got this: ${toRepresentation(newTheme)}`);
        }
        const { name , styles , settings  } = newTheme;
        this._theme = newTheme;
        this._style.innerHTML = styles;
        if (settings instanceof Object) {
            this._theme.settings = merge({
                oldData: theme1.settings,
                newData: settings
            });
        }
    }
    async slide(id, func) {
        console.log(`start:slide`);
        console.debug(`this is:`, this);
        console.debug(`Tutorializer is:`, Tutorializer);
        if (this.has(id)) {
            return this.data[id];
        }
        let realValue = undefined;
        const value1 = {
            get: ()=>realValue
            ,
            set: (value)=>{
                realValue = value;
                this.add(id, realValue);
            }
        };
        const { loadSlide , valueIsValid , ifValueInvalid  } = await func({
            value: value1,
            Tutorializer: this
        });
        await loadSlide();
        while(true){
            console.debug(`slide, this.events is:`, this.events);
            await once(this.events.attemptGoingToNext);
            console.debug(`valueIsValid(realValue) is:`, valueIsValid(realValue));
            if (await valueIsValid(realValue)) {
                break;
            } else {
                await ifValueInvalid(realValue);
            }
        }
        this.add(id, realValue);
        this.savePendingData();
        return realValue;
    }
    async intializeWholeWebpage() {
        console.log(`start:intializeWholeWebpage()`);
        document.head.innerHTML += `<link rel="stylesheet" href="https://unpkg.com/css-baseline/css/3.css">`;
        document.head.appendChild(this._style);
        const { default: router  } = await import("https://cdn.skypack.dev/quik-router");
        const givenUrl = router.pageInfo.url;
        if (givenUrl) {
            await this.getDataFromUrl(givenUrl);
        }
        this.theme = this._theme;
        this.runTutorial();
        document.body = html`<body
            style=${{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            overflow: "hidden",
            fontFamily: "sans-serif",
            flexDirection: "column",
            height: "100%"
        }}>
                ${this.createElement()}
        </body>`;
    }
    async getDataFromUrl(url) {
        try {
            var { Tutorial , theme  } = await import(url);
        } catch (err) {
        }
        if (theme) {
            this._theme = theme;
        }
        if (Tutorial instanceof Function) {
            this.tutorial = Tutorial;
        } else {
            console.error(`The Tutorial wasnt a function: ${Tutorial}`);
        }
    }
    async runTutorial() {
        console.log(`start:runTutorial()`);
        try {
            console.log(`start:tutorial()`);
            await this.tutorial({
                Tutorializer: this,
                slide: this.slide.bind(this)
            });
            return this.data;
        } catch (error5) {
            if (!(error5 instanceof GoingBackDontMindMeException)) {
                throw error5;
            }
        }
    }
    createElement() {
        console.log(`start:createElement()`);
        console.debug(`this is:`, this);
        return this.element = html`<div class="tutorialize-root">
            ${this.main}
            <div class="tutorialize-container-of-arrow-buttons">
                <a class="tutorialize-arrow-buttons" onclick=${(...args)=>this.goBack(...args)
        }>
                    Back
                </a>
                <a class="tutorialize-arrow-buttons" onclick=${(...args)=>this.goNext(...args)
        }>
                    Next
                </a>
            </div>
        </div>`;
    }
    savePendingData() {
        if (Object.keys(this.pendingData).length) {
            this.progressData.push(Object.entries(this.pendingData));
            this.pendingData = {
            };
        }
    }
    async goNext() {
        trigger(this.events.attemptGoingToNext);
    }
    async goBack() {
        if (this.progressData.length > 0) {
            this.progressData.pop();
        }
        this.pendingData = {
        };
        trigger(this.events.goingBack);
        await this.runTutorial();
    }
}
const Tutorializer = globalThis[tutorializerSymbol] = new TutorializerClass();
export { Tutorializer as Tutorializer };
export { html as html };

