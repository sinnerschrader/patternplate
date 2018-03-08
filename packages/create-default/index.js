module.exports = createDefault;

const GITIGNORE = data => {
  return `
node_modules
*.log
`;
}

const PACKAGE = data => {
  return JSON.stringify({
    name: data.name,
    version: "1.0.0",
    license: "UNLICENSED",
    scripts: {
      start: "patternplate start"
    },
    devDependencies: {
      "@patternplate/cli": `^${data.cliVersion}`
    }
  }, null, "  ");
}

const README = data => {
  return `
> a patternplate project

# ${data.name}

This is the minimal template required for
a \`patternplate\` project.

* No \`patternplate.config.js\`, defaults apply
* Documentation at \`docs\` and \`README.md\`
* Pattern sources at \`lib\`
* Demos are plain HTML, CSS, JavaScript

## Getting started

\`\`\`bash
yarn
yarn patternplate
\`\`\

## Hello world pattern

This template contains a "Hello World" pattern.

Access it by navigating to [pattern/hello-world](./pattern/hello-world).
`;
}

const PATTERN_JSON = data => {
  return JSON.stringify({
    name: "hello-world",
    version: "1.0.0",
    patternplate: {
      displayName: "Hello World"
    }
  }, null, "  ");
};

const DEMO_JS = data => {
  return `
// lib/hello-world/demo.js
module.exports = {
  html: '<h1 class="hello-world" data-hello-world>Hello World</h1>',
  css: '.hello-world { font-family: sans-serif; color: cornflowerblue; cursor: pointer; }',
  default: function() {
    var el = document.querySelector("[data-hello-world]");
    var count = 0;
    el.addEventListener("click", function(e) {
      e.target.textContent = "Hello World, " + (++count);
    });
  }
};
`;
};

function createDefault(data, fs) {
  fs.writeFileSync("/.gitignore", GITIGNORE(data));

  fs.writeFileSync("/package.json", PACKAGE(data));
  fs.writeFileSync("/README.md", README(data));

  fs.mkdirpSync("/lib/hello-world");
  fs.writeFileSync("/lib/hello-world/package.json", PATTERN_JSON(data));
  fs.writeFileSync("/lib/hello-world/demo.js", DEMO_JS(data));

  return fs;
}

function list(fs, base) {
  return fs.readdirSync(base)
    .reduce((acc, name) => {
      const p = path.join(base, name);
      const stat = fs.statSync(p);
      if (stat.isFile()) {
        acc.push(p);
      } else {
        acc = acc.concat(list(fs, p));
      }
      return acc;
    }, []);
}