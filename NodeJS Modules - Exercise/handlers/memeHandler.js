const fs = require('fs')
const db = require('./../config/dataBase')
const qs = require('querystring')
const url = require('url')
const formidable =  require('formidable')
const shortid = require('shortid')
const request = require('request')

const viewAllPath = './views/viewAll.html'
const viewAddPath = './views/addMeme.html'
const viewDetails = './views/details.html'

// Utilities
let defaultResponse = (res, data) => {
  res.writeHead(200, {
    'content-type':'text/html'
  });
  res.end(data);
}

let memeGenerator = (id, title, memeSrc, description, privacy) => {
  return {
    id: id,
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy,
    dateStamp: Date.now()
  };
}

let viewAll = (req, res) => {
  let memes = db.getDb();

  memes = memes.sort((a, b) => {
    return b.dateStamp - a.datadeStamp;
  }).filter((currentMeme) => {
    return currentMeme.privacy === 'on';
  })

  fs.readFile(viewAllPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let memeString = '';

    for (let meme of memes) {
      memeString += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
      </div>`;
    }

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeString);
    
    defaultResponse(res, data);
  });
}

let viewAddMeme = (req, res) => {
  fs.readFile(viewAddPath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    defaultResponse(res, data);
  });
}

let addMeme = (req, res) => {
  // parse the data
  let form = new formidable.IncomingForm()
  let dbEntries = db.getDb().length
  let dbLength = Math.ceil(dbEntries / 10)
  let dbPath = `./public/memeStorage/${dbLength}`
  let memeName = shortid.generate()
  let memeId = shortid.generate()
  let memePath = dbPath + '/' + memeName + '.jpg'

  fs.access(dbPath, err => {
    if (err) {
      fs.mkdir(dbPath);
    }
  
    form.on('error', err => {
      console.log(err);
    }).on('fileBegin', (name, file) => {
      file.path = memePath;
    });
  
    form.parse(req, function (err, fields, files) {
      let createdMeme = memeGenerator(
        memeId, 
        fields.memeTitle, 
        memePath, 
        fields.memeDescription, 
        fields.status
      );

      db.add(createdMeme);
      db.save().then(() => {
        viewAll(req, res, 'succ');
      });
    });
  });
}

let getDetails = (req, res) => {
  let targetedMemeId = qs.parse(url.parse(req.url).query).id;
  let targetedMeme = db.getDb().find((searched) => {
    return searched.id === targetedMemeId;
  });

  fs.readFile(viewDetails, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // only opens src in browser
    //<button><a href="${targetedMeme.memeSrc}">Download Meme</a></button>
    let path = '/download?id=' + qs.parse(url.parse(req.url).query).id;
    let replace = `<div class="content">
      <img src="${targetedMeme.memeSrc}" alt=""/>
      <h3>Title  ${targetedMeme.title}</h3>
      <p> ${targetedMeme.description}</p>
      <button><a href="${path}">Download Meme</a></button>
      </div>`;

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replace);
    defaultResponse(res, data);
  });
}

let downloadMeme = (req, res) => {
  let targetedMemeId = qs.parse(url.parse(req.url).query).id; 
  let targetedMeme = db.getDb().find((searched) => {
    return searched.id === targetedMemeId;
  });

  let file = targetedMeme.memeSrc;

  fs.readFile(file, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    data = `<div class="content">
    <img src="${file}" alt=""/>
    </div>`;

    defaultResponse(res, data);
  });
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
      getDetails(req, res)
  } else if (req.pathname.startsWith('/download')) {
      downloadMeme(req, res)
  } else {
    return true
  }
}