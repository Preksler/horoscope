import { listQuestionAnswer } from "./listQuestionlistQuestionAnswer.js";
import { fetchPeople } from "./fetchAPI.js";

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
    pageResults: document.querySelector(".page__results"),
    resultProgressAnimation: document.querySelector(".results__progress-load"),
    resultProgressPercent: document.querySelector(".results__progress-percent"),
    resultsList: document.querySelectorAll(".results__item .results__success-red"),
    resultsSuccess: document.querySelector(".results__ready"),
    finishPage: document.querySelector(".page__finish"),
    finishPageContainer: document.querySelector(".finish"),
    fetchResults: document.querySelector(".fetch__table"),
    buttonNext: document.querySelector(".next__button"),
    buttonCall: document.querySelector(".call__button"),
}

let results = {};
refs.questions.addEventListener('click', setResults);
refs.questions.addEventListener('change', zodiacSign);
refs.buttonNext.addEventListener('click', nextQuestion);
refs.buttonCall.addEventListener('click', getPeopleInfo);

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
    if (e.target.classList.contains('next__button')) {
        const nextIndex = Number(refs.questions.dataset.currentPage) + 1;
        // if (nextIndex === listQuestionAnswer.length - 1) {
        //     renderBirthday(nextIndex);
        // } else {
        //     renderQuestions(nextIndex);
        // }
        if (nextIndex === listQuestionAnswer.length) {
            renderResults();
        } else if (nextIndex === listQuestionAnswer.length - 1) {
            renderBirthday(nextIndex);
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
    refs.questions.dataset.currentPage = index;
    const allDay = ['День'];
    const allMonth = ['Месяц'];
    const allYears = ['Год'];
    const year = new Date().getFullYear();
    for (let i = 1; i <= 31; i++){
        if (i < 10){i = '0' + i}
        allDay.push(i);
    }
    for (let i = 1; i <= 12; i++){
        if (i < 10){i = '0' + i}
        allMonth.push(i);
    }
    for (let i = 1940; i <= year; i++){
        allYears.push(i);
    }
    refs.questionText.innerHTML = listQuestionAnswer[index].question;
    refs.answerList.classList.add("answer__column-birthday");
    refs.zodiacWrapper.classList.remove("visually-hidden");
    
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

function renderResults() {
    refs.questions.innerHTML = '';
    loadProgressPercent();
    resultsAnalysisProgress();
    refs.pageResults.classList.remove("visually-hidden");
    let timerId = setTimeout(() => {
        refs.pageResults.innerHTML = '';
        renderFinishPage();
        clearTimeout(timerId);
    }, 5000)
}

function renderFinishPage() {
    refs.finishPage.classList.remove("visually-hidden");
    refs.questions.innerHTML = '';
    refs.finishPageContainer.innerHTML = `
        <p class="finish__thanks"> Спасибо за Ваши ответы! </p>
        <p class="finish__congratulations">Поздравляем! Прослушать свой персональный гороскоп возможно уже сейчас!</p>
        <div class="finish__wrapper">
            <h2 class="finish__title">2021 год Вас ошарашит!</h2>
            <p class="finish__text">Вас ждёт то, чего Вы никак не ожидали. Первые известия Вы получите совсем скоро, возможно это 17-18 ноября!</p>
            <p class="finish__text">Что бы прослушать аудио-сообщение, необходимо нажать на кнопку ниже и позвонить со своего мобильного телефона. Позвоните и Прослушайте очень серьезную информацию!</p>
        </div>
    `;
    refs.buttonCall.classList.remove("visually-hidden")
}

async function getPeopleInfo() {
    try {
        const peopleInfo = await fetchPeople();
        renderPeopleInfo(peopleInfo);
    } catch (error) {
        console.log(error);
    }
}

function renderPeopleInfo(info) {
    const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        films,
        species,
        vehicles,
        starships,
        created,
        edited,
        url
    } = info;
    refs.fetchResults.innerHTML = `
        <table class="table">
            <tr>
                <td>Имя: </td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Рост: </td>
                <td>${height}</td>
            </tr>
            <tr>
                <td>Масса: </td>
                <td>${mass}</td>
            </tr>
            <tr>
                <td>Цвет волос: </td>
                <td>${hair_color}</td>
            </tr>
            <tr>
                <td>Цвет кожи: </td>
                <td>${skin_color}</td>
            </tr>
            <tr>
                <td>Цвет глаз: </td>
                <td>${eye_color}</td>
            </tr>
            <tr>
                <td>Год рождения: </td>
                <td>${birth_year}</td>
            </tr>
            <tr>
                <td>Пол: </td>
                <td>${gender}</td>
            </tr>
            <tr>
                <td>Родной мир: </td>
                <td><a href="${homeworld} target="_blank"">${homeworld}</a></td>
            </tr>
            <tr>
                <td>Фильмы: </td>
                <td>
                    ${films.map(item => {
                        return `<a href="${item}" target="_blank">${item}</a><br />`
                    }).join('')}
                </td>
            </tr>
            <tr>
                <td>Разновидность: </td>
                <td>${species}</td>
            </tr>
            <tr>
                <td>Транспортные средства: </td>
                <td>
                    ${vehicles.map(item => {
                        return `<a href="${item}" target="_blank">${item}</a><br />`
                    }).join('')}
                </td>
            </tr>
            <tr>
                <td>Звездолеты: </td>
                <td>
                    ${starships.map(item => {
                        return `<a href="${item}" target="_blank">${item}</a><br />`
                    }).join('')}
                </td>
            </tr>
            <tr>
                <td>Созданный: </td>
                <td>${created}</td>
            </tr>
            <tr>
                <td>Отредактировано: </td>
                <td>${edited}</td>
            </tr>
            <tr>
                <td>URL: </td>
                <td><a href="${url} target="_blank"">${url}</a></td>
            </tr>
        </table>
    `;
}

function zodiacSign(e) {
    if (e.target.classList.contains('select')) {
        const day = Number(document.getElementById("day").value);
        const month = Number(document.getElementById("month").value);
        const year = Number(document.getElementById("year").value);

        if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
            refs.selectMessage.classList.remove("visually-hidden");
            refs.buttonNext.classList.add("visually-hidden");
            refs.zodiacImage.innerHTML = '';
            refs.zodiacName.innerHTML = '';
            refs.zodiacWrapper.style.paddingBottom = "28px";
        } else {
            refs.selectMessage.classList.add("visually-hidden");
            refs.zodiacWrapper.style.paddingBottom = "0";
        }
 
        if (month == 1 && day >= 20 || month == 2 && day <= 18) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                    <img src="./images/11_Aquarius.png" alt="Водолей" />
                `;
                refs.zodiacName.innerHTML = "Водолей";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 2 && day >= 19 || month == 3 && day <= 20) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/12_Pisces.png" alt="Рыбы" />
                `;
                refs.zodiacName.innerHTML = "Рыбы";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 3 && day >= 21 || month == 4 && day <= 19) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/1_aries.png" alt="Овен" />
                `;
                refs.zodiacName.innerHTML = "Овен";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/2_Taurus.png" alt="Телец" />
                `;
                refs.zodiacName.innerHTML = "Телец";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 5 && day >= 21 || month == 6 && day <= 21) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/3_Gemini.png" alt="Близнецы" />
                `;
                refs.zodiacName.innerHTML = "Близнецы";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 6 && day >= 22 || month == 7 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/4_Rak.png" alt="Рак" />
                `;
                refs.zodiacName.innerHTML = "Рак";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/5_Leo.png" alt="Лев" />
                `;
                refs.zodiacName.innerHTML = "Лев";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/6_Virgo.png" alt="Дева" />
                `;
                refs.zodiacName.innerHTML = "Дева";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 9 && day >= 23 || month == 10 && day <= 22) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/7_Libra.png" alt="Весы" />
                `;
                refs.zodiacName.innerHTML = "Весы";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 10 && day >= 23 || month == 11 && day <= 21) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/8_Scorpio.png" alt="Скорпион" />
                `;
                refs.zodiacName.innerHTML = "Скорпион";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 11 && day >= 22 || month == 12 && day <= 21) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/9_Sagittarius.png" alt="Стрелец" />
                `;
                refs.zodiacName.innerHTML = "Стрелец";
                refs.buttonNext.classList.remove("visually-hidden");
            }
        }
        else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
            if (!Number.isNaN(year)) {
                refs.zodiacImage.innerHTML = `
                <img src="./images/10_Capricorn.png" alt="Козерог" />
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

function loadProgressPercent() {
    let res = 0;
    let timerId = null;
    if (res <= 0) {
        timerId = setInterval(() => {
            res += 1;
            refs.resultProgressPercent.innerHTML = `${res}%`;
            refs.resultProgressAnimation.style.width = `${res}%`
            if (res == 100) {
                clearInterval(timerId)
            }
        }, 31);
    }
}

function resultsAnalysisProgress() {
    function add(i) {
        let timer1 = setTimeout(() => {
            refs.resultsList[i].classList.remove("results__success-red");
            refs.resultsList[i].textContent = "Выполнено!";
            if (i == refs.resultsList.length - 1) {
                refs.resultsSuccess.classList.remove("visually-hidden");
            }
            clearTimeout(timer1)
        }, 450)
        if (i < refs.resultsList.length - 1) {
            let timer2 = setTimeout(() => {
                add(i + 1);
                clearTimeout(timer2)
            }, 460)
        }
    }
    add(0)
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
