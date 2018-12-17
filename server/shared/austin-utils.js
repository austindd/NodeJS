const fs = require('fs');
let MyNodeUtils = module.exports = {};

// Works like fs.appendFile(), adding each element of 'data' to a new line in the file (using the 'a' flag)
MyNodeUtils.fileAppendNewLine = (filePath, data) => {
    let result = fs.createWriteStream(filePath, { flags: 'a' }).write(data.toString() + '\r\n');
    console.log(result.path);
    return result;
};


// Convert each element of an array into a string. Returns a new array.
MyNodeUtils.arrayElementsToString = (array = null) => {
    let result = [];
    if (array === null) {
        return null;
    }
    if (array != null && typeof (array) === 'object') {
        result = array.map((item) => {
            item != null ? String(item) : null;
        });
        return result;
    } else {
        console.log("\r\n", "-- [MyNodeUtils.arrayElementsToString] INVALID_ARGUMENT_TYPE_array -- \r\n");
        return false;
    }
};


// Accepts a JavaScript object.
// Returns true if object has zero propertiesof its own (excluding inherited properties).
// Returns false if object has any properties of its own (excluding inherited properties).
MyNodeUtils.isEmpty = (obj) => {
    for (let key in obj) {
        obj.hasOwnProperty(key) ? false : true;
    };
};


// Accepts a file name as a string.
// Returns the file extension as a string.
// If the optional callback function is specified, the result is passed as an argument for the callback.
MyNodeUtils.getFileExt = (fileName, callbackFn = null) => {
    let result = (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName);
    // return result;
    callbackFn ? () => {
        return callbackFn(result);
    } : () => {
        return result;
    };
    // if (callbackFn === null) {
    //     return result;
    // } else {
    //     return callbackFn(result);
    // };
};


// Accepts an individual string or an array of strings.
// Returns a new array of elements that meet the 'include' and/or 'exclude' conditions.
// If the optional callback function is specified, the result is passed as an argument for the callback.
MyNodeUtils.filterFileExt = (fileName, include = null, exclude = null, callback = null) => {

    let fileNameArray = [];
    let includeArray = [];
    let excludeArray = [];
    let resultArray = [];
    let inputChecklist = {
        includeOK: false,
        excludeOK: false,
        fileNameOK: false,
    };

    // ====================================== INCLUDE ======================================
    if (include != null) { // IF a value was passed to the 'include' argument
        // String?
        if (typeof (include) === 'string') { // IF 'include' is a string
            includeArray.push(include); // THEN make an array with one element
            inputChecklist.includeOK = true; // THEN validate 'include' parameter *******************************************
            // Array?
        } else if (isArray(include) === true) { // IF 'include' is an array
            include.forEach((item) => { // THEN loop through array
                if (typeof (item) === 'string') { // IF array element is a string
                    includeArray.push(item); // THEN push element to new array
                } else if (typeof (item) != 'string') { // IF array element is NOT a string
                    console.log( // THEN console log error and resume function
                        "\r\n",
                        "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                        "-- (ARG: 'include', ERROR: array_element_value_not_a_string",
                        "\r\n"
                    );
                    return false;
                };
            });
            if (includeArray.length < 0) { inputChecklist.includeOK = true }; // Validate include parameter *******************************************
            // Object?
        } else if (typeof (include) === 'object') { // IF 'include' is an object
            if (MyNodeUtils.isEmpty(include) === false) { // IF include object is NOT empty (has its own keys/properties)
                const includeProps = Object.getOwnPropertyNames(include); // THEN create new array of prop names (to serve as indices for a loop)
                includeProps.forEach((item) => { // THEN loop through object properties
                    if (typeof (include[item]) === 'string') { // IF object property value is a string
                        includeArray.push(include[item]); // THEN push element to new array
                    } else if (typeof (include[item]) != 'string') { // IF object property value is NOT a string
                        console.log( // THEN console log error and resume function
                            "\r\n",
                            "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                            "-- (ARG: 'include', ERROR: object_property_value_not_a_string)",
                            "\r\n"
                        );
                        return false;
                    }
                });
                if (includeArray.length < 0) { inputChecklist.includeOK = true }; // Validate include parameter *******************************************
            }
        } else { // IF the include is NOT a string, array, or object
            console.log( // THEN console log error and resume function
                "\r\n",
                "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                "-- (ARG: 'include', ERROR: object_property_value_invalid_data_type)",
                "\r\n"
            );
            includeArray = null; // THEN set 'includeArray' value to null
        };
    } else { // If 'include' parameter value is null
        includeArray = null; // THEN set 'includeArray' value to null
        inputChecklist.includeOK = false;
    };

    // ====================================== EXCLUDE ======================================
    if (exclude != null) { // IF a value was passed to the 'exclude' argument
        // String?
        if (typeof (exclude) === 'string') { // IF 'exclude' is a string
            excludeArray.push(exclude); // THEN make an array with one element
            inputChecklist.excludeOK = true; // THEN validate 'exclude' parameter *******************************************
            // Array?
        } else if (isArray(exclude) === true) { // IF 'exclude' is an array
            exclude.forEach((item) => { // THEN loop through array
                if (typeof (item) === 'string') { // IF array element is a string
                    excludeArray.push(item); // THEN push element to new array
                } else if (typeof (item) != 'string') { // IF array element is NOT a string
                    console.log( // THEN console log error and resume function
                        "\r\n",
                        "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                        "-- (ARG: 'exclude', ERROR: array_element_value_not_a_string)",
                        "\r\n"
                    );
                    return false;
                };
            });
            if (excludeArray.length < 0) { inputChecklist.excludeOK = true }; // Validate exclude parameter *******************************************
            // Object?
        } else if (typeof (exclude) === 'object') { // IF 'exclude' is an object
            if (MyNodeUtils.isEmpty(exclude) === false) { // IF exclude object is NOT empty (has its own keys/properties)
                const excludeProps = Object.getOwnPropertyNames(exclude); // THEN create new array of prop names (to serve as indices for a loop)
                excludeProps.forEach((item) => { // THEN loop through object properties
                    if (typeof (exclude[item]) === 'string') { // IF object property value is a string
                        excludeArray.push(exclude[item]); // THEN push element to new array
                    } else if (typeof (exclude[item]) != 'string') { // IF object property value is NOT a string
                        console.log( // THEN console log error and resume function
                            "\r\n",
                            "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                            "-- (ARG: 'exclude', ERROR: object_property_value_not_a_string)",
                            "\r\n"
                        );
                        return false;
                    };
                });
                if (excludeArray.length < 0) { inputChecklist.excludeOK = true }; // Validate exclude parameter *******************************************
            }
        } else { // IF the exclude is NOT a string, array, or object
            console.log( // THEN console log error and resume function
                "\r\n",
                "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                "-- (ARG: 'exclude', ERROR: object_property_value_invalid_data_type)",
                "\r\n"
            );
            excludeArray = null; // THEN set 'excludeArray' value to null
        }
    } else { // IF 'exclude' parameter value is null
        excludeArray = null; // THEN set 'excludeArray' value to null
        inputChecklist.excludeOK = false;
    };

    // ====================================== FILENAME ======================================
    if (fileName != null) { // IF a value was passed to the 'filename' argument
        // String?
        if (typeof (fileName) === 'string') { // IF 'fileName' is a string
            fileNameArray.push(fileName); // THEN make an array with one element
            inputChecklist.fileNameOK = true; // THEN validate 'fileName' parameter *******************************************
            // Array?
        } else if (isArray(fileName) === true) { // IF 'fileName' is an array
            fileName.forEach((item) => { // THEN loop through array
                if (typeof (item) === 'string') { // IF array element is a string
                    fileNameArray.push(item); // THEN push element to new array
                } else if (typeof (item) != 'string') { // IF array element is NOT a string
                    console.log( // THEN console log error and resume function
                        "\r\n",
                        "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                        "-- (ARG: 'fileName', ERROR: array_element_value_not_a_string)",
                        "\r\n"
                    );
                    return false;
                }
            });
            if (fileNameArray.length < 0) { inputChecklist.fileNameOK = true }; // Validate fileName parameter *******************************************
            // Object?
        } else if (typeof (fileName) === 'object') { // IF 'fileName' is an object
            if (MyNodeUtils.isEmpty(fileName) === false) { // IF fileName object is NOT empty (has its own keys/properties)
                const fileNameProps = Object.getOwnPropertyNames(fileName); // THEN create new array of prop names (to serve as indices for a loop)
                fileNameProps.forEach((item) => { // THEN loop through object properties
                    if (typeof (fileName[item]) === 'string') { // IF object property value is a string
                        fileNameArray.push(fileName[item]); // THEN push element to new array
                    } else if (typeof (fileName[item]) != 'string') { // IF object property value is NOT a string
                        console.log( // THEN console log error and resume function
                            "\r\n",
                            "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                            "-- (ARG: 'fileName', ERROR: object_property_value_not_a_string)",
                            "\r\n"
                        );
                        return false;
                    }
                });
                if (fileNameArray.length < 0) { inputChecklist.fileNameOK = true }; // Validate fileName parameter *******************************************
            }
        } else { // IF the fileName is NOT a string, array, or object
            console.log( // THEN console log error and resume function
                "\r\n",
                "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
                "-- (ARG: 'fileName', ERROR: fileName_invalid_data_type)",
                "\r\n"
            );
            inputChecklist.fileNameOK = false;
            return false;
        }
    } else { // IF 'fileName' value is null, or no argument was passed
        console.log( // THEN console log error
            "\r\n",
            "-- [MyNodeUtils.filterFileExt] INVALID_ARGUMENT_TYPE -- \r\n",
            "-- (ARG: 'fileName', ERROR: object_property_value_invalid_data_type)",
            "\r\n"
        );
        inputChecklist.fileNameOK = false;
        return false;
    };

    // ====================================== MAIN LOGIC ======================================


    if (inputChecklist.fileNameOK === true) {
        let resultArray = fileNameArray.filter((fName, fIndex, thisArray) => {
            let fNameExt = myNodeUtils.getFileExt(fName);

            if (includeArray != null && includeArray.length > 0) { // If an array of INCLUDED extensions has been specified and validated...

                // If this fileName extension matches at least one element within 'excludeArray', then return false.
                // Otherwise, if the extension is not excluded, then test it to see if it is included.
                excludeArray.some(excludeExt => excludeExt === fNameExt) ? false : includeArray.some(includeExt => includeExt === fNameExt);

            } else { // If an array of INCLUDED extensions has NOT been specified or FAILED validation...

                // If this fileName extension matches at least one element within 'excludeArray', then return false.
                // Otherwise, return true.
                excludeArray.some(excludeExt => excludeExt === fNameExt) ? false : true;
            };
            // Returning true allows this filename to pass the Array.filter() test, and be included in the result array.

        });

    } else { // if fileName parameter is not specified or validated, then...
        console.log(
            "\r\n",
            "-- [MyNodeUtils.filterFileExt] CANNOT_RESOLVE -- \r\n",
            "-- [MyNodeUtils.filterFileExt] RETURNED_NULL -- \r\n",
            "\r\n"
        );
    };
};





