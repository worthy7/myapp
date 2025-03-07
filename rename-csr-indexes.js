const fs = require('fs');
const path = require('path');

// Replace 'your-directory' with the path to your directory
const directoryPath = __dirname;

/**
 * Recursively scans the directory and replaces 'index.csr.html' files with 'index.html'.
 * @param {string} dir - The directory path to scan.
 */
function replaceFilesRecursively(dir) {
    // Read the contents of the directory
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        // Iterate over each file in the directory
        files.forEach(file => {
            const filePath = path.join(dir, file);

            // Check if the current file is a directory
            fs.stat(filePath, (err, stat) => {
                if (err) {
                    return console.log('Unable to stat file: ' + err);
                }

                if (stat.isDirectory()) {
                    // If it's a directory, recursively call the function
                    replaceFilesRecursively(filePath);
                } else if (file === 'index.csr.html') {
                    // If the file is 'index.csr.html', rename it to 'index.html'
                    const newPath = path.join(dir, 'index.html');

                    fs.rename(filePath, newPath, (err) => {
                        if (err) {
                            console.log('Error renaming file: ' + err);
                        } else {
                            console.log(`Renamed ${file} to index.html`);
                        }
                    });
                }
            });
        });
    });
}

// Start the recursive file replacement from the specified directory
replaceFilesRecursively(directoryPath);