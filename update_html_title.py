import os

files = [f for f in os.listdir('.') if f.endswith('.html') or f.endswith('.js')]

old_brand_html = "내 안의 짐승<span>: 소울 테스트</span>"
new_brand_html = "내안의짐승<span>.TEST</span>"

old_brand_text = "내 안의 짐승: 소울 테스트"
new_brand_text = "내안의짐승.TEST"

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 브랜드명 일괄 변경
    content = content.replace(old_brand_html, new_brand_html)
    content = content.replace(old_brand_text, new_brand_text)
    
    # 2. index.html 메타 태그 및 타이틀 매력적으로 변경
    if file_path == 'index.html':
        content = content.replace("<title>전생에 나였던 동물 찾기 | 심리 테스트 & 짐승 백과</title>", "<title>소름돋게 정확한 '내 안의 짐승' 테스트 | 소울 애니멀 찾기</title>")
        content = content.replace('<meta property="og:title" content="전생에 나였던 동물 찾기 | 심리 테스트 & 짐승 백과사전">', '<meta property="og:title" content="소름돋게 정확한 \'내 안의 짐승\' 테스트 | 소울 애니멀 찾기">')
        content = content.replace('<meta property="twitter:title" content="전생에 나였던 동물 찾기 | 심리 테스트 & 짐승 백과사전">', '<meta property="twitter:title" content="소름돋게 정확한 \'내 안의 짐승\' 테스트 | 소울 애니멀 찾기">')
        content = content.replace('<meta property="og:description" content="12개의 질문으로 당신의 소울 애니멀을 확인해보세요! #성격테스트 #심리테스트 #동물테스트">', '<meta property="og:description" content="나의 진짜 본성은 무엇일까? 12가지 질문으로 내 안에 숨겨진 소울 애니멀을 확인해보세요!">')
        content = content.replace('<meta property="twitter:description" content="12개의 질문으로 당신의 소울 애니멀을 확인해보세요! #성격테스트 #심리테스트 #동물테스트">', '<meta property="twitter:description" content="나의 진짜 본성은 무엇일까? 12가지 질문으로 내 안에 숨겨진 소울 애니멀을 확인해보세요!">')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated: {file_path}")
