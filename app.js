var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    util = require('util')
    router = require('routes')();

// 根据后缀名，返回对应的 mime-type
var mime = {
  'js': 'text/javascript',
  'css': 'text/css',
  'html': 'text/html',
  'json': 'application/json',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif',
  'mp4': 'video/mp4'
};

// 返回漫画目录
router.addRoute('/api/list/', function (req, res, match) {
  var header = {'Content-Type': 'application/json; charset=utf-8'},
      comicDir = './public/comic/',
      comicList = [];
  
  fs.readdir(comicDir, function (err, files) {
    if(err) {
      res.writeHead(500, header);
      res.end(JSON.stringify({status: 'error'}));
      return;
    } 

    files.forEach(function (file) {
      if(fs.lstatSync(path.join(__dirname, comicDir, file)).isDirectory()) {
        comicList.push(file);
      }
    });

    res.writeHead(200, header);
    res.end(JSON.stringify({
      status: 'success',
      data: comicList
    }));
  });
});

// 返回一个漫画目录的所有图片
router.addRoute('/api/comic/:dir', function (req, res, match) {
  var header = {'Content-Type': 'application/json; charset=utf-8'},
      comicDir = './public/comic/' + match.params.dir,
      imageList = [];

  fs.readdir(comicDir, function (err, files) {
    if(err) {
      res.writeHead(500, header);
      res.end(JSON.stringify({status: 'error'}));
      return;
    }

    files.forEach(function (file) {
      if(fs.lstatSync(path.join(__dirname, comicDir, file)).isFile()) {
        imageList.push('/comic/' + match.params.dir + '/' + file);
      }
    });

    res.writeHead(200, header);
    res.end(JSON.stringify({
      status: 'success',
      data: imageList
    }));
  });

});

// 其他静态文件请求
router.addRoute('/*', function (req, res, match) {
  var pathname = req.url.split('?')[0],
    url = pathname === '/' ? '/index.html' : pathname,
    ext = url.substr(url.lastIndexOf('.') + 1, url.length),
    filePath = path.join(__dirname, './public' + decodeURI(url));

  if (ext === 'mp4') {
    var stat = fs.statSync(filePath)
    var total = stat.size
    if (req.headers['range']) {
      var range = req.headers.range;
      var parts = range.replace(/bytes=/, "").split("-");
      var partialstart = parts[0];
      var partialend = parts[1];

      var start = parseInt(partialstart, 10);
      var end = partialend ? parseInt(partialend, 10) : total-1;
      var chunksize = (end-start)+1;
      console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

      var file = fs.createReadStream(filePath, {start: start, end: end});
      res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
      file.pipe(res);
    } else {
       console.log('ALL: ' + total);
      res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('404! not found:' + url);
      }

      var mimeType = mime[ext] || 'text/html';
      res.writeHead(200, {
        'Content-Type': mimeType
      });
      res.end(data);
    });
  }
});


// 创建服务器
var server = http.createServer(function (req, res) {
  var match = router.match(url.parse(req.url).pathname);

  if(match) {
    match.query = url.parse(req.url, true).query || {};
    match.fn(req, res, match);
  } else {
    res.writeHead(404);
    res.end('404 not found');
  }
});

server.listen(3000);
console.log('serve start at port:' + 3000);