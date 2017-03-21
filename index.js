const through = require('through2');
const toString = require('stream-to-string');
const util = require('util');
const unirest = require('unirest');

const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-yuml';

function gulpyUML(config) {

  const defaults = {
    format: "pdf", // png, pdf, jpeg, json, svg
    style: "scruffy", // nofunky, plain, scruffy
    scale: 150,
    type: "usecase", // usecase, class, activity
    dir: "LR", // LR, RL, TB
  };

  config = Object.assign({}, defaults, config || {});

  const transform = function (file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isBuffer()) {
      throw new PluginError(PLUGIN_NAME, "Buffers not supported yet!");
    }

    file.path = gutil.replaceExtension(file.path, "." + config.format);

    if (file.isStream()) {
      toString(file.contents).then((diagramText) => {
        diagramText = diagramText.replace(/(?:\r\n|\r|\n)/g, ',');

        let url = util.format("http://yuml.me/diagram/%s;dir:%s;scale:%s/%s/%s.%s", config.style, config.dir, config.scale, config.type, diagramText, config.format);

        const Request = unirest.get(url);
        const outStream = file.contents = through();
        Request.stream().end().pipe(outStream);
        this.push(file);
        cb();
      });
    }
  };

  return through.obj(transform);
}

// Exporting the plugin main function
module.exports = gulpyUML;