// @flow

import test from 'tape-cup';
import Plugin from '../index.js';

test('fusion-tokens exports', t => {
  if (__NODE__) {
    t.ok(Plugin, 'exports Plugin');
  }
  t.end();
});
