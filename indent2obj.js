/*!
 * indent2obj
 * 
 * @version 0.0.1
 * @license MIT
 * @author tsuyoshiwada
 * @url https://github.com/tsuyoshiwada/indent2obj
 */
(function(){
  "use strict";

  var root = this;


  function trim(input){
    return input.replace(/^\s+|\s+$/g, "");
  }


  function getNodes(rows, indent, depth, index){
    var children = [], i;

    for( i = index; i < rows.length; i++ ){
      var child = rows[i].split(indent),
          childDepth = child.length,
          childName = child[childDepth - 1],
          obj = {};

      if( trim(childName) === "" ) continue;

      if( depth > childDepth && i > index ) break;

      if( depth === childDepth ){
        obj[indent2obj.keys.name] = childName;
        obj[indent2obj.keys.children] = getNodes(rows, indent, depth + 1, i);
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

  /*global define */
  }else if( typeof define === "function" && define.amd ){
    define("indent2obj", indent2obj);

  }else{
    root.indent2obj = indent2obj;
  }

}.call(this));