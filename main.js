/**
 * 내안의짐승 - 16가지 성격 유형별 소울 애니멀 분석 로직
 */

const quizData = {
    questions: [
        { id: 1, text: "새로운 모임에서 당신의 위치는?", options: [{ text: "중심에서 대화를 주도한다", weights: { lion: 2, dolphin: 2, tiger: 2, monkey: 2 } }, { text: "가장자리에서 상황을 살핀다", weights: { owl: 2, cat: 2, snake: 2, wolf: 2 } }] },
        { id: 2, text: "일을 처리할 때 더 선호하는 방식은?", options: [{ text: "철저한 계획과 데이터 분석", weights: { owl: 2, elephant: 2, snake: 2, ant: 2 } }, { text: "직관과 유연한 대처", weights: { fox: 2, horse: 2, eagle: 2, monkey: 2 } }] },
        { id: 3, text: "위기 상황이 닥쳤을 때 당신은?", options: [{ text: "빠르게 판단하고 앞장서 해결한다", weights: { lion: 2, wolf: 2, tiger: 2, eagle: 2 } }, { text: "차분하게 대안을 생각하며 관망한다", weights: { sloth: 2, panda: 2, turtle: 2, owl: 2 } }] },
        { id: 4, text: "휴식을 취할 때 가장 행복한 순간은?", options: [{ text: "사람들과 어울리며 에너지를 얻을 때", weights: { dog: 2, dolphin: 2, monkey: 2, sheep: 2 } }, { text: "혼자만의 시간을 가지며 재충전할 때", weights: { cat: 2, sloth: 2, tiger: 2, polarbear: 2 } }] },
        { id: 5, text: "갈등이 생겼을 때 당신의 태도는?", options: [{ text: "팩트를 짚고 확실히 짚고 넘어간다", weights: { wolf: 2, snake: 2, eagle: 2, ant: 2 } }, { text: "감정을 살피고 원만하게 해결하려 한다", weights: { dog: 2, dolphin: 2, sheep: 2, sloth: 2 } }] },
        { id: 6, text: "새로운 프로젝트를 시작할 때 당신은?", options: [{ text: "전체적인 그림과 비전을 그린다", weights: { eagle: 2, lion: 2, horse: 2, fox: 2 } }, { text: "세부적인 실행 지침부터 파악한다", weights: { ant: 2, elephant: 2, turtle: 2, owl: 2 } }] },
        { id: 7, text: "남들이 보는 당신의 주된 이미지는?", options: [{ text: "열정적이고 에너지가 넘치는 person", weights: { tiger: 2, horse: 2, dolphin: 2, monkey: 2 } }, { text: "차분하고 믿음직스러운 사람", weights: { elephant: 2, polarbear: 2, turtle: 2, owl: 2 } }] },
        { id: 8, text: "어떤 결정을 내릴 때 가장 중요한 것은?", options: [{ text: "논리적인 타당성과 효율성", weights: { snake: 2, wolf: 2, ant: 2, owl: 2 } }, { text: "주변의 영향과 가치 지향점", weights: { dog: 2, sloth: 2, sheep: 2, panda: 2 } }] },
        { id: 9, text: "스트레스를 받는 상황에서 당신은?", options: [{ text: "몸을 움직이거나 활동적으로 푼다", weights: { tiger: 2, horse: 2, lion: 2, monkey: 2 } }, { text: "조용한 곳에서 생각을 정리한다", weights: { cat: 2, sloth: 2, owl: 2, snake: 2 } }] },
        { id: 10, text: "약속 시간에 대한 당신의 생각은?", options: [{ text: "신뢰의 기본! 5분 전에는 도착해야 한다", weights: { ant: 2, wolf: 2, elephant: 2, turtle: 2 } }, { text: "상황에 따라 조금 늦을 수도 있다", weights: { fox: 2, cat: 2, dolphin: 2, horse: 2 } }] },
        { id: 11, text: "자신 있는 당신의 강점은?", options: [{ text: "창의적이고 독창적인 아이디어", weights: { fox: 2, cat: 2, monkey: 2, dolphin: 2 } }, { text: "성실하고 꾸준한 실행력", weights: { ant: 2, turtle: 2, polarbear: 2, elephant: 2 } }] },
        { id: 12, text: "인생에서 가장 중요하게 생각하는 가치는?", options: [{ text: "성취와 성공, 그리고 인정", weights: { lion: 2, tiger: 2, eagle: 2, fox: 2 } }, { text: "자유와 평화, 그리고 행복", weights: { sloth: 2, panda: 2, dolphin: 2, horse: 2 } }] }
    ],
    results: {
        lion: { title: "카리스마 있는 전략 리더 '사자'", emoji: "🦁", hue: 35, keyword: "lion", desc: "당신은 타고난 지배력과 전략적 사고를 지닌 리더입니다. 목표가 정해지면 주저 없이 행동하며, 카리스마로 공동체를 이끕니다.", advice: "모든 짐을 혼자 짊어질 필요는 없습니다. 취약성을 드러내는 것이 때로는 더 큰 신뢰를 구축합니다." },
        tiger: { title: "독립적인 야심가 '호랑이'", emoji: "🐯", hue: 25, keyword: "tiger", desc: "강력한 경쟁심과 독립심을 지녔습니다. 타인의 도움 없이도 스스로 길을 개척하며 결과로 자신의 가치를 증명합니다.", advice: "혼자 가면 빠르지만 함께 가면 멀리 갑니다. 타인의 부족함을 비난하기보다 성장을 돕는 스승의 태도를 가져보세요." },
        wolf: { title: "원칙과 충직의 가디언 '늑대'", emoji: "🐺", hue: 210, keyword: "wolf", desc: "강한 책임감과 신념을 바탕으로 집단을 지킵니다. 겉으론 냉철해 보이지만 내면은 누구보다 뜨거운 충성심을 지녔습니다.", advice: "원칙은 사람을 위해 존재하는 것입니다. 가끔은 예외를 인정하는 유연함이 집단을 더 건강하게 만듭니다." },
        fox: { title: "영리한 전술가 '여우'", emoji: "🦊", hue: 45, keyword: "fox", desc: "상황 판단이 빠르고 재치가 넘칩니다. 고정관념에 얽매이지 않는 유연한 사고로 어떤 복잡한 문제도 효율적으로 해결합니다.", advice: "모든 것을 머리로만 해결하려 하지 마세요. 가끔은 가슴으로 하는 우직한 진심이 더 큰 문을 엽니다." },
        dolphin: { title: "공감하는 소셜 마스터 '돌고래'", emoji: "🐬", hue: 200, keyword: "dolphin", desc: "뛰어난 지능과 사회성을 바탕으로 공동체의 화합을 이끕니다. 타인의 감정을 읽는 능력이 탁월하며 긍정적인 에너지를 전파합니다.", advice: "당신이 모든 사람의 기분을 책임질 수는 없습니다. 건강한 거리두기가 당신의 다정함을 더 오래 유지시켜 줍니다." },
        dog: { title: "한결같은 서포터 '리트리버'", emoji: "🦮", hue: 50, keyword: "dog", desc: "따뜻한 공감 능력과 성실함을 지닌 평화주의자입니다. 자신의 이익보다 타인의 행복에서 더 큰 만족감을 느끼는 헌신적인 유형입니다.", advice: "당신의 '아니요'는 나쁜 것이 아닙니다. 자신의 경계를 지킬 때 당신의 선의도 더욱 가치 있어집니다." },
        cat: { title: "독립적인 심미안 '고양이'", emoji: "🐈", hue: 280, keyword: "cat", desc: "자기 주관이 뚜렷하며 독립적인 공간을 중요시합니다. 세밀한 관찰력과 미적 감각을 지녔으며 구속받는 것을 극도로 싫어합니다.", advice: "독립성은 고립이 아닙니다. 가끔은 당신의 아름다운 세계를 타인과 공유하며 소통의 다리를 놓아보세요." },
        owl: { title: "냉철한 통찰가 '부엉이'", emoji: "🦉", hue: 260, keyword: "owl", desc: "감정에 휘둘리지 않는 객관적인 분석가입니다. 보이지 않는 핵심을 꿰뚫는 통찰력을 지녔으며 완벽주의적 성향이 강합니다.", advice: "완벽한 준비란 세상에 없습니다. 80%의 확신이 있다면 행동으로 옮기며 배워가는 유연성을 가져보세요." },
        elephant: { title: "묵직한 신뢰의 아이콘 '코끼리'", emoji: "🐘", hue: 190, keyword: "elephant", desc: "인내심과 기억력이 뛰어나며 집단의 안정을 최우선으로 합니다. 화를 잘 내지 않지만 결정적인 순간에는 엄청난 힘을 발휘합니다.", advice: "당신의 견고함은 최고이지만, 가끔은 가벼워질 필요가 있습니다. 변화의 파도를 타고 유연하게 움직이는 법을 익혀보세요." },
        eagle: { title: "비전을 그리는 전략가 '독수리'", emoji: "🦅", hue: 220, keyword: "eagle", desc: "높은 곳에서 멀리 보는 통찰력과 결단력을 지녔습니다. 사소한 것에 연연하지 않고 거시적인 관점에서 목표를 포착합니다.", advice: "가끔은 구름 위에서 내려와 사람들의 구체적인 삶을 들여다보세요. 위대한 비전은 현실의 토대 위에서 완성됩니다." },
        sloth: { title: "평화로운 힐링 마스터 '나무늘보'", emoji: "🦥", hue: 85, keyword: "sloth", desc: "서두르지 않고 자신만의 속도로 삶을 즐깁니다. 타인에게 경쟁심을 느끼지 않으며 존재 자체로 주변에 편안함을 줍니다.", advice: "휴식은 당신의 힘이지만, 가끔은 전력 질주가 필요한 순간이 있습니다. 그 에너지를 모아 한 번씩 보여주는 임팩트가 필요합니다." },
        panda: { title: "유니크한 낙천가 '판다'", emoji: "🐼", hue: 10, keyword: "panda", desc: "자신만의 독특한 라이프스타일을 추구하는 평화주의자입니다. 희소성 있는 매력을 지녔으며 복잡한 세상 속에서 순수함을 유지합니다.", advice: "당신의 낙원은 소중하지만, 현실의 기반이 튼튼할 때 그 낙원도 오래 유지됩니다. 최소한의 현실적 책임감을 갖추어 보세요." },
        snake: { title: "지적인 관찰자 '뱀'", emoji: "🐍", hue: 140, keyword: "snake", desc: "감정을 겉으로 드러내지 않고 상황을 냉정하게 관찰합니다. 최소한의 움직임으로 최대의 효율을 뽑아내는 전략적 효율가입니다.", advice: "가끔은 당신의 의도와 감정을 투명하게 공유해 보세요. 투명함이 당신의 지적인 매력을 더욱 돋보이게 할 것입니다." },
        horse: { title: "역동적인 자유 영혼 '말'", emoji: "🐎", hue: 30, keyword: "horse", desc: "멈추지 않는 에너지와 자유를 향한 갈망을 지녔습니다. 도전을 즐기며 새로운 환경에 뛰어드는 모험가적 기질이 강합니다.", advice: "달리는 것만큼 멈추어 서서 뒤를 돌아보는 것도 중요합니다. 당신이 지나온 길의 발자국을 확인하며 완결성을 높여보세요." },
        monkey: { title: "재치 있는 아이디어 뱅크 '원숭이'", emoji: "🐒", hue: 40, keyword: "monkey", desc: "창의적인 발상과 사교적인 위트를 겸비했습니다. 지루한 것을 참지 못하며 끊임없이 새로운 재미와 자극을 만들어냅니다.", advice: "하나의 우물을 깊게 파는 인내가 필요합니다. 당신의 다재다능함이 전문성이라는 줄기를 만날 때 비로소 거대한 나무가 됩니다." },
        turtle: { title: "끈기 있는 완결자 '거북이'", emoji: "🐢", hue: 120, keyword: "turtle", desc: "느리지만 확실하게 목표에 도달하는 끈기의 대명사입니다. 원칙을 중시하며 한 번 시작한 일은 끝까지 책임지는 성실파입니다.", advice: "가끔은 등껍질 밖으로 고개를 내밀고 세상의 빠른 변화를 느껴보세요. 당신의 끈기에 효율이 더해지면 무적입니다." }
    }
};

let currentStep = 0;
let scores = { 
    lion: 0, tiger: 0, wolf: 0, fox: 0, dolphin: 0, dog: 0, cat: 0, owl: 0,
    elephant: 0, eagle: 0, sloth: 0, panda: 0, snake: 0, horse: 0, monkey: 0, turtle: 0 
};

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
    navLinks: document.getElementById('nav-links')
};

function toggleMenu() {
    const isActive = elements.navLinks.classList.toggle('active');
    elements.menuToggle.classList.toggle('active');
    elements.menuToggle.setAttribute('aria-expanded', isActive);
    document.body.classList.toggle('menu-open', isActive);
}

if (elements.menuToggle) {
    elements.menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
}

document.addEventListener('click', (e) => {
    if (elements.navLinks && elements.navLinks.classList.contains('active') && 
        !elements.navLinks.contains(e.target) && 
        !elements.menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

if (elements.navLinks) {
    elements.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (elements.navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

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
        button.onclick = () => handleOptionClick(option.weights);
        elements.optionsContainer.appendChild(button);
    });
}

function handleOptionClick(weights) {
    for (const [animal, weight] of Object.entries(weights)) { 
        if (scores.hasOwnProperty(animal)) scores[animal] += weight; 
    }
    if (currentStep < quizData.questions.length - 1) {
        currentStep++;
        updateQuiz();
    } else {
        showResult();
    }
}

async function showResult() {
    let topAnimal = 'lion';
    let maxScore = -1;
    for (const [animal, score] of Object.entries(scores)) {
        if (score > maxScore) { maxScore = score; topAnimal = animal; }
    }
    const result = quizData.results[topAnimal];
    
    elements.resultTitle.textContent = "영혼 분석 중...";
    elements.resultEmoji.textContent = "⏳";
    elements.resultDesc.textContent = "당신의 본능을 계산하고 있습니다.";
    showScreen('result');

    setTimeout(() => {
        elements.resultTitle.textContent = result.title;
        elements.resultEmoji.textContent = result.emoji;
        elements.resultDesc.textContent = result.desc;
        
        const adviceText = document.querySelector('.advice-text');
        if (adviceText) {
            adviceText.textContent = `"${result.advice}"`;
        }
        
        const detailLink = document.getElementById('detail-link');
        if (detailLink) {
            detailLink.href = `animal-${topAnimal}.html`;
            detailLink.textContent = `${result.title.split("'")[1]} 유형 심층 분석 보기 →`;
        }
        document.documentElement.style.setProperty('--hue', result.hue);
    }, 1500);
}

async function shareResult() {
    const title = '내안의짐승 - 나의 본능 확인하기';
    const text = `나의 정체는 '${elements.resultTitle.textContent}'입니다! 당신은 어떤 짐승인가요?`;
    const url = window.location.href;
    if (navigator.share) {
        try { await navigator.share({ title, text, url }); } catch (err) {}
    } else {
        try { await navigator.clipboard.writeText(`${text}\n${url}`); alert('복사되었습니다.'); } catch (err) {}
    }
}

function initQuiz() {
    currentStep = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);
    document.documentElement.style.setProperty('--hue', 260);
    updateQuiz();
    showScreen('quiz');
}

if (elements.startBtn) elements.startBtn.onclick = initQuiz;
if (elements.restartBtn) elements.restartBtn.onclick = () => showScreen('intro');
if (elements.shareBtn) elements.shareBtn.onclick = shareResult;
console.log('내안의짐승 initialized');
