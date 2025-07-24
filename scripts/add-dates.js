#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directories to process
const articlesDir = path.join(process.cwd(), 'content/articles');
const appsDir = path.join(process.cwd(), 'content/apps');

function addDatesToFiles(directory, type) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${directory} does not exist`);
    return;
  }

  const files = fs.readdirSync(directory).filter(f => /\.mdx?$/.test(f));
  
  files.forEach(fileName => {
    const filePath = path.join(directory, fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdownContent } = matter(content);
    
    // Check if date already exists
    if (data.date) {
      console.log(`✅ ${fileName} already has a date: ${data.date}`);
      return;
    }
    
    // Get file stats
    const stats = fs.statSync(filePath);
    const createdDate = stats.birthtime.toISOString().split('T')[0];
    
    // Add date to frontmatter
    const newFrontmatter = {
      ...data,
      date: createdDate
    };
    
    // Reconstruct the file
    const newContent = matter.stringify(markdownContent, newFrontmatter);
    fs.writeFileSync(filePath, newContent);
    
    console.log(`✅ Added date ${createdDate} to ${fileName}`);
  });
}

console.log('🔄 Adding dates to content files...\n');

console.log('📝 Processing articles...');
addDatesToFiles(articlesDir, 'article');

console.log('\n📱 Processing apps...');
addDatesToFiles(appsDir, 'app');

console.log('\n✅ Done! All files now have automatic dates.');
console.log('\n💡 Tips:');
console.log('   - Dates are automatically generated from file creation time');
console.log('   - You can manually override dates in frontmatter if needed');
console.log('   - Last modified dates are automatically tracked');
console.log('   - SEO metadata now includes both published and modified dates'); 