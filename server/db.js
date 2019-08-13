const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(__rootdir + '/ext/db.json')
const db = low(adapter);
db.defaults({ votes: [] })
  .write()

const model = (time, ip, chosen, notChosen) => {
  return {time, ip, chosen, notChosen};
}

const log = (ip, chosen, notChosen) => {
  const time = Date.now();

  db.get("votes")
    .push(model(time, ip, chosen, notChosen))
    .write();
}

module.exports = {log};
