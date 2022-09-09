import { listQuestionAnswer } from "./listQuestionlistQuestionAnswer.js";

const refs = {
    quiz: document.querySelector(".page__start"),
    questions: document.querySelector(".question"),
    questionText: document.querySelector(".question__title"),
    answerList: document.querySelector(".answer__list"),
    progress: document.querySelector(".question__progress"),
    progressLoad: document.querySelector(".question__progress-load"),
    buttonNext: document.querySelector(".nextBtn"),
}

let results = {};
refs.questions.addEventListener('click', setResults);
refs.buttonNext.addEventListener('click', nextQuestion);

function renderQuestions(index) {
    refs.questions.dataset.currentPage = index;

    const renderAnswers = () => {
        if (index === 0) {
            return listQuestionAnswer[index].answers.map(answer => {
                return `
                    <li>
                        <${answer.tag} class="radio" type=${answer.type} name=${answer.name} value=${answer.value} id=${answer.id} />
                        <label for=${answer.id} class="answer__label">${answer.value}</label>
                    </li>
                `;
            }).join('');
        }
        return listQuestionAnswer[index].answers.map(answer => {
            return `
                <li class="answer__item">
                    <${answer.tag} class="radio" type=${answer.type} name=${answer.name} value=${answer.value} id=${answer.id} />
                    <label for=${answer.id} class="answer__label">${answer.value}</label>
                </li>
            `;
        }).join('');
    };

    startQuiz(index);
    refs.questionText.innerHTML = listQuestionAnswer[index].question;
    refs.answerList.innerHTML = renderAnswers();
}

function startQuiz(index) {
    if (index !== 0) {
        refs.quiz.innerHTML = '';
        return
    }
    refs.quiz.innerHTML = `
        <div class="page__image-wrapper">
            <img src="./images/thumb-image.jpg" class="page__image" width="287" height="158" />
            <img src="./images/zodiac-image.png" class="page__image-zodiac" width="146" height="160" />
        </div>
        <h2 class="page__title">
            Узнайте, как 2021 год изменит жизнь каждого из нас!
        </h2>
        <p class="page__text">
            К сожалению, 2020 год принес нам немало неприятностей, даже откровенных проблем и несчастий. Не смотря на
            это, 3 знака зодиака очень скоро обретут долгожданное счастье! 2021 год затронет своими потрясениями каждого из нас.
        </p>
    `;
    refs.progress.classList.add("question__progress-hidden");
}

function nextQuestion(e) {
    if (e.target.classList.contains('nextBtn')) {
        const nextIndex = Number(refs.questions.dataset.currentPage) + 1;
        renderQuestions(nextIndex);
        refs.buttonNext.classList.add("visually-hidden");
        refs.answerList.classList.add("answer__column");
        refs.progress.classList.remove("question__progress-hidden");
        refs.progressLoad.style.width = loadProgress();
    }
}

function loadProgress() {
    const index = Number(refs.questions.dataset.currentPage);
    const length = listQuestionAnswer.length;
    const progressPercent = ((index / length) * 100) + '%';
    return progressPercent;
}

function setResults(e) {
    if (e.target.classList.contains('radio')) {
        results[e.target.name] = e.target.value;
        refs.buttonNext.classList.remove("visually-hidden");
    }
}

renderQuestions(0);
