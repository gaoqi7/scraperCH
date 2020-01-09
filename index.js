const cheerio = require("cheerio");
const axios = require("axios");
const async = require("async");
const fs = require("fs");

fs.mkdirSync("download", { recursive: true }, err => {
  if (err) throw err;
});
axios
  .get("https://coursehunter.net/course/es6-for-everyone")
  .then(response => {
    const $ = cheerio.load(response.data);
    const result = [];
    $(".lessons-item").map(function(el) {
      let u = $(this)
        .children()
        .filter(function(child) {
          return $(this).attr("itemprop") === "contentUrl";
        })
        .attr("href");
      let n = $(this)
        .children()
        .filter(function(child) {
          return $(this).attr("class") === "lessons-name";
        })
        .text();
      result.push({ name: n, url: u });
    });
    console.log(result);
    return result;
  })
  .then(contents => {
    let contentsIndexes = Object.keys(contents);
    async.map(contentsIndexes, contentIndex => {
      axios
        .get(contents[contentIndex].url, { responseType: "stream" })
        .then(videoFile =>
          videoFile.data.pipe(
            fs.createWriteStream(
              `./download/${parseInt(contentIndex) + 1}.${
                contents[contentIndex].name
              }.mp4`
            )
          )
        );
    });
  });
