'use strict';

const generate = require('./');

function genGreet(text) {
  return function(name) {
    console.log(text + ' ' + name + '!');
  };
}
function genProject(obj) {
  if (obj.cmd) {
    return function() {
      console.log('cd ' + this.path);
      console.log(obj.cmd);
    };
  }
  return obj.value;
}
const config = {
  greet: {
    $generator: genGreet,
    $members: [ 'hello', 'hi' ],
  },
  work: {
    projectA: {
      $generator: genProject,
      $members: [
        {
          $key: 'run',
          cmd: 'node index.js',
        }, {
          $key: 'test',
          cmd: 'node test.js',
        }, {
          $key: 'path',
          value: './',
        },
      ],
    },
  },
};

const caller = generate(config);

caller.greet.hello('sachiko');
caller.greet.hi('momoka');
caller.work.projectA.test();
caller.work.projectA.run();
caller.work.projectA.path = './obj-gen';
caller.work.projectA.test();

const newConfig = {
  $generator: doSth => {
    return function(name) {
      console.log(doSth + ' with ' + name);
    };
  },
  $members: [ 'play', 'work' ],
};

generate(newConfig, caller);
caller.play('momoka');
caller.work('sachiko');
