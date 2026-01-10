const fs = require('fs');

function fix(file, replacement) {
    try {
        if (!fs.existsSync(file)) {
            console.log(`File not found: ${file}`);
            return;
        }
        const content = fs.readFileSync(file, 'utf8');
        console.log(`Read ${file}, length: ${content.length}`);

        // Check for matches
        const matches = content.match(/fill="#[A-Fa-f0-9]{6}"/g);
        console.log(`Found ${matches ? matches.length : 0} hex fill matches in ${file}`);

        const newContent = content.replace(/fill="#[A-Fa-f0-9]{6}"/g, replacement);

        if (newContent !== content) {
            fs.writeFileSync(file, newContent);
            console.log(`Successfully updated ${file}`);
        } else {
            console.log(`No changes needed for ${file}`);
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
}

fix('src/components/Logo.astro', 'fill="currentColor"');
fix('public/logo.svg', 'fill="#f97316"');
