// 전처리.js

const 제외할데이터 = [
    '이제 이 태그들을 바탕으로 성격과 외모를 묘사하는 [answer1]과 [answer2]를 생성하겠습니다.',
    '무작위로 선택된 새로운 [tags]는 다음과 같습니다:'
]

const fs = require('fs');

const inputFile = './전처리1.txt';
const outputFile = './전처리1.txt';

const txt = fs.readFileSync(inputFile, 'utf-8');


let processedTxt = txt

for (const data of 제외할데이터) {
    processedTxt = processedTxt.replace(data, '');
}


fs.writeFileSync(outputFile, processedTxt, 'utf-8');

console.log(`수정된 내용이 ${outputFile}에 저장되었습니다.`);