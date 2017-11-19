const fs = require('fs');

const rmrf = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const filePath = `${dirPath}/${files[i]}`;
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        } else {
          rmrf(filePath);
        }
      }
    }
    fs.rmdirSync(dirPath);
  }
};

rmrf('./dist');
