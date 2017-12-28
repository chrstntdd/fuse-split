const {
  FuseBox,
  EnvPlugin,
  CSSPlugin,
  SVGPlugin,
  SassPlugin,
  PostCSSPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  CSSResourcePlugin,
  ImageBase64Plugin,
  Sparky
} = require('fuse-box');
const path = require('path');
const express = require('express');
const purify = require('purify-css');

const POSTCSS_PLUGINS = [
  require('cssnano')({
    autoprefixer: {
      browsers: [
        'Chrome >= 52',
        'FireFox >= 44',
        'Safari >= 7',
        'last 4 Edge versions'
      ],
      add: true
    }
  })
];

let producer;
let isProduction = false;

Sparky.task('build', () => {
  const fuse = FuseBox.init({
    homeDir: './src',
    output: './dist/$name.js',
    log: true,
    sourceMaps: !isProduction,
    target: 'browser@es5',
    experimentalFeatures: true,
    cache: true,
    tsConfig: './tsconfig.json',
    plugins: [
      [
        SassPlugin(),
        PostCSSPlugin(POSTCSS_PLUGINS),
        !isProduction &&
          CSSResourcePlugin({
            inline: true
          }),
        isProduction
          ? CSSPlugin({
              group: 'bundle.css',
              inject: false,
              outFile: `dist/bundle.css`
            })
          : CSSPlugin()
      ],
      SVGPlugin(),
      isProduction
        ? WebIndexPlugin({
            template: './src/index.html',
            path: '/dist',
            title: 'TEST'
          })
        : WebIndexPlugin({
            template: './src/index.html',
            title: 'TEST'
          }),
      ImageBase64Plugin({
        useDefault: true
      }),
      isProduction &&
        QuantumPlugin({
          removeExportsInterop: false,
          bakeApiIntoBundle: 'vendor',
          uglify: true,
          treeshake: true
        })
    ]
  });

  /* Configure dev server */
  if (isProduction === false) {
    fuse.dev({ root: false, open: true }, server => {
      const dist = path.join(__dirname, '/dist');
      const app = server.httpServer.app;
      app.use(express.static(dist));
      app.get('*', (req, res) => {
        res.sendFile(path.join(dist, '/index.html'));
      });
    });
  }
  /* Vendor dependencies */
  const vendor = fuse.bundle('vendor').instructions('~ index.tsx');

  /* Main bundle */
  const app = fuse
    .bundle('app')
    .splitConfig({
      browser: '/dist/',
      server: 'dist/'
    })
    .instructions('!> [index.tsx]');
  if (!isProduction) {
    app.watch();
    app.hmr();
  }

  return fuse.run();
});

/* Build tasks */
Sparky.task('clean', () => Sparky.src('./dist/*').clean('./dist/'));
Sparky.task('set-production-env', () => (isProduction = true));

Sparky.task('purify-css', () => {
  console.log('purifying...');
  let content = ['**/src/*.tsx'];
  let css = ['./dist/bundle.css'];
  let options = {
    output: 'dist/pure.css',
    minify: true
  };
  purify(content, css, options, results => {
    console.info('PURE AS HELL BUD', results);
  });
});

/* yarn c:dev */
Sparky.task('default', ['clean', 'build'], () =>
  console.info('Development server is live. 👏 GET 👏 TO 👏WORK!')
);

/* yarn c:prod */
Sparky.task(
  'prod',
  ['clean', 'set-production-env', 'build', 'purify-css'],
  () => console.info('🤠  READY FOR PROD, FAM 🤠')
);
