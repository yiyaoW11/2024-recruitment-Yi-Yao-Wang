/**
 * Task 1
 */

// Given some files, returns an array of files with no children
function leafFiles(files) {
    let leafFilesArr = [];

    for (const currFile of files) {
        if (!(files.some((file) => file.parent === currFile.id))) {
            leafFilesArr.push(currFile.name);
        }
    }

    return leafFilesArr;
}

/**
 * Task 2
 */

// Returns a list containing the k greatest file categories. List is ordered 
// in descending order and/or alphabetically
// ASSUMPTION MADE:
// 1) If k > num of categories, the list doesn't need to be returned in alphabetical or descending order

function kLargestCategories(files, k) {
    // Collects all file categories
    const categories = files.flatMap((currFile) => currFile.categories);

    // Removes category duplicates by passing as a set
    const filteredCategories = [...new Set(categories)];

    // If less than k categories in list of files, return all categories
    if (filteredCategories.length < k) {
        return filteredCategories;
    }

    // Creates array that stores category and its corresponding categorySize
    const allCategorySizesArr = [];
    for (const currCategory of filteredCategories) {
        allCategorySizesArr.push(
            {
                category: currCategory,
                categorySize: findCategorySize(files, currCategory)
            }
        )
    }

    allCategorySizesArr.sort((a, b) => {
        // Sort by size in descending order
        if (b.categorySize !== a.categorySize) {
            return b.categorySize - a.categorySize;
        }
              
        // If sizes are the same, sort alphabetically
        return a.category.localeCompare(b.category);
    });

    let kLargestArr = [];
    let counter = 0;

    // Extract the top k categories (since its already sorted)
    while (counter !== k) {
        kLargestArr.push(allCategorySizesArr[counter].category);
        counter++;
    }

    return kLargestArr;
}

/**
 * Task 3
 */

// Function that returns the size of the file with the largest total size (including children)
function largestFileSize(files) {
    const allFileSizesArr = [];

    // No files returns 0
    if (files.length == 0) {
        return 0;
    }

    // Creates array that stores file id and its corresponding size
    for (const currFile of files) {
        const childrenArr = findFileChildren(files, currFile);
        childrenArr.push(currFile);
        allFileSizesArr.push(
            {
                id: `${currFile.id}`,
                fileSize: findFileSize(childrenArr)
            }
        )
    }

    return findLargestSize(allFileSizesArr);
}

///////////////////////////// HELPER FUNCTIONS ///////////////////////////
// Finds the largest file size for a given array of file sizes
function findLargestSize(fileSizesArr) {
    let largestFileSize = fileSizesArr[0].fileSize;

    for (const currFile of fileSizesArr) {
        if (currFile.fileSize > largestFileSize) {
            largestFileSize = currFile.fileSize;
        }
    }
    return largestFileSize;
}

// Finds the total file size of an array of children (including the parent File)
function findFileSize(children) {
    let sum = 0

    for (const currChild of children) {
        sum += currChild.size;
    }

    return sum;
}

// Finds the number of files that belong to the specified category
function findCategorySize(files, category) {
    let size = 0;

    for (const currFile of files) {
        if (currFile.categories.includes(category)) {
            size++;        
        }
    }

    return size;
}

// Finds all the children of a particular file and stores them in an array 
function findFileChildren(files, currFile) {
    let children = [];

    files.forEach((file) => {
        if (file.parent === currFile.id) {
            const fileChildren = findFileChildren(files, file);
            children = children.concat(fileChildren, file);
        }
    }); 

    return children;
}

// Sorts all categories of file array in descending order. If multiple files have same sizes, 
// sort alphabetically
// function sortFileCategories(allCategorySizesArr) {
//     // Sort in descending order of category sizes & sort alphabetically if there are the same sizes
//     allCategorySizesArr.sort((a, b) => {
//     // Sort by size in descending order
//         if (b.categorySize !== a.categorySize) {
//             return b.categorySize - a.categorySize;
//         }
          
//         // If sizes are the same, sort alphabetically
//         return a.category.localeCompare(b.category);
//     });
// }

// Provided function to check if two arrays are equal
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

////////////////////////////////// TEST FILES ///////////////////////////////
const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

const emptyFiles = [];

const oneFile = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 }
]

const testFiles2 = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
];

const noParentFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: -1, size: 1024 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: -1, size: 4096 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: -1, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: -1, size: 6144 },
]

const sameParentFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 5, size: 1024 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: 5, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: -1, size: 4096 },
]

const oneLeafFile =  [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 5000 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: 5, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: -1, size: 4096 },
]

const sameNumCategories = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 3, name: "Folder", categories: ["Videos"], parent: 5, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Excel"], parent: -1, size: 4096 },
    { id: 21, name: "Video.mp4", categories: ["Folder"], parent: -1, size: 6144 }
]

const oneLeafFile2 =  [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: -1, size: 5000 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: 5, size: 1500 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: -1, size: 2000 },
]

const oneLeafFile3 =  [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: -1, size: 5000 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: 5, size: 7000 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: -1, size: 2000 },
]

////////////////////////// LEAF FILES TESTING ///////////////////////////
// Typical case
console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

// All files (except for the parent) belong to the same parent file
console.assert(arraysEqual(
    leafFiles(sameParentFiles), 
    [
        "Document.txt",
        "Folder"
    ]
));

// Only one leaf file
console.assert(arraysEqual(
    leafFiles(oneLeafFile),
    [
        "Document.txt"
    ]
));

// None of files are parents
console.assert(arraysEqual(
    leafFiles(noParentFiles),
    [
        "Document.txt",
        "Folder",
        "Spreadsheet.xlsx",
        "Presentation.pptx",
        "Video.mp4"
    ]
));

// Empty files means no leaf files
console.assert(arraysEqual(
    leafFiles(emptyFiles),
    []
));

////////////////////// K-LARGEST CATEGORIES TESTING //////////////////////
// Generic case
console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

// No num categories given, returns no categories
console.assert(arraysEqual(
    kLargestCategories(testFiles, 0),
    []
));

// No files given, despite categories greater than 0
console.assert(arraysEqual(
    kLargestCategories(emptyFiles, 3),
    []
));

// k > num files returns all categories
console.assert(arraysEqual(
    kLargestCategories(sameParentFiles, 10),
    ["Documents", "Folder", "Excel"]
));

// All categories have same size, return alphabetically
console.assert(arraysEqual(
    kLargestCategories(sameNumCategories, 4),
    ["Documents", "Excel", "Folder", "Videos"]
));

// Categories have multiple sizes, however not all of them are returned due to the limit imposed by k
console.assert(arraysEqual(
    kLargestCategories(sameNumCategories, 2),
    ["Documents", "Excel"]
));

/////////////////////// LARGEST FILE SIZE TESTING /////////////////////////
// Generic Case
console.assert(largestFileSize(testFiles) == 20992);

// File with children has greater size that files with no children
console.assert(largestFileSize(oneLeafFile3) == 9000);

// No files means file size equal 0
console.assert(largestFileSize(emptyFiles) === 0);

// None of the files have parents means that the largest size must come from the individual files
console.assert(largestFileSize(noParentFiles) === 6144);

// All files (except the parent itself), are children/ grandchildren of the same parent
console.assert(largestFileSize(sameParentFiles) === 5120);

// File with no children has greater size than file with children
console.assert(largestFileSize(oneLeafFile2) === 5000);

// Only one file (meaning it has the largest size)
console.assert(largestFileSize(oneFile) === 1024);