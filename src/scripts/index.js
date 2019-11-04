import createOriginalUrl from './createOriginalUrl';
import styles from '../styles/style.scss';

const main = () => {
  const bodyElement = document.getElementsByTagName("BODY")[0];

  const header = document.createElement('header');
  const headerH1 = document.createElement('h1');
  headerH1.textContent = "Welcome to Han's URL shortener";
  header.appendChild(headerH1);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add(`${styles.inputPanel}`);

  const titleElement = document.createElement('div');
  titleElement.textContent = 'Orignal Url: ';

  const userInput = document.createElement('input');
  userInput.classList.add(`${styles.input}`);
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('id', 'originalUrl');

  const submitButton = document.createElement('input');
  submitButton.classList.add(`${styles.button}`);
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('id', 'submitButton');
  submitButton.addEventListener('click', createOriginalUrl);

  contentWrapper.appendChild(titleElement);
  contentWrapper.appendChild(userInput);
  contentWrapper.appendChild(submitButton);

  bodyElement.appendChild(header);
  bodyElement.appendChild(contentWrapper);
};

main();
// document.querySelector('#submitButton').addEventListener('click', createOriginalUrl);
