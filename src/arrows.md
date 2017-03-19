
## Arrow Functions

A short hand notation for `function()`, but it does not bind `this` in the same way.
Instead of `this` being binded to the function, it is binding to the contextual `this`.

```javascript
no-eval
var odds = evens.map(v => v + 1);  // no parentes and no brackets
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});
```

How does `this` work?


```javascript 
var object = {
    name: "Name", 
    arrowGetName: () => this.name,
    regularGetName: function() { return this.name },
    arrowGetThis: () => this,
    regularGetThis: function() { return this }
}

console.log(this.name)
console.log(object.arrowGetName());
console.log(object.arrowGetThis());
console.log(this)
console.log(object.regularGetName());
console.log(object.regularGetThis());
```

They work well with classes 

```javascript 
class someClass {
    constructor() {
        this.name = "Name"
    }

    testRegular() {
        return function() { return this }

    }

    testArrow() {
        return () => this.name;
    }
}

var obj = new someClass();

console.log(obj.name)
console.log(obj.testRegular()());
console.log(obj.testArrow()());
```