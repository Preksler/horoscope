import { listQuestionAnswer } from "./listQuestionlistQuestionAnswer.js";

const refs = {
    quiz: document.querySelector(".page__start"),
    questions: document.querySelector(".question"),
    questionText: document.querySelector(".question__title"),
    answerList: document.querySelector(".answer__list"),
    progress: document.querySelector(".question__progress"),
    progressLoad: document.querySelector(".question__progress-load"),
    selectMessage: document.querySelector(".birthday__message"),
    zodiacWrapper: document.querySelector(".zodiac__wrapper"),
    zodiacImage: document.querySelector(".zodiac__image"),
    zodiacName: document.querySelector(".zodiac__name"),
    buttonNext: document.querySelector(".nextBtn"),
}

let results = {};
refs.questions.addEventListener('click', setResults);
refs.questions.addEventListener('change', zodiacSign);
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
        if (nextIndex === listQuestionAnswer.length - 1) {
            renderBirthday(nextIndex)
        } else {
            renderQuestions(nextIndex);
        }
        refs.buttonNext.classList.add("visually-hidden");
        refs.answerList.classList.add("answer__column");
        refs.progress.classList.remove("question__progress-hidden");
        refs.progressLoad.style.width = loadProgress(nextIndex);
    }
}

function renderBirthday(index) {
    const allDay = ['День'];
    const allMonth = ['Месяц'];
    const allYears = ['Год'];
    for (let i = 1; i <= 31; i++){
        allDay.push(i);
    }
    for (let i = 1; i <= 12; i++){
        allMonth.push(i);
    }
    for (let i = 1940; i <= 2020; i++){
        allYears.push(i);
    }
    refs.questionText.innerHTML = listQuestionAnswer[index].question;
    refs.answerList.classList.add("answer__column-birthday");
    refs.zodiacWrapper.classList.remove("visually-hidden")
    
    refs.answerList.innerHTML = `
        <select class="select" id="day">
            ${birthdayOptions(allDay)}
        </select>
        <select class="select" id="month">
            ${birthdayOptions(allMonth)}
        </select>
        <select class="select" id="year">
            ${birthdayOptions(allYears)}
        </select>
    `;
}

function zodiacSign(e) {
    if (e.target.classList.contains('select')) {
        const day = Number(document.getElementById("day").value);
        const month = Number(document.getElementById("month").value);
        const year = Number(document.getElementById("year").value);

        if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
            refs.selectMessage.classList.remove("visually-hidden");
            refs.buttonNext.classList.add("visually-hidden")
            refs.zodiacImage.innerHTML = '';
            refs.zodiacName.innerHTML = '';
        } else {
            refs.selectMessage.classList.add("visually-hidden")
        }
 
        if (month == 1 && day >= 20 || month == 2 && day <= 18) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                    <img src="../images/11_Aquarius.png" alt="Водолей" />
                `;
                refs.zodiacName.innerHTML = "Водолей";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 2 && day >= 19 || month == 3 && day <= 20) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/12_Pisces.png" alt="Рыбы" />
                `;
                refs.zodiacName.innerHTML = "Рыбы";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 3 && day >= 21 || month == 4 && day <= 19) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/1_aries.png" alt="Овен" />
                `;
                refs.zodiacName.innerHTML = "Овен";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/2_Taurus.png" alt="Телец" />
                `;
                refs.zodiacName.innerHTML = "Телец";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 5 && day >= 21 || month == 6 && day <= 21) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/3_Gemini.png" alt="Близнецы" />
                `;
                refs.zodiacName.innerHTML = "Близнецы";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 6 && day >= 22 || month == 7 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/4_Rak.png" alt="Рак" />
                `;
                refs.zodiacName.innerHTML = "Рак";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/5_Leo.png" alt="Лев" />
                `;
                refs.zodiacName.innerHTML = "Лев";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/6_Virgo.png" alt="Дева" />
                `;
                refs.zodiacName.innerHTML = "Дева";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 9 && day >= 23 || month == 10 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/7_Libra.png" alt="Весы" />
                `;
                refs.zodiacName.innerHTML = "Весы";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 10 && day >= 23 || month == 11 && day <= 21) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/8_Scorpio.png" alt="Скорпион" />
                `;
                refs.zodiacName.innerHTML = "Скорпион";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 11 && day >= 22 || month == 12 && day <= 21) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/9_Sagittarius.png" alt="Стрелец" />
                `;
                refs.zodiacName.innerHTML = "Стрелец";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="../images/10_Capricorn.png" alt="Козерог" />
                `;
                refs.zodiacName.innerHTML = "Козерог";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
    }
}

function birthdayOptions(array) {
    return array.map(item => {
        return `
            <option class="select__option" value=${item}>${item}</option>
        `;
    })
}

function loadProgress(index) {
    const length = listQuestionAnswer.length - 1;
    const progressPercent = ((index / length) * 100) + '%';
    return progressPercent;
}

function setResults(e) {
    if (e.target.classList.contains('radio')) {
        results[e.target.name] = e.target.value;
        refs.buttonNext.classList.remove("visually-hidden");
    }
    if (e.target.classList.contains('select')) {
        results[e.target.name] = e.target.value;
    }
}

renderQuestions(0);
