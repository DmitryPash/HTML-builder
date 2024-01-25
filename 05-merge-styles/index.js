const fs = require('fs');
const path = require('path');

const sourceFolder = '05-merge-styles/styles';
const destinationFolder = '05-merge-styles/project-dist';
const outputFileName = 'bundle.css';

const mergeStyles = async (source, destination, outputFileName) => {
  try {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    const files = await fs.promises.readdir(source);

    const cssFiles = files.filter(file => path.extname(file).toLowerCase() === '.css');

    const cssContentArray = [];

    for (const cssFile of cssFiles) {
      const cssFilePath = path.join(source, cssFile);

      const cssContent = await fs.promises.readFile(cssFilePath, 'utf-8');
      cssContentArray.push(cssContent);
    }

    const bundledCssContent = cssContentArray.join('\n');

    const outputPath = path.join(destination, outputFileName);
    await fs.promises.writeFile(outputPath, bundledCssContent);

    console.log('CSS bundle created successfully!');
  } catch (err) {
    console.error('Error creating CSS bundle:', err);
  }
};

mergeStyles(sourceFolder, destinationFolder, outputFileName);
