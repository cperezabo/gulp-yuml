#Gulp plugin for yUML

Please, visit the official project at [yuml.me](https://yuml.me)

##Install
```
npm install gulp-yuml --save-dev 
```

##Usage
```javascript
const yuml = require('gulp-yuml');

gulp.task("render-models", function () {
  gulp.src("models/*.yuml", {buffer: false})
    .pipe(yuml({type: "class"}))
    .pipe(gulp.dest("models/export"));
});
```

##Config defaults
```javascript
{
  format: "pdf", // png, pdf, jpeg, json, svg
  style: "scruffy", // nofunky, plain, scruffy
  scale: 150,
  type: "usecase", // usecase, class, activity
  dir: "LR", // LR, RL, TB
}
```