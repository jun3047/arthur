# Example usage
input_file_path = './test.txt'  # Replace with the actual input file path
output_file_path = 'test_결과.txt'  # Replace with the desired output file path

with open(input_file_path, 'r', encoding='utf-8') as input_file, \
     open(output_file_path, 'w', encoding='utf-8') as output_file:

    processing_mode = None
    lines = input_file.readlines()
    processing_mode = None

    for i, line in enumerate(lines):

        print(line.strip())

        line = line.replace('성격:', '')
        line = line.replace('선택된 태그들: ', '')
        line = line.replace('성격 묘사: ', '')
        line = line.replace('외모 묘사: ', '')
        line = line.replace('[tags]: ', '')
        line = line.replace('몸매:', ',')
        line = line.replace('종족:', ',')
        line = line.replace('나이:', ',')
        line = line.replace('체형:', ',')
        line = line.replace('얼굴:', ',')
        line = line.replace('스타일:', ',')
        line = line.replace('머리:', ',')

        if '선택한 태그' in line:
            processing_mode = 'tags'
            output_file.write("\n\ntags:")
            continue

        elif 'step 1' in line:
            processing_mode = 'answer1'
            output_file.write("\n성격묘사:")
            continue

        elif 'step 2' in line:
            processing_mode = 'answer2'
            output_file.write("\n외모묘사:")
            continue
        
        elif line.startswith('='):
            processing_mode = None  # '='로 시작하는 줄을 만나면 처리 중단
            continue

        # 처리 모드에 따라 출력
        if processing_mode == 'tags':
            output_file.write(' ' + line.strip())
        elif processing_mode == 'answer1':
            output_file.write(' ' + line.strip())  # 파일에 쓰기
        elif processing_mode == 'answer2':
            output_file.write(' ' + line.strip())  # 파일에 쓰기