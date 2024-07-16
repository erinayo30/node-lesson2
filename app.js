// console.log("Learning Backend Dev");
const readline = require("readline");
// Reading Input and writing on the terminal interface
/*^const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Welcome please enter your name:", (name) => {
  console.log("you are welcome :" + name);
  rl.close();
});
rl.on("close", () => {
  console.log("Interface closed");
  process.exit(0);
});
*/

// Reading and writing file Sychronusly
const fs = require("fs");
// let textIn = fs.readFileSync("Files/input.txt", "utf-8");
// console.log(textIn);

// let content = `Data read from input.txt: ${textIn}.\nDate created ${new Date()}`;
// fs.writeFileSync("./Files/output.txt", content);

// Writing and Reading file Asychronously
/*fs.readFile("./Files/start.txt", "utf-8", (error, data) => {
  console.log(data);
  fs.readFile(`./Files/${data}.txt`, "utf-8", (error1, data1) => {
    console.log(data1);
    fs.readFile("./Files/append.txt", "utf-8", (error3, data3) => {
      console.log(data3);
      fs.writeFile(
        "./Files/output.txt",
        `${data1}\n\n${data3}\n\nDate created${new Date()}`,
        () => {
          console.log("Put in more efforts");
        }
      );
    });
  });
});
*/
// creating and starting a server
const http = require("http");
const html = fs.readFileSync("./Template/index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHTML = fs.readFileSync("./Template/product-list.html", "utf-8");

let productArray = products.map((prod) => {
  let output = productListHTML.replace("{{%image}}", prod.productImage);
  output = output.replace("{{%Name%}}", prod.name);
  output = output.replace("{{%modelName%}}", prod.modeName);
  output = output.replace("{{%modelNumber%}}", prod.modelNumber);
  output = output.replace("{{%Description%}}", prod.Description);
  output = output.replace("{{%modelPrice%}}", prod.price);
  output = output.replace("{{%SIZE%}}", prod.size);
  output = output.replace("{{%CAMERA%}}", prod.camera);
  output = output.replace("{{%COLOR%}}", prod.color);
  return output;
});
const server = http.createServer((request, response) => {
  // Routing
  let path = request.url;
  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200, {
      "content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the Home Page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200, {
      "content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the About Page"));
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200, {
      "content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the Contact Page"));
  } else if (path.toLocaleLowerCase() === "/products") {
    let productRes = html.replace("{{%CONTENT%}}", productArray.join(""));
    response.writeHead(200, { "content-Type": "text/html" });
    response.end(productRes);
    // console.log(productArray.join(""));
    // fs.readFile("./Data/product.json", "utf-8", (error, data) => {
    //   let products = JSON.parse(data);
    //   response.end(data);
    // });
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}}", "Error 404:Page not found"));
  }
});
// Starting Server
server.listen(8000, "127.0.0.1", () => {
  console.log("server started");
});
