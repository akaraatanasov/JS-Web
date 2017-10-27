const formidable = require('formidable')
const fs = require('fs')
const Image = require('./../models/ImageSchema')
const Tag = require('./../models/TagSchema')

let render = (res) => {
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    let dispalyTags = ''

    Tag.find({}).then(tags => {
      for (let tag of tags) {
        dispalyTags += `<div class='tag' id="${tag._id}">${tag.tagName}</div>`
      }
      data = data
        .toString()
        .replace(`<div class='replaceMe'></div>`, dispalyTags)
      res.end(data)
    })
  })  
}

let addImage = (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }

    fields.tags = fields.tagsID.split(',')
    fields.tags.pop()
    delete fields.tagsID //tagsId

    Image.create(fields).then((image) => {
      let targetedTags = image.tags

      Tag.update(
        { _id: { $in: targetedTags } },
        { $push: { images: image._id } },
        { multi: true}
      ).then((resolve) => {
        console.log(resolve)
        render(res)
      }).catch((err) => {
        console.log(err)
        return
      })

      render(res) 
    })
  })
}

let deleteImg = (req, res) => {
  let id = req.pathquery.id;
  Image.findByIdAndRemove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    Image.find({}).then((images) => {

      fs.readFile('views/results.html', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        let resultStr = '';
        for (let image of images) {
          resultStr += `<fieldset id => <legend>${image.imageTitle}:</legend> 
                 <img src="${image.imageUrl}">
                 </img><p>${image.description}<p/>
                 <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                 </button> 
                 </fieldset>`;
        }
        data = data.toString()
          .replace("<div class='replaceMe'></div>", resultStr);

        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
      });
    }).catch((err) => {
      console.log(err);
      return;
    });
  });
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}