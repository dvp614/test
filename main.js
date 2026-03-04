/**
 * 성격 유형 테스트 로직
 */

// 1. 데이터 정의
const quizData = {
    questions: [
        {
            id: 1,
            text: "새로운 사람들을 만날 때 당신의 반응은?",
            options: [
                { text: "먼저 다가가서 말을 건다", types: { E: 2, I: 0 } },
                { text: "상대방이 먼저 말을 걸 때까지 기다린다", types: { E: 0, I: 2 } }
            ]
        },
        {
            id: 2,
            text: "주말을 보내는 가장 이상적인 방법은?",
            options: [
                { text: "밖으로 나가 친구들과 활기차게 노는 것", types: { E: 2, S: 1 } },
                { text: "집에서 혼자 조용히 취미 생활을 즐기는 것", types: { I: 2, N: 1 } }
            ]
        },
        {
            id: 3,
            text: "일을 처리할 때 당신의 스타일은?",
            options: [
                { text: "철저한 계획을 세워 하나씩 해결한다", types: { J: 2, S: 1 } },
                { text: "상황에 따라 유연하게 즉흥적으로 대응한다", types: { P: 2, N: 1 } }
            ]
        },
        {
            id: 4,
            text: "영화나 책을 볼 때 당신이 더 끌리는 것은?",
            options: [
                { text: "현실적이고 구체적인 이야기", types: { S: 2, T: 1 } },
                { text: "상상력을 자극하는 추상적인 세계관", types: { N: 2, F: 1 } }
            ]
        },
        {
            id: 5,
            text: "친구의 고민 상담을 해줄 때 당신은?",
            options: [
                { text: "객관적인 해결책을 제시하려 노력한다", types: { T: 2, J: 1 } },
                { text: "친구의 감정에 공감하며 위로해준다", types: { F: 2, P: 1 } }
            ]
        }
    ],
    results: [
        {
            id: "E",
            title: "에너지 넘치는 인싸",
            emoji: "🔥",
            desc: "당신은 사람들과 어울릴 때 에너지를 얻는 타입입니다. 어디서나 활발하고 사교적인 당신은 팀의 분위기 메이커군요!"
        },
        {
            id: "I",
            title: "사색을 즐기는 예술가",
            emoji: "🌙",
            desc: "당신은 내면의 세계가 깊고 혼자만의 시간을 소중히 여깁니다. 조용한 관찰력을 통해 남들이 보지 못하는 것을 발견하곤 하죠."
        },
        {
            id: "S",
            title: "꼼꼼한 현실주의자",
            emoji: "📐",
            desc: "당신은 구체적이고 현실적인 데이터를 중요시합니다. 실수가 적고 맡은 바 책임을 다하는 든든한 사람입니다."
        },
        {
            id: "N",
            title: "창의적인 몽상가",
            emoji: "✨",
            desc: "당신은 상상력이 풍부하고 새로운 가능성을 찾는 것을 즐깁니다. 가끔 엉뚱하다는 소리를 듣지만, 세상은 당신 같은 혁신가가 바꿉니다!"
        }
    ]
};

// 2. 상태 관리
let currentStep = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// 3. DOM 요소 참조
const screens = {
    intro: document.getElementById('intro-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
};

const elements = {
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    progressBar: document.getElementById('progress-bar'),
    questionNumber: document.getElementById('question-number'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    resultTitle: document.getElementById('result-title'),
    resultEmoji: document.getElementById('result-emoji'),
    resultDesc: document.getElementById('result-desc')
};

// 4. 기능 함수
function showScreen(screenId) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenId].classList.add('active');
}

function updateQuiz() {
    const question = quizData.questions[currentStep];
    const totalSteps = quizData.questions.length;
    
    // UI 업데이트
    elements.questionNumber.textContent = `${currentStep + 1} / ${totalSteps}`;
    elements.questionText.textContent = question.text;
    elements.progressBar.style.width = `${((currentStep + 1) / totalSteps) * 100}%`;
    
    // 옵션 생성
    elements.optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => handleOptionClick(option.types);
        elements.optionsContainer.appendChild(button);
    });
}

function handleOptionClick(types) {
    // 점수 합산
    for (const [type, score] of Object.entries(types)) {
        scores[type] += score;
    }
    
    // 다음 단계로
    if (currentStep < quizData.questions.length - 1) {
        currentStep++;
        updateQuiz();
    } else {
        showResult();
    }
}

function showResult() {
    // 가장 높은 점수의 유형 찾기 (간단하게 E/I/S/N 중 최고점)
    const candidates = ['E', 'I', 'S', 'N'];
    let topType = 'E';
    let maxScore = -1;
    
    candidates.forEach(type => {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            topType = type;
        }
    });
    
    const result = quizData.results.find(r => r.id === topType);
    
    // UI 업데이트
    elements.resultTitle.textContent = result.title;
    elements.resultEmoji.textContent = result.emoji;
    elements.resultDesc.textContent = result.desc;
    
    // 테마 색상 변경 (OKLCH 변수 활용)
    const hues = { 'E': 20, 'I': 250, 'S': 180, 'N': 300 };
    document.documentElement.style.setProperty('--hue', hues[topType]);
    
    showScreen('result');
}

function initQuiz() {
    currentStep = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    document.documentElement.style.setProperty('--hue', 250);
    updateQuiz();
    showScreen('quiz');
}

// 5. 이벤트 바인딩
elements.startBtn.onclick = initQuiz;
elements.restartBtn.onclick = () => showScreen('intro');
document.getElementById('share-btn').onclick = () => {
    alert('결과가 클립보드에 복사되었습니다! (시뮬레이션)');
};

// 초기화 로그
console.log('Personality Test App Loaded');
