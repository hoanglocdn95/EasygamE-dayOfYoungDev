const getEl = (element) => {
  return document.querySelector(element);
};

const chooseStyleContent = (content) => {
  let style = '"color: #21839a;"';
  if (content[0] === '*') {
    style = '"color: #ef4524;"';
  }
  if (content[0] === '"') {
    style = '"color: #065381;"';
  }
  if (content[0] === '-') {
    style = '"color: #002c3e;"';
  }
  return `<p style=${style}>${content.slice(1, content.length - 1)}</p>`;
};

const startGame = () => {
  getEl('#start').classList.add('hideOption');
  getEl('#next').classList.remove('hideOption');
  getEl('#quiz__content').innerHTML = chooseStyleContent(
    cutScene[listQuestion[0].cutScene].content[0]
  );
};

const nextAction = () => {
  const indexScene = parseInt(getEl('#quiz').getAttribute('id-scene'));
  const currentScene = parseInt(getEl('#quiz').getAttribute('current-scene'));

  if (cutScene[indexScene].content.length - 1 === currentScene) {
    getEl('#quiz').classList.add('slideQuiz');

    setTimeout(() => {
      getEl('#quiz').setAttribute('id-question', cutScene[indexScene].idQuestion);
      getEl('#quiz').setAttribute('current-scene', 0);

      getEl('#quiz__content').innerHTML =
        '<p style="color: #21839a;">' +
        listQuestion[cutScene[indexScene].idQuestion].content +
        '</p>';

      getEl('#quiz__option1').classList.remove('hideOption');
      getEl('#quiz__option2').classList.remove('hideOption');
      getEl('#next').classList.add('hideOption');
      getEl('#quiz').classList.remove('slideQuiz');
    }, 500);
  } else {
    getEl('#quiz__content').innerHTML = chooseStyleContent(
      cutScene[indexScene].content[currentScene + 1]
    );
    getEl('#quiz').setAttribute('current-scene', currentScene + 1);
  }
};

const handleOption1 = () => {
  changeQuestion(1);
};
const handleOption2 = () => {
  changeQuestion(2);
};
const changeQuestion = (optionNumber) => {
  getEl('#quiz').classList.add('hideQuiz');

  setTimeout(() => {
    const indexQuestion = parseInt(getEl('#quiz').getAttribute('id-question'));
    const nextCutScene = listQuestion[indexQuestion][`option${optionNumber}`];

    getEl('#quiz').setAttribute('id-scene', nextCutScene);
    getEl('#quiz__content').innerHTML = chooseStyleContent(cutScene[nextCutScene].content[0]);

    getEl('#quiz').classList.remove('hideQuiz');
    getEl('#quiz__option1').classList.add('hideOption');
    getEl('#quiz__option2').classList.add('hideOption');
    getEl('#next').classList.remove('hideOption');
  }, 500);
};

getEl('#start').onclick = startGame;
getEl('#next').onclick = nextAction;
getEl('#quiz__option1').onclick = handleOption1;
getEl('#quiz__option2').onclick = handleOption2;
