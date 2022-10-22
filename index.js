//get hold of all the elements in html
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// define global api quotes
let apiQuotes = [];

//function to get random quotes from api
function newQuotes(){
    showLoader();
    let newQuotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //check if author name is empty if yes replace it with anonymous
    authorText.textContent = (!newQuotes.author) ? 'Anonymous' : newQuotes.author;

    //check if length of quote text is more than long quote text css class
    (newQuotes.text.length > 100) ? quoteText.classList.add('long-quote-text') : quoteText.classList.remove('long-quote-text');

    //display the quotes
    quoteText.textContent = newQuotes.text;
    hideLoader();
}

async function getApiQuotes(){
    // const apiUrl = 'https://zenquotes.io/api/quotes/';
    showLoader();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const apiResponse = await fetch(apiUrl);
        apiQuotes = await apiResponse.json();
        newQuotes();
    }catch(error){
        console.log(error);
    }
}

//tweet quote on your twitter account
function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - author=${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

//new quote button functionality
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuotes);

function showLoader(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//calling fcn on page load
getApiQuotes();
