'use strict';

function getKey(obj) {
  return obj.$key;
}

function generateObject(parent, generator, members, key) {
  for (const member of members) {
    const func = generator(member);
    if (typeof member === 'string') {
      parent[member] = func;
    } else if (typeof key(member) === 'string') {
      parent[key(member)] = func;
    } else {
      throw new Error('invalid $key');
    }
  }
  return parent;
}

function generate(config, parent = {}) {
  if (config.$generator) {
    if (!config.$members) throw new Error('invalid $members');
    generateObject(parent, config.$generator, config.$members, config.$keygen || getKey);
  } else {
    for (const key in config) {
      parent[key] = generate(config[key]);
    }
  }

  return parent;
}

module.exports = generate;
