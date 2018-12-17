const path = require('path');
const fs = require('fs');
const request = require('request');
const MyNodeUtils = require('./shared/austin-utils');

dataPath = path.join(__dirname, '../popular-articles.json')

// Requesting popular Reddit headlines
request('https://reddit.com/r/popular.json', (err, res, body) => {

    if (err) console.log(err);

    let popularArray = [];
    let jsonObj = [];
    let keyPrefix = "pop";

    let jpgPosts1 = [];

    JSON.parse(body).data.children.forEach((item, i) => {
        let articleData = {
            key: String(keyPrefix + String(i)),
            title: String(item.data.title),
            content_categories: MyNodeUtils.arrayElementsToString(item.data.content_categories),
            permalink: String(item.data.permalink),
            url: String(item.data.url),
            thumbnail: String(item.data.thumbnail),
        };
        popularArray.push(articleData);


        console.log(MyNodeUtils.getFileExt(articleData.url));

    });
    jsonObj = { 'popular': popularArray };
    jsonObjJPG = { 'jpg_only': jpgPosts1 };

    fs.writeFileSync(dataPath, JSON.stringify(jsonObj));

    // console.log(
    //     "\n\n",
    //     "------ POPULAR REDDIT ARTICLES ------",
    //     "\n",
    //     jsonObj
    // );

    // console.log(
    //     "\n\n",
    //     "------ POPULAR REDDIT ARTICLES WITH .JPG FILES ------",
    //     "\n",
    //     jsonObjJPG
    // );

});