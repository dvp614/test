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
        "ENTJ": { id: "lion", title: "무대를 장악하는 총사령관 '사자'", emoji: "🦁", hue: 35, advice: "가끔은 뒤처진 동료의 손을 잡고 천천히 걷는 것이 진짜 위대한 왕의 덕목이랍니다." },
        "ISTP": { id: "tiger", title: "독립적인 해결사 '호랑이'", emoji: "🐯", hue: 25, advice: "혼자 가면 빠르지만 함께 가야만 볼 수 있는 풍경이 있어요. 가끔은 당신의 등 뒤를 동료들에게 맡겨보세요." },
        "ISTJ": { id: "wolf", title: "원칙과 신뢰의 가디언 '늑대'", emoji: "🐺", hue: 210, advice: "세상은 때로 계획대로 되지 않기에 아름다운 거예요. 가끔은 지도에 없는 길로 들어서서 길을 잃어보는 여유를 가져보세요." },
        "ENTP": { id: "fox", title: "영리한 아이디어 뱅크 '여우'", emoji: "🦊", hue: 45, advice: "하나의 우물을 깊게 파는 인내가 당신의 천재성을 완성할 거예요. 가끔은 '왜'보다 '어떻게 끝낼까'를 고민해 보세요." },
        "ENFJ": { id: "dolphin", title: "공감하는 소셜 마스터 '돌고래'", emoji: "🐬", hue: 200, advice: "세상 모든 사람의 행복을 당신이 책임질 수는 없어요. 가끔은 무리에서 벗어나 깊은 바다 아래에서 혼자만의 고요를 즐겨보세요." },
        "ISFJ": { id: "dog", title: "한결같은 서포터 '리트리버'", emoji: "🦮", hue: 50, advice: "당신의 '아니요'는 상대방을 향한 공격이 아니라 당신 자신을 지키는 방패예요. 가끔은 거절을 통해 당신의 선의를 더 귀하게 만드세요." },
        "ISFP": { id: "cat", title: "독립적인 심미안 '고양이'", emoji: "🐈", hue: 280, advice: "당신의 세계는 충분히 아름다워요. 하지만 그 세계를 세상과 더 많이 공유한다면 당신의 인생은 훨씬 더 다채로워질 거예요." },
        "INTJ": { id: "owl", title: "냉철한 통찰가 '부엉이'", emoji: "🦉", hue: 260, advice: "이론은 완벽해도 사람은 완벽할 수 없어요. 가끔은 비논리적인 감정의 영역도 인생의 중요한 데이터라는 점을 인정해 보세요." },
        "ESFJ": { id: "elephant", title: "든든한 조화의 수호자 '코끼리'", emoji: "🐘", hue: 190, advice: "당신은 이미 충분히 잘하고 있어요. 가끔은 가방 속의 무거운 책임감을 내려놓고 당신 자신의 행복을 위해 가볍게 춤을 춰보세요." },
        "ESTJ": { id: "eagle", title: "비전을 완수하는 실행가 '독수리'", emoji: "🦅", hue: 220, advice: "높이 날다 보면 땅 위의 작은 꽃들을 못 볼 수 있어요. 가끔은 땅으로 내려와 사람들의 구체적인 삶과 감정을 들여다봐 주세요." },
        "INFP": { id: "sloth", title: "평화로운 힐링 마스터 '나무늘보'", emoji: "🦥", hue: 85, advice: "당신의 평화는 소중하지만, 가끔은 등껍질 밖으로 나와 뜨거운 태양 아래에서 전력 질주해보는 경험도 필요해요." },
        "ENFP": { id: "panda", title: "유니크한 낙천가 '판다'", emoji: "🐼", hue: 10, advice: "당신의 낙원은 소중해요. 하지만 그 낙원을 지키려면 현실의 기반이라는 울타리도 필요하다는 걸 잊지 마세요." },
        "INTP": { id: "snake", title: "보이지 않는 수의 분석가 '뱀'", emoji: "🐍", hue: 140, advice: "당신의 지식은 공유될 때 더 빛이 나요. 차가운 이성 뒤에 숨겨진 따뜻한 호기심을 사람들에게 조금만 더 보여주세요." },
        "ESTP": { id: "horse", title: "멈추지 않는 도전자 '말'", emoji: "🐎", hue: 30, advice: "달리는 것만큼 멈춰 서서 뒤를 돌아보는 것도 중요해요. 당신이 지나온 길의 발자국을 확인하며 마무리의 디테일을 조금만 더 챙겨보세요." },
        "ESFP": { id: "monkey", title: "재치 만점 에너지 메이커 '원숭이'", emoji: "🐒", hue: 40, advice: "인생은 파티만으로 채워질 수 없어요. 가끔은 조용히 앉아 하나의 우물을 깊게 파는 인내의 시간을 가져보세요." },
        "INFJ": { id: "turtle", title: "끈기 있는 완결자 '거북이'", emoji: "🐢", hue: 120, advice: "가끔은 등껍질 밖으로 고개를 내밀고 세상의 빠른 변화를 느껴보세요. 당신의 깊이에 유연함만 더한다면 당신은 무적입니다." }
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

if (elements.themeToggle) elements.themeToggle.addEventListener('click', toggleTheme);
initTheme();

// --- Mobile Menu ---
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
    
    // Initial loading state
    elements.resultTitle.textContent = "영혼 분석 중...";
    elements.resultEmoji.textContent = "⏳";
    elements.resultEmoji.style.animation = "pulse 1.5s infinite";
    elements.resultDesc.textContent = "당신의 깊은 무의식을 스캔하고 있습니다.";
    showScreen('result');

    setTimeout(() => {
        elements.resultTitle.textContent = `당신은 '${result.title.split("'")[1]}' 타입!`;
        elements.resultEmoji.textContent = result.emoji;
        elements.resultEmoji.style.animation = "float 5s infinite ease-in-out";
        elements.resultDesc.textContent = result.title;
        
        const adviceText = document.querySelector('.advice-text');
        if (adviceText) adviceText.textContent = `"${result.advice}"`;
        
        const detailLink = document.getElementById('detail-link');
        if (detailLink) {
            detailLink.href = `animal-${result.id}.html`;
            detailLink.textContent = "심층 분석 리포트 읽기";
        }
        document.documentElement.style.setProperty('--hue', result.hue);
    }, 2000);
}

function initQuiz() {
    currentStep = 0;
    userProfile = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    document.documentElement.style.setProperty('--hue', 260);
    updateQuiz();
    showScreen('quiz');
}

if (elements.startBtn) elements.startBtn.onclick = initQuiz;
if (elements.restartBtn) elements.restartBtn.onclick = () => showScreen('intro');
if (elements.shareBtn) elements.shareBtn.onclick = () => {
    // 현재 도출된 결과의 ID를 가져옴 (detailLink에서 추출하거나 전역 변수 활용)
    const detailLink = document.getElementById('detail-link');
    const resultPageUrl = detailLink ? detailLink.href : window.location.href;
    const animalName = elements.resultTitle.textContent;

    const shareTitle = '내안의짐승 - 나의 본능 확인하기';
    const shareText = `나의 본능은 '${animalName}'! 당신은 어떤 짐승인가요? 지금 확인해보세요.`;

    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: resultPageUrl // 결과 페이지 URL 공유
        }).catch(err => console.log('공유 실패:', err));
    } else {
        const fullShareMsg = `${shareText}\n${resultPageUrl}`;
        navigator.clipboard.writeText(fullShareMsg).then(() => {
            alert('결과 페이지 링크가 복사되었습니다! 친구들에게 공유해보세요.');
        });
    }
};
// --- Language Switcher Logic ---
function changeLanguage(lang) {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
        combo.value = lang;
        // 브라우저 호환성을 위한 이벤트 발생
        if (typeof(Event) === 'function') {
            combo.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
            const event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, true);
            combo.dispatchEvent(event);
        }
    } else {
        // 위젯이 아직 로드되지 않았을 경우 0.5초 후 재시도
        setTimeout(() => changeLanguage(lang), 500);
    }
}

console.log('내안의짐승 initialized with Theme & Global Lang System');
