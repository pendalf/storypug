import path from 'path';
import fs from 'fs';
import loader from 'pug3-loader';
import { MIXINS_REGEXP } from './constants';

module.exports = function(src) {
  this.cacheable && this.cacheable();
  const matches = src.trim().match(MIXINS_REGEXP);
  const { includes = [] } = this.getOptions() || {};
  const includesNormalize = includes.map((include) => {
    const fileContent = fs.readFileSync(include);
    const conetnt = fileContent
      .toString()
      .replace(/include (.*)$/gm, (match, src) => {
        const url = path.resolve(path.dirname(include), src);
        return `include ${url}.pug`;
      });
    return `${conetnt}\n`;
  });
  const includesNormalizeStirng = includesNormalize.join('');
  if (!matches) {
    return loader.call(this, src);
  }
  const name = matches[1];
  return loader.call(
    this,
    `${includesNormalizeStirng}${src}\nif contents\n  +${name}(props)\n    | !{contents}\nelse\n  +${name}(props)\n`,
  );
};
