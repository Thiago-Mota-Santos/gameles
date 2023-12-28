// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("node:fs");

const dir = "__generated__";

const relayPackages = [
  {
    name: "web",
    path: `./src/${dir}`,
  },
];

void (async () => {
  relayPackages.map((package) => {
    if (!fs.existsSync(package.path)) {
      console.log(`__generated__ folder created on ${package.name}`);
      fs.mkdirSync(package.path);
    } else {
      console.log(`__generated__ folder exists on ${package.name}`);
    }
  });

  process.exit(0);
})();
