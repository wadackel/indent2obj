indent2obj
==========

[![Build Status](http://img.shields.io/travis/tsuyoshiwada/indent2obj.svg?style=flat-square)](https://travis-ci.org/tsuyoshiwada/indent2obj)


Hierarchy expressed by the indent is converted into the JavaScript object.


## Install

### npm

```
$ npm install indent2obj
```

### bower

```
$ bower install indent2obj
```

### Basic

1. Download the [indent2obj.min.js](https://raw.githubusercontent.com/tsuyoshiwada/indent2obj/master/indent2obj.min.js).  
2. Load it in the script tag.


```html
<script type="text/javascript" src="indent2obj.js"></script>
```



## Usage

`input` looks like this.

```
depth1
  depth2
  depth2
    depth3
depth1
depth1
  dpeth2
```

The result is as follows.

```javascript
var results = indent2obj(input);

console.log(results);
/*
[
  {
    name: "depth1",
    children: [
      {
        name: "depth2",
        children: []
      },
      {
        name: "depth2",
        children: [
          {
            name: "depth3",
            children: []
          }
        ]
      }
    ]
  },
  {
    name: "depth1",
    children: []
  },
  {
    name: "depth1",
    children: [
      {
        name: "depth2",
        children: []
      }
    ]
  }
]
*/
```


### Change indent types

The default is to use 2 spaces.  
If you want to the tab, Do the following.

```javascript
indent2obj(input, "\t");
```

In the case of the 4 spaces.

```javascript
indent2obj(input, "    ");
```


## Settings

```javascript
indent2obj.defaultIndent = "  ";

indent2obj.keys = {
  name: "name",
  children: "children"
};
```



## Browser Support

* IE6 +
* Chrome
* Firefox
* Safari
* iOS
* Android


## License
Released under the [MIT Licence](https://raw.githubusercontent.com/tsuyoshiwada/indent2obj/master/LICENSE)


## Author
[tsuyoshi wada](https://github.com/tsuyoshiwada/)
