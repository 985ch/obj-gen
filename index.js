'use strict';

function generateObject(parent, generator, members) {
  for (const member of members) {
    const func = generator(member);
    if (typeof member === 'string') {
      parent[member] = func;
    } else if (typeof member.$key === 'string') {
      parent[member.$key] = func;
    } else {
      throw new Error('invalid $key');
    }
  }
  return parent;
}

function generate(config, parent = {}) {
  if (config.$generator) {
    if (!config.$members) throw new Error('invalid $members');
    generateObject(parent, config.$generator, config.$members);
  } else {
    for (const key in config) {
      parent[key] = generate(config[key]);
    }
  }

  return parent;
}

module.exports = generate;
