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

const newConfig = {
  $generator: (list, { myname }) => {
    return function(name) {
      console.log(`${myname} ${list[1]} ${name}`);
    };
  },
  $keygen: member => member[0],
  $members: [[ 'play', 'play games with' ], [ 'work', 'work with' ]],
  myname: '985ch',
};

let caller = null;
describe('Test', function() {
  it('Create', function() {
    caller = generate(config);

    caller.greet.hello('sachiko');
    caller.greet.hi('momoka');
    caller.work.projectA.test();
    caller.work.projectA.run();
    caller.work.projectA.path = './obj-gen';
    caller.work.projectA.test();
  });
  it('Addition', function() {
    generate(newConfig, caller);
    caller.play('momoka');
    caller.work('sachiko');
  });
});
