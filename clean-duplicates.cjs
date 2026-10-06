const fs = require('fs');
const path = require('path');

const mandirDir = path.join(__dirname, 'public', 'mandir');
const basinDir = path.join(__dirname, 'public', 'marble-basin');

if (fs.existsSync(mandirDir) && fs.existsSync(basinDir)) {
  const basinSizes = new Set(
    fs.readdirSync(basinDir).map(f => fs.statSync(path.join(basinDir, f)).size)
  );

  const mandirFiles = fs.readdirSync(mandirDir);
  let removed = 0;
  for (const f of mandirFiles) {
    const fullPath = path.join(mandirDir, f);
    const size = fs.statSync(fullPath).size;
    if (basinSizes.has(size)) {
      console.log(`Removing basin duplicate from mandir: ${f} (${size} bytes)`);
      fs.unlinkSync(fullPath);
      removed++;
    }
  }
  console.log(`Total removed from mandir: ${removed}`);
  console.log(`Remaining mandir files: ${fs.readdirSync(mandirDir).length}`);
}
