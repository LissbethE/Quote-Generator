'use strict';

const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const containerButton = document.querySelector('.quote-container__button');
let twitter = document.querySelector('.button-twitter');
const loader = document.querySelector('.loader');

const ShowLoadingSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const renderQuotes = function (data) {
  removeLoadingSpinner();

  const dataAuthor = !data.author ? 'Unknown' : data.author;

  quote.textContent = data.text;
  author.textContent = dataAuthor;

  document.querySelectorAll('span').forEach(sp => (sp.style.opacity = 1));
};

// Get Quotes From API
let dataApiQuotes = [];
const quotesApi = async function (n) {
  try {
    ShowLoadingSpinner();

    const response = await fetch(`https://type.fit/api/quotes`);
    if (!response.ok) throw new Error('💥💥💥');
    dataApiQuotes = await response.json();

    renderQuotes(dataApiQuotes[n]);
  } catch (err) {
    console.log(`Algo salió mal 😵‍💫💥! ${err.message}`);
  }
};
quotesApi(14);

containerButton.addEventListener('click', function (e) {
  const clicked = e.target.closest('.btn');

  if (!clicked) return;

  if (clicked.classList.contains('new-quote')) {
    // loading();

    // Pick a random quote from apiQuotes array
    const quote = Math.floor(Math.random() * dataApiQuotes.length);
    quotesApi(quote);
  } else if (clicked.classList.contains('button-twitter')) {
    twitter = `https://twitter.com/intent/tweet?text=${quote.textContent}-${author.textContent}`;
    window.open(twitter, '_blank');
  }
});
