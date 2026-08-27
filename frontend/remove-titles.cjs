const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(path.join(__dirname, 'src'));

let changed = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    // Remove document.title = '...';
    content = content.replace(/document\.title\s*=\s*['"][^'"]+['"];?/g, '');
    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        changed++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Done. Updated ${changed} files.`);
