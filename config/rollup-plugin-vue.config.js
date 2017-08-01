import each from 'lodash/each';
import path from 'path';
import fs from 'fs';
import less from 'less';

export const pack = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

function ensureDirectoryExistence(filePath) {
  const directory = path.dirname(filePath);
  if (directoryExists(directory)) {
    return true;
  }
  ensureDirectoryExistence(directory);
  fs.mkdirSync(directory);
}

function directoryExists(path) {
  try {
    return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
}

export default {
  compileTemplate: true,
  css(style, styles) {
    const projectDir = path.resolve(__dirname, '');
    const distDir = path.resolve(projectDir, 'dist/');
    const stylesDir = path.resolve(projectDir, 'dist/less/');
    const srcDir = path.resolve(projectDir, 'src/');
    const outputs = [];

    each(styles, (data) => {
      const filename = data.id
      const output = filename.replace(srcDir, '')
          .replace(/vue$/i, data.lang || 'less')
          .replace(/^\/|\/$/g, '');
      const dest = path.resolve(stylesDir, output);
      outputs.push(output);
      ensureDirectoryExistence(dest);
      fs.writeFile(dest, data.code, (err) => {
        if (err) throw err;
      });
    });

    fs.writeFile(
        path.resolve(distDir, `${pack.name}.less`),
        outputs.map((output) => `@import './less/${output.replace(/\.[a-z0-9]+$/i, '')}';`).join("\n"),
        (err) => {
          if (err) throw err;
        }
    );
    
    less.render(style, {
        compress: true          // Minify CSS output
      }, (err, output) => {
        if (err) throw err;

        const result = path.resolve(distDir, `${pack.name}.min.css`);
        fs.writeFile(result, output.css, (err) => {
          if (err) throw err;
        });
      });
    
    less.render(style, (err, output) => {
        if (err) throw err;

        const result = path.resolve(distDir, `${pack.name}.css`);
        fs.writeFile(result, output.css, (err) => {
          if (err) throw err;
        });
      });  
  },
  standalone: true, // custom option.
};
