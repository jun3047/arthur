const fs = require('fs');

const fetchTxtFile = async () => {
    try {

      const inputFile = './600개_결과_통합본_중복제거.txt';
      const response = fs.readFileSync(inputFile, 'utf-8');

      // 텍스트 파일의 내용을 읽어오기
      const text = response
      const lines = text.split('\n');
      const result = [];

      let i = 0
      let nowLine = 0

      while (nowLine < lines.length) {
        const line1 = lines[nowLine].trim();
        const line2 = lines[nowLine+1].trim();
        const line3 = lines[nowLine+2].trim();

        console.log("line1:", line1)
        console.log("line2:", line2)
        console.log("line3:", line3)

        const tags = line1.split(':')[1].split(',').map(tag => tag.trim());
        const appearance = line2.split(':')[1].split('.').map(desc => desc.trim() + '.').slice(0, -1);
        const personality = line3.split(':')[1].split('.').map(desc => desc.trim() + '.').slice(0, -1);

        const deflautData = {
            detail: {
              '외모 묘사': appearance,
              '성격 묘사': personality,
            },
            tags: tags,
            isBookmark: false,
          }

          
        result.push({ index: i+0.01, ...deflautData});
        result.push({ index: i+0.02, ...deflautData});
        result.push({ index: i+0.03, ...deflautData});
        result.push({ index: i+0.04, ...deflautData});
        result.push({ index: i+0.05, ...deflautData});
        result.push({ index: i+0.06, ...deflautData});
        result.push({ index: i+0.07, ...deflautData});
        result.push({ index: i+0.08, ...deflautData});

        result.push({ index: i+0.09, ...deflautData});
        result.push({ index: i+0.10, ...deflautData});
        result.push({ index: i+0.11, ...deflautData});
        result.push({ index: i+0.12, ...deflautData});
        result.push({ index: i+0.13, ...deflautData});
        result.push({ index: i+0.14, ...deflautData});
        result.push({ index: i+0.15, ...deflautData});
        result.push({ index: i+0.16, ...deflautData});

        i += 1;
        nowLine += 4;
      }

      const jsonData = JSON.stringify(result, null, 2);

      // 결과를 constant.json 파일로 저장
      fs.writeFileSync('constant.json', jsonData, 'utf-8');

    } catch (error) {
      console.error('Error fetching the file:', error.message);
    }
}

fetchTxtFile();