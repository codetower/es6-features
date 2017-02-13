
## Classes

As we know them from "real" languages. Syntactic sugar on top of prototype-inheritence. 


```javascript
no-eval
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  get boneCount() {
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}

``` 
[Lebab.io](https://lebab.io/#)


## Enhanced Object Literals

```javascript 
var theProtoObj = {
  toString: function() {
    return "The ProtoOBject To string"
  }
}

var handler = () => "handler"


var obj = {
    // __proto__
    __proto__: theProtoObj,
    
    // Shorthand for ‘handler: handler’
    handler,
    
    // Methods
    toString() {
    
     // Super calls
     return "d " + super.toString();
    },
    
    // Computed (dynamic) property names
    [ "prop_" + (() => 42)() ]: 42
};

console.log(obj.handler)
console.log(obj.handler())
console.log(obj.toString())
console.log(obj.prop_42)

```


## String interpolation

Nice syntax for string interpolation (but sligthly worse performance, [Source](http://stackoverflow.com/questions/29055518/are-es6-template-literals-faster-than-string-concatenation))

```javascript
var name = "Bob", time = "today";

var multiLine = `This

Line

Spans Multiple

Lines`


console.log(`Hello ${name},how are you ${time}?`)
console.log(multiLine)
```



## Destructuring

```javascript
// list "matching"
var [a, , b] = [1,2,3];
console.log(a)
console.log(b)
```
 
 
 Objects can be destructured as well. 
 
```javascript
nodes = () => { return {op: "a", lhs: "b", rhs: "c"}}
var { op: a, lhs: b , rhs: c } = nodes()
console.log(a)
console.log(b)
console.log(c)
```
 Using Shorthand notation.
 
 ```javascript
nodes = () => { return {lhs: "a", op: "b", rhs: "c"}}

// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = nodes()

console.log(op)
console.log(lhs)
console.log(rhs)
```
 
Can be used in parameter position
 
 ```javascript

function g({name: x}) {
  return x
}

function m({name}) {
  return name
}

console.log(g({name: 5}))
console.log(m({name: 5}))
```
 
Fail-soft destructuring

```javascript
var [a] = []
var [b = 1] = []
var c = [];
console.log(a)
console.log(b);
console.log(c);
```


## Default
```javascript
function f(x, y=12) {
  return x + y;
}

console.log(f(3))
```

## Spread 

In functions

```javascript
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
console.log(f(...[1,2,3]))
```

In arrays

```javascript
var parts = ["shoulders", "knees"];
var lyrics = ["head", ...parts, "and", "toes"]; 

console.log(lyrics)
```

## Spread + Object Literals

We can do cool stuff with this in object creations.

```javascript
no-eval
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// Spread properties
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
console.log(obj)
```

Sadly it is not support yet

`npm install --save-dev babel-plugin-transform-object-rest-spread`


## Rest

```javascript
function demo(part1, ...part2) {
	return ({part1, part2})
}

console.log(demo(1,2,3,4,5,6))
```


## Let
`Let` is the new `var`. As it has "sane" bindings.

```javascript
{
   var globalVar = "from demo1"
}

{
   let globalLet = "from demo2";
}

console.log(globalVar)
console.log(globalLet)

```

However, it does not assigne anything to `window`

```javascript
let me = "go";  // globally scoped
var i = "able"; // globally scoped

console.log(window.me); 
console.log(window.i); 
```
It is not possible to redeclare a variable using `let`

```javascript

let me = "foo";
let me = "bar"; 
console.log(me);
```

```javascript

var me = "foo";
var me = "bar"; 
console.log(me)
```

## Const
`Const` is for read only variables

```javascript
const a = "b"
a = "a"
```

## For..of
New type of iterators with an alternative to the `for..in`. It returns the value instead of the `keys`.

```javascript
let list = [4, 5, 6];

console.log(list)

for (let i in list) {
   console.log(i);
}
```

```javascript
let list = [4, 5, 6];

console.log(list)


for (let i of list) {
   console.log(i); 
}
```


### Iterators
The iterator is a more dynamic type than arrays. 


```javascript 
let infinite = {
  [Symbol.iterator]() {
    let c = 0;
    return {
      next() {
        c++;
        return { done: false, value: c }
      }
    }
  }
}

console.log("start");

for (var n of infinite) {
  // truncate the sequence at 1000
  if (n > 10)
    break;
  console.log(n);
}
```

Using Typescript interfaces we can see how it looks

```javascript 
no-eval
interface IteratorResult {
  done: boolean;
  value: any;
}
interface Iterator {
  next(): IteratorResult;
}
interface Iterable {
  [Symbol.iterator](): Iterator
}
```

### Generators
Generators create iterators, and are more dynamic than iterators. They do not have to keep track of state in the same manner and does not support the concept of done. 

```javascript 
var infinity = {
  [Symbol.iterator]: function*() {
    var c = 1;
    for (;;) {   
      yield c++;
    }
  }
}

console.log("start")
for (var n of infinity) {
  // truncate the sequence at 1000
  if (n > 10)
    break;
  console.log(n);
}
```


Using typescript again to show the interfaces. 

```javascript 
no-eval
interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```

[function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
[Iterators and generator](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators)

An example of yield* 

```javascript
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value);
```

## Unicode
ES6 provides better support for Unicode. 

```javascript
var regex = new RegExp('\u{61}', 'u');

console.log(regex.unicode)
console.log("\uD842\uDFD7")
console.log("\uD842\uDFD7".codePointAt())
```

## Modules & Module Loaders
Native support for modules.

```javascript
no-eval
import defaultMember from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as name from "module-name";
import "module-name";

```

```javascript
no-eval
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const

export expression;
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;

```

[Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

[Export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)


## Set
Sets as in the mathematical counterpart where all items are unique. 

```javascript
var set = new Set();
set.add("Potato").add("Tomato").add("Tomato");
console.log(set.size)
console.log(set.has("Tomato"))

for(item of set) {
   console.log(item)
}
```


[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

## WeakSet
The `WeakSet` object lets you store weakly held objects in a collection. Objects without an reference will be garbage collected. 

```javascript
var item = { a:"Potato"}
var set = new WeakSet();
set.add({ a:"Potato"}).add(item).add({ a:"Tomato"}).add({ a:"Tomato"});
console.log(set.size)
console.log(set.has({a:"Tomato"}))
console.log(set.has(item))

for(item of set) {
   console.log(item)
}
```


[WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)


## Map
Maps, also known as dictonary. 


```javascript
var map = new Map();
map.set("Potato", 12);
map.set("Tomato", 34);

console.log(map.get("Potato"))


for(item of map) {
   console.log(item)
}


for(item in map) {
   console.log(item)
}
```

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)


## WeakMap 

Uses objects for keys, and only keeps weak reference to the keys.

```javascript
var wm = new WeakMap();

var o1  = {}
var o2  = {}
var o3  = {}


wm.set(o1, 1);
wm.set(o2, 2);
wm.set(o3, {a: "a"});
wm.set({}, 4);

console.log(wm.get(o2));
console.log(wm.has({}))

delete o2;

console.log(wm.get(o3));

for(item in wm) {
   console.log(item)
}


for(item of wm) {
   console.log(item)
}
```

[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

## Proxies
Proxies can be used to alter objects behavoir. It allows us to define traps.

```javascript

var obj = function ProfanityGenerator() {
    return {
       words: "Horrible words"    
    }
}()

var handler = function CensoringHandler() {
	    return {
        get: function (target, key) {
            return target[key].replace("Horrible", "Nice");
        },
    }
	
}()

var proxy = new Proxy(obj, handler);

console.log(proxy.words);

```

The following traps are available

```javascript 
no-eval
var handler =
{
  get:...,
  set:...,
  has:...,
  deleteProperty:...,
  apply:...,
  construct:...,
  getOwnPropertyDescriptor:...,
  defineProperty:...,
  getPrototypeOf:...,
  setPrototypeOf:...,
  enumerate:...,
  ownKeys:...,
  preventExtensions:...,
  isExtensible:...
}
```


[Proxies](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy)


## Symbols
Symbols are a new type. Can be used to create anomymous properties.

```javascript 
var typeSymbol = Symbol("type");

class Pet {
  
  constructor(type) {
    
    this[typeSymbol] = type;
    
  }
  getType() {
     return this[typeSymbol];
  }
  
}


var a = new Pet("dog");
console.log(a.getType());
console.log(Object.getOwnPropertyNames(a))


console.log(Symbol("a") === Symbol("a"))
```


[More info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## Inheritable Built-ins

We can now inherit from native classes. 

```javascript 

class CustomArray extends Array {
   
}

var a = new CustomArray();

a[0] = 2
console.log(a[0])

```
It is not possible to override the getter function without using Proxies of arrays.


## New Library
Various new methods and constants.

```javascript
console.log(Number.EPSILON)
console.log(Number.isInteger(Infinity))
console.log(Number.isNaN("NaN"))

console.log(Math.acosh(3))
console.log(Math.hypot(3, 4))
console.log(Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2))

console.log("abcde".includes("cd") )
console.log("abc".repeat(3) )


console.log(Array.of(1, 2, 3) )
console.log([0, 0, 0].fill(7, 1) )
console.log([1, 2, 3].find(x => x == 3) )
console.log([1, 2, 3].findIndex(x => x == 2)) 
console.log([1, 2, 3, 4, 5].copyWithin(3, 0)) 
console.log(["a", "b", "c"].entries() )
console.log(["a", "b", "c"].keys() )
console.log(["a", "b", "c"].values() )

console.log(Object.assign({}, { origin: new Point(0,0) }))


```

Documentation: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math), [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), [Array.of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of), [Array.prototype.copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin), [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)


## Binary and Octal 
Literals for binary and octal numbering.

```javascript
console.log(0b11111)
console.log(0o2342)

console.log(0xff); // also in es5

```

## Promises
The bread and butter for async programing. 

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("1"), 101)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("2"), 100)
})

Promise.race([p1, p2]).then((res) => {
   console.log(res)
})

Promise.all([p1, p2]).then((res) => {
   console.log(res)
})

```

### Quick Promise
Need a quick always resolved promise?

```javascript

var p1 = Promise.resolve("1")
var p2 = Promise.reject("2")

Promise.race([p1, p2]).then((res) => {
   console.log(res)
})
```

### Fail fast
If a promise fails `all` and `race` will reject as well. 

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("1"), 1001)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("2"), 1)
})

Promise.race([p1, p2]).then((res) => {
   console.log("success" + res)
}, res => {
   console.log("error " + res)
})

Promise.all([p1, p2]).then((res) => {
   console.log("success" + res)
}, res => {
   console.log("error " + res)
})


```

[More Info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


## Reflect 
New type of meta programming with new API for existing and also few new methods. 

```javascript

var z = {w: "Super Hello"}
var y = {x: "hello", __proto__: z};

console.log(Reflect.getOwnPropertyDescriptor(y, "x"));
console.log(Reflect.has(y, "w"));
console.log(Reflect.ownKeys(y, "w"));

console.log(Reflect.has(y, "x"));
console.log(Reflect.deleteProperty(y,"x"))
console.log(Reflect.has(y, "x"));

```

[More Info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## Tail Call Optimization 
ES6 should fix ensure tail calls does not generate stack overflow. (Not all implementations work).

```javascript
function factorial(n, acc = 1) {
   
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}
console.log(factorial(10))
console.log(factorial(100))
console.log(factorial(1000))
console.log(factorial(10000))
console.log(factorial(100000))
console.log(factorial(1000000))
```
