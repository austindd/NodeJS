const path = require('path');
const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const https = require('https');
const MyUtils = require('./shared/austin-utils');


let downloadsPath = path.join(__dirname, './downloads/'); // Path to 'downloads' folder

MyUtils.rmDirContents(downloadsPath); // Remove contents of the downloads folder before downloading

rp('https://reddit.com/r/popular.json')
    .then((body) => {
        // Defining arrays to contain scraped web data
        let popularPosts = [];
        let popularImagePosts = [];
        // Other variables
        let downloadFilePath;
        let listIDPrefix = "pop";

        // Parse Reddit's JSON file, and create a new object to store data we care about
        JSON.parse(body).data.children.forEach((item, i) => {

            let articleData = {
                key: MyUtils.uuidv4(),
                listID: String(listIDPrefix + String(i)),
                title: String(item.data.title),
                content_categories: MyUtils.arrayElementsToString(item.data.content_categories),
                permalink: String(item.data.permalink),
                url: String(item.data.url),
                thumbnail: String(item.data.thumbnail),
            };
            popularPosts.push(articleData);

            // If the content URL for the post refers to an image, then push that article data to popularImagePosts
            let articleFileExt = MyUtils.getFileExt(articleData.url);

            if (articleFileExt === ('jpg' || 'jpeg' || 'png' || 'gif')) {
                console.log("\r\nList ID: ", articleData.listID, "\r\nURL File Extension: ", MyUtils.getFileExt(articleData.url));
                popularImagePosts.push(articleData);

                // Create file path for new download file
                downloadFilePath = path.join(downloadsPath, `${articleData.listID}.${articleFileExt}`);

                // Create a write stream to file path
                let file = fs.createWriteStream(downloadFilePath);
                https.get(articleData.url, (res) => {
                    res.pipe(file);
                });


            };

        });
    })
    .catch((err) => console.log(err));
