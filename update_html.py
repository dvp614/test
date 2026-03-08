import os

# 파일 목록 가져오기
files = [f for f in os.listdir('.') if f.endswith('.html') or f.endswith('.js')]

old_brand = "내안의짐승.보고서"
new_brand = "내 안의 짐승: 소울 테스트"
old_library = "짐승 백과사전"
new_library = "짐승 백과"

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace(old_brand, new_brand)
    new_content = new_content.replace(old_library, new_library)
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {file_path}")
