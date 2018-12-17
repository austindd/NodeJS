## Learning Node.JS

## OBJECTIVES

### PART 1

1. Create a NodeJS project using `npm init`.
2. Create a folder in your project called `server`.
3. Create a JavaScript file in the `server` folder named `server.js`.
4. In `server.js`
    * Import (require) `path` and `fs`.
    * Create an array consisting of at least 5 chirp objects.
    * Write the array to a file in the root of the project called `chirps.json`.
    * Add code to `server.js` that reads the file and outputs the chirps to the console

### PART 2

1. Install `request-promise` from npm and save it to your package.json file.
2. Create a JavaScript file in the root of your project called `reddit.js`.
3. Use request-promise to retreive articles from https://reddit.com/r/popular.json.
4. Extract from each article title, url, and author
5. Push each extracted article to an array.
6. Write the array to a file in the root of your project called `popular-articles.json`.

### ADVANCED

1. Create a JavaScript file named `popular-downloader.js`.
2. Create a directory in the root of your project named `downloads`.
3. Using `request-promise`, pull articles from https://reddit.com/r/popular.json.
4. If the article is a `.jpg`, `.gif`, or a `.png` [(hint)](https://nodejs.org/dist/latest-v10.x/docs/api/path.html#path_path_extname_path]):
5. Use `request-promise` to download the media.
6. Write each download to a file (named the `id` of the article) in the `downloads` directory.
