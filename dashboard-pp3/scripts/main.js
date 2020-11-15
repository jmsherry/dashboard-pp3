// to check if moment is showing in console
// console.log(moment);

// we won't need to listen to event because the page is "defer"

// in the page we're looking for date and time
//Clock
// Date
const dateDisplay = document.getElementById('date-display');
const date = moment();
const dateDisplayString = date.format('ddd, MMMM Do YYYY');

dateDisplay.innerHTML = dateDisplayString;

//Time
const timeDisplay = document.getElementById('time-display');
const timeDisplayString = date.format('h:mm:ss a');
timeDisplay.innerHTML = timeDisplayString;

function tick() {
  const timeDisplayString = moment().format('h:mm:ss a');
  timeDisplay.innerHTML = timeDisplayString;
}
setInterval(tick, 1000);

//News
const NEWS_API_KEY = 'f88ad8ad131da19f5a4cf426693b8ed4';
// const NEWS_SOURCE = '';
const NEWS_API_URL = `https://gnews.io/api/v4/search?q=example&token=${NEWS_API_KEY}`;

const newsMount = document.getElementById('news-mount');

function renderNews(articles = [], mount = newsMount) {
  if (!articles.length) {
    newsMount.innerHTML = 'No news articles';
    return;
  }

  newsMount.innerHTML = '';
  const ul = document.createElement('ul');
  ul.classList.add('collection');

  for (const article of articles) {
    const li = document.createElement('li');
    li.classList.add('collection-item', 'avatar');

    li.innerHTML = `
      <img src="${article.urlToImage}" alt="" class="circle">
      <a href="${article.url}"><span class="title">${article.title}</span></a>
    `;

    ul.append(li);
  }

  newsMount.innerHTML = '';
  newsMount.append(ul);
}

async function getNews(handler = renderNews) {
  try {
    const response = await fetch(NEWS_API_URL);
    console.log('response', response);

    // handle bad responses
    if (!response.status >= 200 && response.status < 300) throw response;
    const articles = await response.json();
    console.log('articles', articles);
    handler(articles);
  } catch (err) {
    console.log(err);
  }
}
getNews(renderNews);

//Weather

const WEATHER_API_KEY = '781639e374834305bd6140649201511';
// const WEATHER_SOURCE = '';
const WEATHER_API_URL = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=London`;

const weatherMount = document.getElementById('weather-mount');

function renderWeather(report = [], mount = weatherMount) {
  if (!report.length) {
    weatherMount.innerHTML = 'No weather';
    return;
  }

  weatherMount.innerHTML = '';
  const ul = document.createElement('ul');
  ul.classList.add('collection');

  for (const repo of report) {
    const li = document.createElement('li');
    li.classList.add('collection-item', 'avatar');

    li.innerHTML = `
      <img src="${repo.urlToImage}" alt="" class="circle">
      <a href="${repo.url}"><span class="title">${repo.title}</span></a>
    `;

    ul.append(li);
  }

  weatherMount.innerHTML = '';
  weatherMount.append(ul);
}

async function getWeather(handler = renderWeather) {
  try {
    const response = await fetch(WEATHER_API_URL);
    console.log('response', response);

    // handle bad responses
    if (!response.status >= 200 && response.status < 300) throw response;
    const report = await response.json();
    console.log('report', report);
    handler(report);
  } catch (err) {
    console.log(err);
  }
}
getWeather(renderWeather);
