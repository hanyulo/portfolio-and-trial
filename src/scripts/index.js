import createOriginalUrl from './createOriginalUrl';
import styles from '../styles/style.scss';

const createSubmitButton = () => {
  const elem = document.createElement('input');
  elem.classList.add(`${styles.button}`);
  elem.setAttribute('type', 'submit');
  elem.setAttribute('id', 'submitButton');
  elem.addEventListener('click', createOriginalUrl);
  return elem;
};

const submitButton = createSubmitButton();
const contentWrapper = document.createElement('div');

const main = () => {
  const bodyElement = document.getElementsByTagName("BODY")[0];

  const header = document.createElement('header');
  const headerH1 = document.createElement('h1');
  headerH1.textContent = "Welcome to Han's URL shortener";
  header.appendChild(headerH1);

  contentWrapper.classList.add(`${styles.inputPanel}`);

  const titleElement = document.createElement('div');
  titleElement.textContent = 'Orignal Url: ';

  const userInput = document.createElement('input');
  userInput.classList.add(`${styles.input}`);
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('id', 'originalUrl');

  contentWrapper.appendChild(titleElement);
  contentWrapper.appendChild(userInput);
  contentWrapper.appendChild(submitButton);

  bodyElement.appendChild(header);
  bodyElement.appendChild(contentWrapper);
};

main();

let initial = true;
let lastSubmitButton = null;
if (module.hot) {
  module.hot.accept('./createOriginalUrl.js', function () {
    const newSubmitButton = createSubmitButton();
    if (initial) {
      contentWrapper.removeChild(submitButton);
      contentWrapper.appendChild(newSubmitButton);
      lastSubmitButton = newSubmitButton;
      initial = false;
    } else {
      contentWrapper.removeChild(lastSubmitButton);
      contentWrapper.appendChild(newSubmitButton);
      lastSubmitButton = newSubmitButton;
    }
  });
}
