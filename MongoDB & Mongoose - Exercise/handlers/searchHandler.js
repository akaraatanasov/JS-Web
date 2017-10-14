const fs = require('fs')
const Tag = require('./../models/TagSchema')
const Image = require('./../models/ImageSchema')

let displayHtml = (res, images) => {
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
}

let noFoundTags = (res, tag) => {
  if (tag === null) {
    fs.readFile('views/results.html', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let notFound = '<h1>404 No Tags Were Found</h1>';
      data = data.toString()
        .replace("<div class='replaceMe'></div>", notFound);

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  }
}

let fixDate = (images) => {
  for (let image of images) {
    image.date = image.date.setHours(3);
    image.date = image.date.setMinutes(0);
    image.date = image.date.setSeconds(0);
    image.date = image.date.setMilliseconds(0);
  }
}

module.exports = (req, res) => {

  let beforeDate = req.pathquery.beforeDate;
  let afterDate = req.pathquery.afterDate;
  let minDate = new Date(beforeDate);
  let maxDate = new Date(afterDate);

  let limit = Number(req.pathquery.Limit);
  let tagInput = req.pathquery.tagName;

  if (limit === 0) {
    limit = 10;
  }

  if (req.pathname === '/search') {
    if (tagInput !== "Write tags separted by ," && beforeDate && afterDate) {
      Tag.findOne({ tagName: tagInput }).then((tag) => {
        noFoundTags(res, tag);
        let tagId = tag._id.toString();
        Image
          .find({ tags: tagId })
          .sort({ date: -1 })
          .limit(limit)
          .then((images) => {
            fixDate(images);
            images = images.filter(d => d.date > maxDate && d.date < minDate);
            displayHtml(res, images);
          });
      }).catch((err) => {
        console.log(err);
        return;
      });
    } else if (tagInput !== "Write tags separted by ," && beforeDate && !afterDate) {
      Tag.findOne({ tagName: tagInput }).then((tag) => {
        noFoundTags(res, tag);
        let tagId = tag._id.toString();
        Image
          .find({ tags: tagId })
          .sort({ date: -1 })
          .limit(limit)
          .then((images) => {
            fixDate(images);
            images = images.filter(d => d.date < minDate);
            displayHtml(res, images);
          });
      }).catch((err) => {
        console.log(err);
        return;
      });
    } else if (tagInput !== "Write tags separted by ," && !beforeDate && afterDate) {
      Tag.findOne({ tagName: tagInput }).then((tag) => {
        noFoundTags(res, tag);
        let tagId = tag._id.toString();
        Image
          .find({ tags: tagId })
          .sort({ date: -1 })
          .limit(limit)
          .then((images) => {
            fixDate(images);
            images = images.filter(d => d.date > maxDate);
            displayHtml(res, images);
          })
      }).catch((err) => {
        console.log(err);
        return;
      });
    } else if (tagInput !== "Write tags separted by ," && !beforeDate && !afterDate) {
      Tag.findOne({ tagName: tagInput }).then((tag) => {
        noFoundTags(res, tag);
        let tagId = tag._id.toString();
        Image
        .find({ tags: tagId })
        .sort({ date: -1 })
        .then((images) => {
          displayHtml(res, images);
        });
      }).catch((err) => {
        console.log(err);
        return;
      });
    }
    else {
      Image.find({}).then((images) => {
        displayHtml(res, images);
      }).catch((err) => {
        console.log(err);
        return;
      });
    }
  } else {
    return true;
  }
}

/*
module.exports = (req, res) => {
  if (req.pathname === '/search') {
   console.log(req.pathquery)

   Tag.find({}).populate('images').then((data) => {
     console.log(data)
     let images = []

     for (let tag of data) {
       for (let elem of tag.images) {
         images.push(elem)
       }
     }

     let uniqueArray = images.filter(function(elem, pos) {
       return images.indexOf(elem) == pos;
     })

     fs.readFile('./views/results.html', (err, html) => {
       if (err) {
         console.log(err)
         return
       }

       res.writeHead(200, {
         'Content-Type': 'text/html'
       })

       let resultString = ''
       for (let singleImage of images) {
          resultString += `<fieldset id => <legend>${singleImage.imageTitle}:</legend> 
          <img src="${singleImage.imageUrl}">
          </img><p>${singleImage.description}<p/>
          <button onclick='location.href="/delete?id=${singleImage._id}"'class='deleteBtn'>Delete
          </button> 
          </fieldset>` 
       }

       res.end(html.toString().replace("<div class='replaceMe'></div>", resultString))
     })

   })
  } else {
    return true
  }
}

*/