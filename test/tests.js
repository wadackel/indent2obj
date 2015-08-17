QUnit.module("indent2obj");

QUnit.test("should be parsed.", function(assert){
  var result = indent2obj([
    ".",
    "  depth1",
    "    depth2",
    "    depth2",
    "      depth3",
    "  depth1  hoge",
    "  depth1",
    "    depth2",
    "      depth3",
  ].join("\n"));

  var expected = [
    {
      name: ".",
      children: [
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
          name: "depth1  hoge",
          children: []
        },
        {
          name: "depth1",
          children: [
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
        }
      ]
    }
  ];

  assert.deepEqual(result, expected);
});


QUnit.test("should be interpreting indents only tab.", function(assert){
  var result = indent2obj([
    "node1",
    "\tnode2",
    "  node3",
    "\t  node4\tnode4-hoge",
    "\t\tnode5",
  ].join("\n"), "\t");

  var expected = [
    {
      name: "node1",
      children: [
        {
          name: "node2",
          children: []
        }
      ]
    },
    {
      name: "  node3",
      children: [
        {
          name: "  node4\tnode4-hoge",
          children: [
            {
              name: "node5",
              children: []
            }
          ]
        }
      ]
    }
  ];

  assert.deepEqual(result, expected);
});


QUnit.test("should be object key name is changed.", function(assert){

  var defaults = {
    name: indent2obj.keys.name,
    children: indent2obj.keys.children
  };

  indent2obj.keys = {
    name: "key",
    children: "contents"
  };

  var result = indent2obj([
    "depth1"
  ].join("\n"));

  var expected = [
    {
      key: "depth1",
      contents: []
    }
  ];

  indent2obj.keys.name = defaults.name;
  indent2obj.keys.children = defaults.children;

  assert.deepEqual(result, expected);
});