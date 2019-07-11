const fs = require("fs");
const {randomString} = require("./util.js");

const audioDir = __rootdir + "/public/audio";

const data = {}
const nameMap = {};
const nameToPath = {};
fs.readdirSync(audioDir).forEach(folder => {
  const curr = [];
  
  fs.readdirSync(audioDir + "/" + folder).forEach(audioFile => {
    const audioPath = audioDir + "/" + folder + "/" + audioFile;
    const name = randomString();

    curr.push({
      name,
      folder,
      audioPath,
    });

    nameMap[name] = audioPath;
  });

  data[folder] = curr;
});

module.exports = {data, nameMap};