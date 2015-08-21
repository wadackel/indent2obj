/*!
 * indent2obj
 * 
 * @version 0.0.3
 * @license MIT
 * @author tsuyoshiwada
 * @url https://github.com/tsuyoshiwada/indent2obj
 */
(function(root){
  "use strict";


  function trim(input){
    return input.replace(/^\s+|\s+$/g, "");
  }


  function createArray(value, length){
    var array = [], i;
    for( i = 0; i < length; i++ ) array.push(value);
    return array;
  }


  function parseChild(row, indent){
    var matches = row.match(new RegExp("^((?:" + indent + ")*)(.*)$")),
        results;

    if( matches[1] ){
      results = createArray("", matches[1].split(indent).length - 1);
      results.push(matches[2]);
    }else{
      results = [matches[2]];
    }

    return results;
  }


  function getNodes(rows, indent, depth, index){
    var keys = indent2obj.keys, children = [], i;

    for( i = index; i < rows.length; i++ ){
      var child = parseChild(rows[i], indent),
          childDepth = child.length,
          childName = child[childDepth - 1],
          obj = {};

      if( trim(childName) === "" ) continue;

      if( depth > childDepth && i > index ) break;

      if( depth === childDepth ){
        obj[keys.name] = childName;
        obj[keys.children] = getNodes(rows, indent, depth + 1, i);
        children.push(obj);
      }
    }

    return children;
  }


  function indent2obj(input, indent){
    if( trim(input) === "" ) return [];
    return getNodes(input.split("\n"), indent || indent2obj.defaultIndent, 1, 0);
  }


  // default settings
  indent2obj.defaultIndent = "  ";
  indent2obj.keys = {
    name: "name",
    children: "children"
  };


  // export modules
  if( typeof module === "object" && typeof module.exports === "object" ){
    module.exports = indent2obj;

  /* global define */
  }else if( typeof define === "function" && define.amd ){
    define("indent2obj", indent2obj);

  }else{
    root.indent2obj = indent2obj;
  }

}(this));