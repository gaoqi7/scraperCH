const cheerio = require("cheerio");
const axios = require("axios");
const async = require("async");
const fs = require("fs");
// Make a folder "First"
// That is why I need use mkdirSync
fs.mkdirSync("download", { recursive: true }, err => {
  if (err) throw err;
});
// Parse the HTML file and cherry pick data from it
// We need file name and file url in this case
axios
  .get("https://coursehunter.net/course/full-stack-prodvinutyy-react-graphql")
  .then(response => {
    const $ = cheerio.load(response.data);
    const result = [];
    $(".lessons-item").map(function(el) {
      // Pick the URL
      let u = $(this)
        .children()
        .filter(function(child) {
          return $(this).attr("itemprop") === "contentUrl";
        })
        .attr("href");
      // Pick the name
      let n = $(this)
        .children()
        .filter(function(child) {
          return $(this).attr("class") === "lessons-name";
        })
        .text();
      result.push({ name: n, url: u });
    });
    return result;
  })
  .then(contents => {
    // I want to include the index nmuber as part of file name for sorting purpose
    // But package async doesn't map the index
    // I have to use Object.keys and ask async to map the index
    let contentsIndexes = Object.keys(contents);
    async.map(contentsIndexes, contentIndex => {
      axios
        // The option responseType is required
        .get(contents[contentIndex].url, { responseType: "stream" })
        .then(videoFile =>
          videoFile.data.pipe(
            fs.createWriteStream(
              //file name
              `./download/${parseInt(contentIndex) + 1}.${
                contents[contentIndex].name
              }.mp4`
            )
          )
        );
    });
  });
