const init = () => {
  const questionCard = document.querySelector(".question-card");
  const quizz = JSON.parse(sessionStorage.getItem("quizz"));
  questionCard.innerHTML = createQuestionHTML(quizz, 0);

  let i = 1;
  questionCard.addEventListener("click", (e) => {
    const results = JSON.parse(sessionStorage.getItem("results"));
    if (e.target.classList.contains("btn-answer")) {
      const question = quizz[i - 1].question;
      const answer = e.target.getAttribute("data-answer");
      if (!results) {
        sessionStorage.setItem(
          "results",
          JSON.stringify([{ question, answer }])
        );
      } else {
        results.push({ question, answer });
        sessionStorage.setItem("results", JSON.stringify(results));
      }
      questionCard.innerHTML = createQuestionHTML(quizz, i++);
    }
  });
};

const createQuestionHTML = (quizz, i) => {
  if (!quizz) return "<h2 style='text-align: center'>No quizz yet!</h2>";
  if (i > quizz.length - 1) return result();
  const html = `
              <div class="quizz-info">
              <p class="number-of-questions">
                Question <span id="current-question">${i + 1}</span> of
                <span id="total-questions">${quizz.length}</span>
              </p>
            </div>
            <h1 class="question">
            ${quizz[i].question}
            </h1>
            <div class="answers">
              <button data-answer="${
                quizz[i].choiceA
              }" class="btn btn-answer">${quizz[i].choiceA}</button>
              <button data-answer="${
                quizz[i].choiceB
              }" class="btn btn-answer">${quizz[i].choiceB}</button>
              <button data-answer="${quizz[i].choiceC}" class="btn btn-answer">
                ${quizz[i].choiceC}
              </button>
            </div>
  `;
  return html;
};

const result = () => {
  let correct = 0;
  let incorrect = 0;
  const quizz = JSON.parse(sessionStorage.getItem("quizz"));
  const results = JSON.parse(sessionStorage.getItem("results"));
  sessionStorage.removeItem("results");

  quizz.forEach((q, i) => {
    if (q.answer === results[i].answer) {
      correct += 1;
    } else {
      incorrect += 1;
    }
  });
  const verdict = correct > incorrect ? "YOU PASSED!" : "YOU FAILED!";
  return `<div class="results">
          <h1 class="header">Quizz Results</h1>
          <div class="result-tally">
            <h2 class="correct">Correct: ${correct}</h2>
            <h2 class="incorrect">Incorrect: ${incorrect}</h2>
          </div>
          <div class="score">
            <h1 class="verdict">${verdict}</h1>
          </div>
          <button class="btn again" onclick="location.reload()">Try Again</button>
        </div>`;
};

//**Run */
init();
