const fs = require('fs').promises;
const path = require('path');

const stylesPath = '05-merge-styles/styles';
const distPath = '05-merge-styles/project-dist';
const bundleFile = 'bundle.css';

async function mergeStyles() {
  try {
    await fs.mkdir(distPath, { recursive: true });

    const cssFiles = (await fs.readdir(stylesPath)).filter(file => file.endsWith('.css'));
    const bundleContent = (await Promise.all(cssFiles.map(file => fs.readFile(path.join(stylesPath, file), 'utf-8')))).join('\n');

    await fs.writeFile(path.join(distPath, bundleFile), bundleContent, 'utf-8');

    console.log(`Стили успешно объединены в ${bundleFile}`);
  } catch (err) {
    console.error('Возникла ошибка при объединении стилей:', err);
  }
}

mergeStyles();