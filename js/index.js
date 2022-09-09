import { listQuestionAnswer } from "./listQuestionAnswer.js";

const refs = {
    buttonNext: document.querySelector(".nextBtn"),
    questions: document.querySelector(".question__wrapper"),
}

let results = {};
refs.questions.addEventListener('click', setResults);
refs.buttonNext.addEventListener('click', nextQuestion)

function renderQuestions(index) {
    refs.questions.dataset.currentPage = index;

    const renderAnswers = () => {
        return listQuestionAnswer[index].answers.map(answer => {
            return `
                <li class="answer__item">
                    <${answer.tag} class="radio" type=${answer.type} name=${answer.name} value=${answer.value} id=${answer.id} />
                    <label for=${answer.id} class="answer__label">${answer.value}</label>
                </li>
            `;
        }).join('');
    };

    refs.questions.innerHTML = `
        <div class="question">
            <p class="question__title">
                ${listQuestionAnswer[index].question}
            </p>
        </div>
        <div class="answer-list">
            <form>
                <ul class="answer">
                    ${renderAnswers()}
                </ul>
            </form>
        </div>
    `;
}

function nextQuestion(e) {
    if (e.target.classList.contains('nextBtn')) {
        const page = Number(refs.questions.dataset.currentPage) + 1;
        renderQuestions(page);
        refs.buttonNext.classList.add("visually-hidden");
    }
}

function setResults(e) {
    if (e.target.classList.contains('radio')) {
        results[e.target.name] = e.target.value;
        refs.buttonNext.classList.remove("visually-hidden");
    }
}

renderQuestions(0);