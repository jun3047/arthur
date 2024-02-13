const fs = require('fs');

// 여기서에서 fittering을 해야함  -> 1. 제외하는 사진 제거 2. 없애는 사진 제거 3. 그림체에 따른 태그 추가


const 뺄거 = [ '9', '10', '24', '25', '29', '46', '56', '63', '86', '90', '117', '171', '176', '177', '186', '192', '203', '292', '363']
const 필터링 = {
  '125': '9 12',
  '133': '13 14 15 16',
  '141': '5 6 7 8',
  '148': '6',
  '151': '5 7 8',
  '152': '7 15 16',
  '155': '9 10 14 15',
  '162': '6 7 8 11 12',
  '163': '5 6 7 8 16',
  '168': '6 7 8',
  '196': '2 5 7 8',
  '200': '5 6 7 8 13 14',
  '204': '5 6 7 8 10 11 12',
  '221': '6 9 10 12',
  '223': '4 9 10 11 12',
  '226': '6 7',
  '227': '9 12',
  '228': '5 6 7 8 15 16',
  '235': '6 7 8 14',
  '240': '8',
  '214': '16',
  '215': '5 6 8',
  '241': '5 10 13 14 15 16',
  '243': '3 5 6 7 8 13 14 15',
  '248': '14',
  '249': '16',
  '254': '1 3 16',
  '267': '1 4',
  '268': '7',
  '272': '9',
  '274': '5 6 ',
  '275': '7 12 5',
  '279': '7 12 ',
  '282': '6 7 8 9 13',
  '285': '6 7 ',
  '293': '2 5 6 7 12',
  '294': '7 8 9 10 12 16',
  '296': '5 6 7',
  '299': '8 9',
  '300': '2 3 5 6 7 8',
  '301': '3',
  '307': '1 2 16',
  '309': '4 7 8 11 12',
  '310': '11',
  '312': '1 2 4 5 6 7 8 13 14 15 16',
  '313': '1 3 5 6 7 9 12',
  '315': '5 6 7',
  '318': '1 4 9 12',
  '326': '5',
  '327': '8',
  '328': '1 3 9',
  '329': '9 12',
  '332': '5 6 7 8',
  '333': '14 15',
  '335': '2 6',
  '343': '13 14 15 16',
  '353': '10',
  '358': '12',
  '360': '5',
  '361': '12',
  '366': '3 4 5 7 8 10 11 12 16',
  '371': '2 5 6 7 8 11 12 13 14 15 16',
  '378': '10 11',
  '379': '6 7',
  '380': '1 4',
  '384': '10 11 15',
  '389': '9 10 11 ',
  '391': '8 10 11 12',
  '396': '2 5',
}

const 순서바꾸기 = [
  '198', '222', '223', '246'
]

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


        if (뺄거.includes(i.toString())) {
          i += 1;
          nowLine += 4;
          continue;
        }

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
        // 2 애니 3실사 4 게임
        const aniData = {
          ...deflautData,
          tags: [...tags, '애니메이션'],
        }

        const realData = {
          ...deflautData,
          tags: [...tags, '실사'],
        }

        const gameData = {
          ...deflautData,
          tags: [...tags, '게임'],
        }


 
        result.push({ index: i.toString() + '.01', ...deflautData});
        result.push({ index: i.toString() + '.02', ...deflautData});
        result.push({ index: i.toString() + '.03', ...deflautData});
        result.push({ index: i.toString() + '.04', ...deflautData});
        
        result.push({ index: i.toString() + '.05', ...aniData});
        result.push({ index: i.toString() + '.06', ...aniData});
        result.push({ index: i.toString() + '.07', ...aniData});
        result.push({ index: i.toString() + '.08', ...aniData});

        result.push({ index: i.toString() + '.09', ...realData});
        result.push({ index: i.toString() + '.10', ...realData});
        result.push({ index: i.toString() + '.11', ...realData});
        result.push({ index: i.toString() + '.12', ...realData});

        result.push({ index: i.toString() + '.13', ...gameData});
        result.push({ index: i.toString() + '.14', ...gameData});
        result.push({ index: i.toString() + '.15', ...gameData});
        result.push({ index: i.toString() + '.16', ...gameData});

        const filter = 필터링[i.toString()] ? 필터링[i.toString()].split(' ').map(num => num.trim()) : null;

        if (filter) {
          filter.forEach(num => {
            num = num.length === 1 ? '0' + num : num;
            result.splice(result.findIndex(data => data.index === i.toString() + '.' + num), 1);
          })
        }

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