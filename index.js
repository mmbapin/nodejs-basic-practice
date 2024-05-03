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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  
  return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server =  http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true)

  if(pathname === '/' || pathname === '/overview'){
    res.writeHead(200, {'Content-type': 'text/html'});

    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
    res.end(output);
  }else if(pathname === '/product'){
    res.writeHead(200, {'Content-type': 'text/html'});
    const prod = dataObj[query.id];
    const output = replaceTemplate(tempProduct, prod);

    res.end(output);
  }else if(pathname === '/api'){
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



