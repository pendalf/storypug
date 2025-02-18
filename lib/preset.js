import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const dirnamePath = dirname(fileURLToPath(import.meta.url));

async function webpack(config, options = {}) {
  const {
    loaderOptions = {},
    include,
    babel = false,
    babelLoaderOptions,
  } = options;

  const loaders = [
    {
      loader: resolve(dirnamePath, './webpack-loader.js'),
      options: loaderOptions,
    },
  ];

  if (babel) {
    loaders.unshift({
      loader: 'babel-loader',
      options: babelLoaderOptions,
    });
  }

  config.module.rules.push({
    test: /\.pug$/,
    include: include,
    use: loaders,
  });

  return config;
}

export default { webpack };
