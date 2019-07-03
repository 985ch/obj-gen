'use strict';

const generate = require('./');

const config = {
  project: {
    $generator: obj => {
      if (obj.cmd) {
        return function() {
          console.log('cd ' + this.path);
          console.log(obj.cmd);
        };
      }
      return obj.value;
    },
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
};

const work = generate(config);

work.project.test();
work.project.run();
work.project.path = './obj-gen';
work.project.test();
