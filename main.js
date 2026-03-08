/**
 * 내안의짐승 - 4축 매트릭스 기반 고도화된 분석 알고리즘 및 테마 시스템
 */

const quizData = {
    questions: [
        { id: 1, axis: "EI", text: "새로운 모임에 참석했을 때 당신은?", options: [{ text: "먼저 다가가 대화를 주도한다", value: "E" }, { text: "상대방이 말을 걸 때까지 기다린다", value: "I" }] },
        { id: 4, axis: "EI", text: "스트레스가 심한 날, 당신의 해소법은?", options: [{ text: "친구들과 만나 수다를 떨며 푼다", value: "E" }, { text: "집에서 혼자 조용히 영화를 보거나 쉰다", value: "I" }] },
        { id: 7, axis: "EI", text: "주변 사람들이 말하는 당신의 첫인상은?", options: [{ text: "에너지가 넘치고 활발해 보인다", value: "E" }, { text: "차분하고 생각이 깊어 보인다", value: "I" }] },
        { id: 2, axis: "SN", text: "일을 시작할 때 더 중요하게 생각하는 것은?", options: [{ text: "구체적인 매뉴얼과 과거의 데이터", value: "S" }, { text: "전체적인 비전과 새로운 아이디어", value: "N" }] },
        { id: 6, axis: "SN", text: "설명서를 읽을 때 당신의 스타일은?", options: [{ text: "첫 페이지부터 꼼꼼히 끝까지 읽는다", value: "S" }, { text: "필요한 부분만 훑어보거나 일단 조립해본다", value: "N" }] },
        { id: 11, axis: "SN", text: "여행을 계획할 때 당신이 더 선호하는 곳은?", options: [{ text: "유명한 맛집과 관광 코스가 확실한 곳", value: "S" }, { text: "그곳만의 독특한 영감을 주는 낯선 곳", value: "N" }] },
        { id: 5, axis: "TF", text: "친구가 힘든 고민을 털어놓을 때 당신의 반응은?", options: [{ text: "현실적인 해결책과 대안을 제시한다", value: "T" }, { text: "충분히 공감해주며 마음을 위로한다", value: "F" }] },
        { id: 8, axis: "TF", text: "팀 프로젝트 중 의견 충돌이 생기면?", options: [{ text: "옳고 그름을 따져 논리적으로 설득한다", value: "T" }, { text: "감정이 상하지 않게 원만한 합의점을 찾는다", value: "F" }] },
        { id: 9, axis: "TF", text: "영화를 볼 때 당신을 더 자극하는 것은?", options: [{ text: "치밀한 구성과 예상치 못한 반전", value: "T" }, { text: "등장인물간의 감정선과 감동적인 서사", value: "F" }] },
        { id: 3, axis: "JP", text: "예상치 못한 약속 취소가 생겼을 때?", options: [{ text: "짜여진 일정이 틀어져 조금 당황스럽다", value: "J" }, { text: "오히려 좋아! 자유시간이 생겨 즐겁다", value: "P" }] },
        { id: 10, axis: "JP", text: "당신의 책상이나 작업 공간의 상태는?", options: [{ text: "물건들이 제자리에 정돈되어 있는 편이다", value: "J" }, { text: "자유롭게 널브러져 있지만 나름의 규칙이 있다", value: "P" }] },
        { id: 12, axis: "JP", text: "과제를 제출할 때 당신은?", options: [{ text: "미리 끝내놓고 여유롭게 검토한다", value: "J" }, { text: "마감 직전의 압박감이 있어야 속도가 난다", value: "P" }] }
    ],
    results: {
        "ENTJ": { id: "lion", title: "카리스마 있는 전략 리더 '사자'", emoji: "🦁", hue: 35, advice: "취약성을 드러내는 것이 때로는 더 큰 신뢰를 구축합니다." },
        "ISTP": { id: "tiger", title: "독립적인 야심가 '호랑이'", emoji: "🐯", hue: 25, advice: "타인의 부족함을 비난하기보다 성장을 돕는 스승의 태도를 가져보세요." },
        "ISTJ": { id: "wolf", title: "원칙과 충직의 가디언 '늑대'", emoji: "🐺", hue: 210, advice: "가끔은 예외를 인정하는 유연함이 집단을 더 건강하게 만듭니다." },
        "ENTP": { id: "fox", title: "영리한 전술가 '여우'", emoji: "🦊", hue: 45, advice: "모든 것을 머리로만 해결하려 하지 마세요. 우직한 진심이 더 큰 문을 엽니다." },
        "ENFJ": { id: "dolphin", title: "공감하는 소셜 마스터 '돌고래'", emoji: "🐬", hue: 200, advice: "건강한 거리두기가 당신의 다정함을 더 오래 유지시켜 줍니다." },
        "ISFJ": { id: "dog", title: "한결같은 서포터 '리트리버'", emoji: "🦮", hue: 50, advice: "자신의 경계를 지킬 때 당신의 선의도 더욱 가치 있어집니다." },
        "ISFP": { id: "cat", title: "독립적인 심미안 '고양이'", emoji: "🐈", hue: 280, advice: "가끔은 당신의 아름다운 세계를 타인과 공유해 보세요." },
        "INTJ": { id: "owl", title: "냉철한 통찰가 '부엉이'", emoji: "🦉", hue: 260, advice: "80%의 확신이 있다면 행동으로 옮기며 배워가는 유연성을 가져보세요." },
        "ESFJ": { id: "elephant", title: "묵직한 신뢰의 아이콘 '코끼리'", emoji: "🐘", hue: 190, advice: "변화의 파도를 타고 유연하게 움직이는 법을 익혀보세요." },
        "ESTJ": { id: "eagle", title: "비전을 그리는 전략가 '독수리'", emoji: "🦅", hue: 220, advice: "위대한 비전은 현실의 토대 위에서 완성됩니다." },
        "INFP": { id: "sloth", title: "평화로운 힐링 마스터 '나무늘보'", emoji: "🦥", hue: 85, advice: "중요한 목표 앞에서는 에너지를 집중하는 법을 연습해 보세요." },
        "ENFP": { id: "panda", title: "유니크한 낙천가 '판다'", emoji: "🐼", hue: 10, advice: "최소한의 현실적 책임감을 갖추어 보세요." },
        "INTP": { id: "snake", title: "지적인 관찰자 '뱀'", emoji: "🐍", hue: 140, advice: "투명함이 당신의 지적인 매력을 더욱 돋보이게 할 것입니다." },
        "ESTP": { id: "horse", title: "역동적인 자유 영혼 '말'", emoji: "🐎", hue: 30, advice: "당신이 지나온 길의 발자국을 확인하며 완결성을 높여보세요." },
        "ESFP": { id: "monkey", title: "재치 있는 아이디어 뱅크 '원숭이'", emoji: "🐒", hue: 40, advice: "당신의 다재다능함이 전문성이라는 줄기를 만나게 하세요." },
        "INFJ": { id: "turtle", title: "끈기 있는 완결자 '거북이'", emoji: "🐢", hue: 120, advice: "당신의 끈기에 효율이 더해지면 무적입니다." }
    }
};

let currentStep = 0;
let userProfile = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const screens = { intro: document.getElementById('intro-screen'), quiz: document.getElementById('quiz-screen'), result: document.getElementById('result-screen') };
const elements = {
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    shareBtn: document.getElementById('share-btn'),
    progressBar: document.getElementById('progress-bar'),
    questionNumber: document.getElementById('question-number'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    resultTitle: document.getElementById('result-title'),
    resultEmoji: document.getElementById('result-emoji'),
    resultDesc: document.getElementById('result-desc'),
    menuToggle: document.getElementById('menu-toggle'),
    navLinks: document.getElementById('nav-links'),
    themeToggle: document.getElementById('theme-toggle')
};

// --- Theme Logic ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
}

initTheme();

// --- Mobile Menu Toggle Logic ---
function toggleMenu() {
    const isActive = elements.navLinks.classList.toggle('active');
    elements.menuToggle.classList.toggle('active');
    elements.menuToggle.setAttribute('aria-expanded', isActive);
    document.body.classList.toggle('menu-open', isActive);
}

if (elements.menuToggle) elements.menuToggle.onclick = (e) => { e.stopPropagation(); toggleMenu(); };

function showScreen(screenId) {
    if (!screens[screenId]) return;
    Object.values(screens).forEach(screen => { if (screen) screen.classList.remove('active'); });
    setTimeout(() => { 
        screens[screenId].classList.add('active'); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
}

function updateQuiz() {
    const question = quizData.questions[currentStep];
    const totalSteps = quizData.questions.length;
    elements.questionNumber.textContent = `${currentStep + 1} / ${totalSteps}`;
    elements.questionText.textContent = question.text;
    elements.progressBar.style.width = `${((currentStep + 1) / totalSteps) * 100}%`;
    elements.optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => handleOptionClick(option.value);
        elements.optionsContainer.appendChild(button);
    });
}

function handleOptionClick(val) {
    userProfile[val]++;
    if (currentStep < quizData.questions.length - 1) {
        currentStep++;
        updateQuiz();
    } else {
        showResult();
    }
}

function showResult() {
    const type = 
        (userProfile.E >= userProfile.I ? "E" : "I") +
        (userProfile.S >= userProfile.N ? "S" : "N") +
        (userProfile.T >= userProfile.F ? "T" : "F") +
        (userProfile.J >= userProfile.P ? "J" : "P");

    const result = quizData.results[type];
    
    elements.resultTitle.textContent = "영혼 분석 중...";
    elements.resultEmoji.textContent = "⏳";
    elements.resultDesc.textContent = "당신의 깊은 무의식을 스캔하고 있습니다.";
    showScreen('result');

    setTimeout(() => {
        elements.resultTitle.textContent = result.title;
        elements.resultEmoji.textContent = result.emoji;
        elements.resultDesc.textContent = "당신의 본능적 유형이 결정되었습니다. 아래 버튼을 통해 당신의 행동 심리 리포트를 확인해보세요.";
        
        const adviceText = document.querySelector('.advice-text');
        if (adviceText) adviceText.textContent = `"${result.advice}"`;
        
        const detailLink = document.getElementById('detail-link');
        if (detailLink) {
            detailLink.href = `animal-${result.id}.html`;
            detailLink.textContent = `${result.title.split("'")[1]} 유형 심층 분석 보고서 보기 →`;
        }
        document.documentElement.style.setProperty('--hue', result.hue);
    }, 1500);
}

function initQuiz() {
    currentStep = 0;
    userProfile = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    updateQuiz();
    showScreen('quiz');
}

if (elements.startBtn) elements.startBtn.onclick = initQuiz;
if (elements.restartBtn) elements.restartBtn.onclick = () => showScreen('intro');
if (elements.shareBtn) elements.shareBtn.onclick = () => {
    const text = `나의 정체는 '${elements.resultTitle.textContent}'입니다! 당신은 어떤 짐승인가요?`;
    const url = window.location.href;
    if (navigator.share) navigator.share({ title: '내안의짐승', text, url });
    else { navigator.clipboard.writeText(`${text}\n${url}`); alert('복사되었습니다.'); }
};
console.log('내안의짐승 initialized with Theme System');
