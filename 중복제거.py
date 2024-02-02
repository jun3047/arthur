def remove_duplicate_sets_from_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.read().strip().split('\n\n')  # 각 세트를 분리

    # 각 세트를 문자열로 변환하여 중복 검사
    unique_sets = set(lines)

    # 중복 제거된 내용을 새 파일에 저장
    with open(output_file, 'w', encoding='utf-8') as file:
        for unique_set in unique_sets:
            file.write(f"{unique_set}\n\n")

# 사용 예
input_file = '전처리_결과_통합.txt'
output_file = '전처리_결과_통합_중복제거.txt'
remove_duplicate_sets_from_file(input_file, output_file)