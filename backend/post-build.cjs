const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const JavaScriptObfuscator = require('javascript-obfuscator');

const distPath = path.join(__dirname, 'dist');

const files = getFiles(distPath);

function getFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      files = files.concat(getFiles(filePath));
    } else if (filePath.endsWith('.js')) {
      files.push(filePath);
    }
  });
  return files;
}

async function prepareCode() {
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const result = JavaScriptObfuscator.obfuscate((await minify(code)).code, {
      deadCodeInjection: true,
    });

    if (result.error) {
      console.error(result.error);
    } else {
      fs.writeFileSync(file, result.getObfuscatedCode());
    }
  }
}

prepareCode();
