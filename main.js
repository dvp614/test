/**
 * SoulAnimal.test - API 연동 및 고도화된 퀴즈 로직
 */

const quizData = {
    questions: [
        { id: 1, text: "낯선 파티에 초대받았을 때, 당신의 첫 행동은?", options: [{ text: "먼저 중앙으로 나가 사람들과 인사를 나눈다", weights: { lion: 2, dolphin: 3, dog: 1 } }, { text: "구석에서 아는 사람이 있는지 조용히 살핀다", weights: { cat: 2, owl: 1, sloth: 1, wolf: 1 } }] },
        { id: 2, text: "어려운 과제가 주어졌을 때 당신의 해결 방식은?", options: [{ text: "철저한 분석과 계획을 세운 후 실행한다", weights: { owl: 3, fox: 1, wolf: 1 } }, { text: "직관을 믿고 일단 부딪히며 해결책을 찾는다", weights: { lion: 1, dolphin: 1, fox: 2 } }] },
        { id: 3, text: "친구들이 당신을 부르는 별명은 주로?", options: [{ text: "든든하고 믿음직한 리더", weights: { lion: 3, wolf: 1, dog: 1 } }, { text: "분위기를 띄우는 분위기 메이커", weights: { dolphin: 3, dog: 2 } }] },
        { id: 4, text: "쉬는 날, 아무런 계획이 없다면?", options: [{ text: "침대와 한 몸이 되어 무한 휴식을 즐긴다", weights: { sloth: 3, cat: 1 } }, { text: "뭐라도 해야 직성이 풀려 밖으로 나간다", weights: { lion: 1, fox: 1, dolphin: 1 } }] },
        { id: 5, text: "갈등 상황이 생겼을 때 당신은?", options: [{ text: "자신의 의견을 당당하게 주장한다", weights: { lion: 2, wolf: 2, fox: 1 } }, { text: "상대방의 입장을 먼저 듣고 중재하려 한다", weights: { dog: 3, dolphin: 1, owl: 1 } }] },
        { id: 6, text: "새로운 기술이나 지식을 배울 때?", options: [{ text: "깊게 파고들어 원리를 완벽히 이해해야 한다", weights: { owl: 3, cat: 1 } }, { text: "빠르게 핵심만 파악하고 실전에 응용한다", weights: { fox: 3, lion: 1 } }] },
        { id: 7, text: "약속 시간에 친구가 늦는다고 하면?", options: [{ text: "그럴 수도 있지! 기다리며 다른 일을 한다", weights: { sloth: 2, dog: 2, dolphin: 1 } }, { text: "시간 엄수는 기본인데... 조금 기분이 상한다", weights: { lion: 1, owl: 2, wolf: 1 } }] },
        { id: 8, text: "당신이 가장 선호하는 업무 환경은?", options: [{ text: "팀원들과 활발히 소통하며 협업하는 환경", weights: { dolphin: 2, dog: 3, lion: 1 } }, { text: "독립적으로 집중해서 결과를 내는 환경", weights: { cat: 3, wolf: 2, owl: 1 } }] },
        { id: 9, text: "길을 가다가 곤란에 처한 사람을 보면?", options: [{ text: "먼저 다가가서 도와줄 방법을 찾는다", weights: { dog: 3, dolphin: 1, lion: 1 } }, { text: "도와주고 싶지만 쑥스러워 망설인다", weights: { cat: 2, sloth: 1, owl: 1 } }] },
        { id: 10, text: "미래를 생각할 때 당신의 감정은?", options: [{ text: "어떤 재미있는 일이 벌어질까 설렌다", weights: { dolphin: 2, fox: 2, dog: 1 } }, { text: "미리 대비하고 준비해야 한다는 책임감을 느낀다", weights: { lion: 1, owl: 2, wolf: 3 } }] },
        { id: 11, text: "여행지를 고를 때 당신의 기준은?", options: [{ text: "현지 문화를 깊게 체험할 수 있는 곳", weights: { owl: 2, wolf: 1, cat: 1 } }, { text: "모두가 즐겁고 신나게 놀 수 있는 명소", weights: { dolphin: 3, dog: 2, lion: 1 } }] },
        { id: 12, text: "결정을 내릴 때 당신이 더 의지하는 것은?", options: [{ text: "객관적인 사실과 논리", weights: { owl: 2, wolf: 2, lion: 1, fox: 1 } }, { text: "나의 느낌과 주변 사람들의 조언", weights: { dog: 2, dolphin: 2, sloth: 1, cat: 1 } }] }
    ],
    results: {
        lion: { title: "위엄 있는 정글의 왕 '사자'", emoji: "🦁", desc: "당신은 타고난 리더십과 강한 자신감을 가지고 있습니다. 목표가 정해지면 주저 없이 행동하며, 카리스마로 주변을 이끄는 힘이 있네요.", hue: 35, keyword: "lion" },
        dolphin: { title: "자유로운 바다의 전령 '돌고래'", emoji: "🐬", desc: "당신은 사교적이고 긍정적인 에너지가 넘치는 사람입니다. 타인과의 소통을 즐기며, 어떤 상황에서도 즐거움을 찾아내는 능력이 탁월합니다.", hue: 200, keyword: "dolphin" },
        owl: { title: "지혜로운 밤의 파수꾼 '부엉이'", emoji: "🦉", desc: "당신은 차분하고 분석적인 사고방식을 가진 전략가입니다. 모두가 놓치는 핵심을 꿰뚫어 보는 통찰력이 당신의 가장 큰 무기입니다.", hue: 260, keyword: "owl" },
        fox: { title: "영리하고 유연한 '여우'", emoji: "🦊", desc: "당신은 상황 판단이 빠르고 재치가 넘치는 사람입니다. 변화에 민감하며 어떤 환경에서도 빠르게 적응하는 유연함을 가졌습니다.", hue: 25, keyword: "fox" },
        sloth: { title: "여유로운 힐링 마스터 '나무늘보'", emoji: "🦥", desc: "당신은 서두르지 않고 자신만의 속도로 세상을 살아가는 평화주의자입니다. 당신의 여유는 주변 사람들에게도 편안함을 줍니다.", hue: 80, keyword: "sloth" },
        dog: { title: "다정한 우리들의 친구 '골든 리트리버'", emoji: "🦮", desc: "당신은 따뜻한 공감 능력과 한결같은 성실함을 지닌 사람입니다. 주변 사람들을 챙기고 돕는 일에서 큰 행복을 느낍니다.", hue: 45, keyword: "golden retriever" },
        cat: { title: "독립적이고 매력적인 '고양이'", emoji: "🐈", desc: "당신은 자신만의 주관이 뚜렷하고 독립적인 성향을 가졌습니다. 구속받는 것을 싫어하며 혼자만의 시간에서 큰 에너지를 얻습니다.", hue: 280, keyword: "cat" },
        wolf: { title: "냉철하고 충직한 '늑대'", emoji: "🐺", desc: "당신은 겉으론 차가워 보일 수 있지만, 내면엔 강한 책임감과 신념을 가진 사람입니다. 자신이 아끼는 사람들을 지키는 데 진심입니다.", hue: 210, keyword: "wolf" }
    }
};

let currentStep = 0;
let scores = { lion: 0, dolphin: 0, owl: 0, fox: 0, sloth: 0, dog: 0, cat: 0, wolf: 0 };

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
    resultDesc: document.getElementById('result-desc')
};

function showScreen(screenId) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    setTimeout(() => { screens[screenId].classList.add('active'); }, 50);
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
        button.onclick = () => handleOptionClick(option.weights);
        elements.optionsContainer.appendChild(button);
    });
}

function handleOptionClick(weights) {
    for (const [animal, weight] of Object.entries(weights)) { scores[animal] += weight; }
    if (currentStep < quizData.questions.length - 1) {
        currentStep++;
        updateQuiz();
    } else {
        showResult();
    }
}

async function fetchAnimalImage(keyword) {
    try {
        const response = await fetch(`https://source.unsplash.com/1600x900/?${keyword},animal`);
        return response.url;
    } catch (err) {
        return 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&h=630&q=80';
    }
}

async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        return data.slip.advice;
    } catch (err) {
        return "자신을 믿으세요. 그것이 가장 큰 힘입니다.";
    }
}

async function showResult() {
    let topAnimal = 'lion';
    let maxScore = -1;
    for (const [animal, score] of Object.entries(scores)) {
        if (score > maxScore) { maxScore = score; topAnimal = animal; }
    }
    const result = quizData.results[topAnimal];
    
    // UI 로딩 상태 표시
    elements.resultTitle.textContent = "분석 중...";
    elements.resultEmoji.textContent = "⏳";
    elements.resultDesc.textContent = "당신과 가장 닮은 동물을 찾고 있습니다.";
    showScreen('result');

    // API 연동 데이터 가져오기
    const [imageUrl, advice] = await Promise.all([
        fetchAnimalImage(result.keyword),
        fetchAdvice()
    ]);

    // UI 업데이트
    elements.resultTitle.textContent = result.title;
    elements.resultEmoji.textContent = result.emoji;
    elements.resultDesc.innerHTML = `${result.desc}<br><br><strong>🌟 영혼의 조언:</strong> ${advice}`;
    
    // 배경 이미지 적용 (옵션)
    const resultCard = document.querySelector('.result-card');
    resultCard.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('${imageUrl}')`;
    resultCard.style.backgroundSize = 'cover';
    resultCard.style.backgroundPosition = 'center';

    const detailLink = document.getElementById('detail-link');
    if (detailLink) {
        detailLink.href = `animal-${topAnimal}.html`;
        detailLink.textContent = `${result.title.split("'")[1]} 유형 심층 분석 보기 →`;
    }
    document.documentElement.style.setProperty('--hue', result.hue);
}

async function shareResult() {
    const title = '영혼의 동물 찾기 테스트 결과';
    const text = `나의 영혼의 동물은 '${elements.resultTitle.textContent}'입니다! 당신은 어떤 동물인가요?`;
    const url = window.location.href;
    if (navigator.share) {
        try { await navigator.share({ title, text, url }); } catch (err) { console.error('공유 실패:', err); }
    } else {
        try { await navigator.clipboard.writeText(`${text}\n${url}`); alert('결과가 클립보드에 복사되었습니다.'); } catch (err) { alert('공유 기능을 사용할 수 없습니다.'); }
    }
}

function initQuiz() {
    currentStep = 0;
    scores = { lion: 0, dolphin: 0, owl: 0, fox: 0, sloth: 0, dog: 0, cat: 0, wolf: 0 };
    document.documentElement.style.setProperty('--hue', 250);
    updateQuiz();
    showScreen('quiz');
}

elements.startBtn.onclick = initQuiz;
elements.restartBtn.onclick = () => {
    const resultCard = document.querySelector('.result-card');
    resultCard.style.backgroundImage = 'none';
    showScreen('intro');
};
elements.shareBtn.onclick = shareResult;
console.log('Soul Animal Test Pro initialized');
