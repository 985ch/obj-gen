# obj-gen-9

![node version][node-image]
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[node-image]: https://img.shields.io/badge/node-%3E%3D8-blue.svg
[npm-image]: https://img.shields.io/npm/v/obj-gen-9.svg?style=flat-square
[npm-url]: https://npmjs.org/package/obj-gen-9
[travis-image]: https://img.shields.io/travis/985ch/obj-gen-9.svg?style=flat-square
[travis-url]: https://travis-ci.org/985ch/obj-gen-9
[codecov-image]: https://img.shields.io/codecov/c/github/985ch/obj-gen-9.svg?style=flat-square
[codecov-url]: https://codecov.io/github/985ch/obj-gen-9?branch=master
[david-image]: https://img.shields.io/david/985ch/obj-gen-9.svg?style=flat-square
[david-url]: https://david-dm.org/985ch/obj-gen-9
[download-image]: https://img.shields.io/npm/dm/obj-gen-9.svg?style=flat-square
[download-url]: https://npmjs.org/package/obj-gen-9

This module allows you to generate objects based on the generator and JSON.

## [中文说明](./README.zh_CN.md)
## Install

```bash
$ npm i obj-gen-9 --save
```

## Usage
```js
'use strict';

const generate = require('obj-gen-9');

const config = {
  $generator: text => {
    return function(name) {
      console.log(text + ' ' + name + '!');
    };
  },
  $members: [ 'hello', 'hi' ],
};

const greet = generate(config);

greet.hello('sachiko');
greet.hi('momoka');
```
```js
'use strict';

const generate = require('obj-gen-9');

const config = {
  project: {
    $generator: (obj, config) => {
      if (obj.cmd) {
        return function() {
          console.log(config.projectName);
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
    projectName: 'TestProject',
  },
};

const work = generate(config);

work.project.test();
work.project.run();
work.project.path = './obj-gen';
work.project.test();
```
More usage can be found in [test.js](./test.js)

## Attributes

| name | format | description |
|:-----|:-------|:------------|
| $generator | (member, config)=>{} | Generator, when there is this property under the object, it will generate an object based on $members |
| $keygen | (obj)=>{} | Key generator, when member is an object, calculate the key according to member, the default is (obj)=>obj.$key |
| $members | Array | Each object in the array will become the member of $generator | 
| $key | String | When $keygen is not specified, member defaults to $key as key |

## Unit tests

```sh
npm test
```

## License

[MIT](LICENSE)<br />
This README was translate by [google](https://translate.google.cn)
