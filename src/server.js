/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {createPlugin} from 'fusion-core';
import type {FusionPlugin} from 'fusion-core';
import type {PluginServiceType} from './types.js';

const plugin =
  __NODE__ &&
  createPlugin({
    provides() {
      return null;
    },
    middleware() {
      return async (ctx, next) => {
        if (ctx.element) return next();
        return next();
      };
    },
  });

export default ((plugin: any): FusionPlugin<empty, PluginServiceType>);
