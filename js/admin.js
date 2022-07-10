const init = () => {
  const form = document.getElementById("create-form");
  const clear = document.getElementById("clear");
  clear.onclick = () => sessionStorage.removeItem("quizz");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const question = document.getElementById("question");
    const choiceA = document.getElementById("choice-a");
    const choiceB = document.getElementById("choice-b");
    const choiceC = document.getElementById("choice-c");
    const answer = document.getElementById("correct");

    if (
      question.value.trim().length < 1 ||
      choiceA.value.trim().length < 1 ||
      choiceB.value.trim().length < 1 ||
      choiceC.value.trim().length < 1 ||
      answer.value === "null"
    ) {
      document.querySelector(".error").classList.remove("hidden");
      document.querySelector(".error-message").textContent =
        "All fields are required";
    } else {
      document.querySelector(".error").classList.add("hidden");
      let correctAnswer;
      if (answer.value === "A") {
        correctAnswer = choiceA.value;
      } else if (answer.value === "B") {
        correctAnswer = choiceB.value;
      } else {
        correctAnswer = choiceC.value;
      }
      const quizz = {
        question: question.value,
        choiceA: choiceA.value,
        choiceB: choiceB.value,
        choiceC: choiceC.value,
        answer: correctAnswer,
        seconds: 5,
      };
      saveToStorage(quizz);
      clearFields([question, choiceA, choiceB, choiceC, answer]);
    }
  });
};

const saveToStorage = (data) => {
  const quizz = JSON.parse(sessionStorage.getItem("quizz"));
  if (!quizz) {
    sessionStorage.setItem("quizz", JSON.stringify([data]));
  } else {
    quizz.push(data);
    sessionStorage.setItem("quizz", JSON.stringify(quizz));
  }
};

const clearFields = (fields) => {
  fields.forEach((field) => {
    if (field.id === "correct") {
      field.value = "null";
    } else {
      field.value = "";
    }
  });
};

init();
