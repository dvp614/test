import os
import re

header = """    <header class="main-header">
        <nav class="nav-container">
            <a href="index.html" class="logo">내안의짐승<span>.보고서</span></a>
            <ul class="nav-links" id="nav-links">
                <li><a href="index.html">홈</a></li>
                <li><a href="index.html#library">짐승 백과사전</a></li>
                <li><a href="about.html">소개</a></li>
                <li><a href="contact.html">문의</a></li>
            </ul>
            <button class="menu-toggle" id="menu-toggle" aria-label="메뉴 열기" aria-expanded="false" aria-controls="nav-links">
                <span class="hamburger"></span>
            </button>
        </nav>
    </header>"""

footer = """    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-brand">
                <a href="index.html" class="logo">내안의짐승<span>.보고서</span></a>
                <p>전문적인 심리 분석 및 성향 매칭 플랫폼</p>
            </div>
            <div class="footer-nav">
                <div class="footer-col">
                    <h4>서비스</h4>
                    <a href="index.html">테스트 시작</a>
                    <a href="index.html#library">동물 백과</a>
                </div>
                <div class="footer-col">
                    <h4>고객지원</h4>
                    <a href="about.html">소개</a>
                    <a href="contact.html">문의하기</a>
                </div>
                <div class="footer-col">
                    <h4>법적 고지</h4>
                    <a href="privacy.html">개인정보처리방침</a>
                    <a href="terms.html">이용약관</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 내안의짐승.보고서. All rights reserved.</p>
        </div>
    </footer>"""

script_tag = '<script src="main.js" type="module"></script>'

files_to_update = [
    'animal-cat.html',
    'animal-dog.html',
    'animal-dolphin.html',
    'animal-fox.html',
    'animal-lion.html',
    'animal-owl.html',
    'animal-sloth.html',
    'animal-wolf.html',
    'privacy.html',
    'terms.html',
    'index.html',
    'about.html',
    'contact.html'
]

for filename in files_to_update:
    path = os.path.join('/home/user/tset/', filename)
    if not os.path.exists(path):
        print(f"File {filename} not found.")
        continue

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace header
    content = re.sub(r'<header class="main-header">.*?</header>', header, content, flags=re.DOTALL)

    # Replace or add footer
    if '<footer class="main-footer">' in content:
        content = re.sub(r'<footer class="main-footer">.*?</footer>', footer, content, flags=re.DOTALL)
    else:
        # Add before </body>
        if '</body>' in content:
            content = content.replace('</body>', footer + '\n</body>')

    # Add script tag if missing
    if script_tag not in content:
        if '</body>' in content:
            content = content.replace('</body>', script_tag + '\n</body>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename}")
