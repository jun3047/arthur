// 전처리.js

const 제외할데이터 = [
    '이제 이 태그들을 바탕으로 성격과 외모를 묘사하는 [answer1]과 [answer2]를 생성하겠습니다.',
    '무작위로 선택된 새로운 [tags]는 다음과 같습니다:',
    "따라서, 최종 묘사는 다음과 같습니다:",
    "===========================",
    "이제 선택한 태그를 기반으로 인물을 묘사해보겠습니다.",
    "네, 무작위로 선택한 태그를 기반으로 인물을 묘사해보겠습니다.",
    "다음은 무작위로 선택한 변수입니다:",
]

const fs = require('fs');

const inputFile = './test.txt';
const outputFile = './test_result.txt';

let txt = fs.readFileSync(inputFile, 'utf-8');

// 정규 표현식을 사용하여 모든 [tags]로 시작하는 부분 추출
    
const modifiedResult = txt.replace(/\[tags\] /g, 'tags:').replace(/\[answer1\] /g, '외모묘사:').replace(/\[answer2\] /g, '성격묘사:');

console.log(modifiedResult);

const regex = /tags:.*/g;
let results = modifiedResult.match(regex);

fs.writeFileSync(outputFile, results.join('\n'), 'utf-8');

console.log(`수정된 내용이 ${outputFile}에 저장되었습니다.`);