## The project is a web scraper for coursehunter.net; I use this project to learn [nodejs](https://nodejs.org), it is only used **For Educational Purposes**.

## How it works

1. Use node buildin function `fs.mkdirSync()` create a folder _download_ to storage the downloaded file.
2. Use package **`axios`** to download the HTML content and cheery pick the data from it with package **cheerio**.
3. Write the downloaded contents to file.

## Thanks

1. @bertyhell for the great [solution](https://github.com/caolan/async/issues/669#issuecomment-358962580) about `async.map` [index issue](https://github.com/caolan/async/issues/669)
2. Good explanation about the [stream](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/)
