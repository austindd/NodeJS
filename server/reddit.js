const path = require('path');
const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const MyUtils = require('./shared/austin-utils');


const dataPath = {
    popularArticles: path.join(__dirname, '../popular-articles.json'),
    popularImageArticles: path.join(__dirname, '../popular-image-articles.json')
}

// Requesting popular Reddit headlines
request('https://reddit.com/r/popular.json', (err, res, body) => {
    if (err) console.log(err);

    // Defining arrays to contain scraped web data
    let popularPosts = [];
    let popularImagePosts = [];
    // Declaring JSON objects
    let popularPostsJSON;
    let popularImagePostsJSON;
    // Other variables
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
        if (MyUtils.getFileExt(articleData.url) === ('jpg' || 'jpeg' || 'png' || 'gif')) {
            console.log("\r\nList ID: ", articleData.listID, "\r\nURL File Extension: ", MyUtils.getFileExt(articleData.url));
            popularImagePosts.push(articleData);
        };

    });

    // Create JSON objects based on scraped web data
    popularPostsJSON = { 'popular': popularPosts };
    popularImagePostsJSON = { 'popular_images': popularImagePosts };

    // Write the article data objects to their respective JSON files
    fs.writeFileSync(dataPath.popularArticles, JSON.stringify(popularPostsJSON));
    fs.writeFileSync(dataPath.popularImageArticles, JSON.stringify(popularImagePostsJSON));

});

