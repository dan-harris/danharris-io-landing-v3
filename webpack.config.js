const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
/**
 * postcss plugins
 */
const postcssAutoPrefixer = require("autoprefixer");
const postcssCustomProperties = require("postcss-custom-properties");

/**
 * set development mode
 */
const isDev = process.env.NODE_ENV !== "prod";

/**
 * webpack config
 */
module.exports = {
  entry: {
    ["landing-page"]: "./src/landing-page.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist")
  },
  devtool: isDev && "source-map",
  devServer: {
    port: 7134,
    open: true
  },
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: [
          !isDev ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
              minimize: !isDev,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: isDev,
              plugins: [
                 postcssAutoPrefixer,
                  postcssCustomProperties({
                    importFrom: "./src/styles/_root.css",
                    preserve: false
                  })
                //require("postcss-modules")({
                //generateScopedName: "[hash:base64:5]"
                //   getJSON: function(cssFileName, json) {
                //     var path = require("path");
                //     var cssName = path.basename(cssFileName, ".css");
                //     var jsonFileName = path.resolve(
                //       "./dist/" + cssName + ".json"
                //     );
                //     fs.writeFileSync(jsonFileName, JSON.stringify(json));
                //   }
                // })
              ]
            }
          }
        ]
      },
      // images & files
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/",
              useRelativePath: true
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({}),
    new HtmlWebpackPlugin({
      template: "./src/landing-page.html",
      minify: !isDev && {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new StyleExtHtmlWebpackPlugin({
      enabled: !isDev,
      minify: {
        level: {
          1: {
            all: true
          },
          2: {
            all: true
          }
        }
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ["landing-page.js"]
    }),
    new CopyWebpackPlugin([{ from: "./src/assets", to: "./" }])
  ]
};
