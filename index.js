'use strict';

function getKey(obj) {
  return obj.$key;
}

function generateObject(parent, config) {
  const keygen = config.$keygen || getKey;
  const gen = config.$generator;
  for (const member of config.$members) {
    const func = gen(member, config);
    if (typeof member === 'string') {
      parent[member] = func;
    } else if (typeof keygen(member) === 'string') {
      parent[keygen(member)] = func;
    } else {
      throw new Error('invalid $key');
    }
  }
  return parent;
}

function generate(config, parent = {}) {
  if (config.$generator) {
    if (!config.$members) throw new Error('invalid $members');
    generateObject(parent, config);
  } else {
    for (const key in config) {
      parent[key] = generate(config[key]);
    }
  }

  return parent;
}

module.exports = generate;
