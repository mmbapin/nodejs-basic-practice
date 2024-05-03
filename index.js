const fs = require('fs');
const http = require('http');
const url = require('url');

////FIles

// //Blocking, Synchronous
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn)
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log('File written !')

// //Non-Blocking, Asynchronous
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
//   console.log(data);
//   fs.readFile(`./starter/txt/${data}.txt`, 'utf-8', (err, data1) => {
//     console.log(data1);
//     fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data2) => {
//       console.log(data2);
//       fs.writeFile('./starter/txt/final.txt', `${data1}\n${data2}`, 'utf-8', err => {
//         console.log('Your file have been written.')
//       })
//     })
//   })
// })


////Servers
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server =  http.createServer((req, res) => {
  const pathName = req.url;
  if(pathName === '/' || pathName === '/overview'){
    res.end('This is the Overview !');
  }else if(pathName === '/product'){
    res.end('This is the Product');
  }else if(pathName === '/api'){
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(data)
  }else{
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found !</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
})



