const fs = require("fs");
const {randomString, randomize} = require("./util.js");

const audioDir = __rootdir + "/public/audio";

const data = {}
const nameMap = {};
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

const getSample = type => {
  const samples = data[type];

  const curr = samples[Math.floor(samples.length * Math.random())];

  return {
    url:  "/music/" + curr.name,
    name: curr.name
  }
}

const controlSample = () => {
  return randomize([getSample("real"), getSample("baseline")]);
}

const testSample = () => {
  return randomize([getSample("real"), getSample("generated")]);
}

module.exports = {controlSample, testSample, nameMap};