const root = document.getElementById('root');
const modifyItem = document.getElementById('modifyItem');
const tweetItems = document.getElementById('tweetItems');


function start() {
    hideBlock(document.querySelector('#alertMessage'));
    hideBlock(document.querySelector('#modifyItem'));
    document.querySelector('.addTweet').addEventListener('click', displaySectionAddTweet);
    document.querySelector('#saveModifiedItem').addEventListener('click', displaySectionSimpleTweeter);
    document.querySelector('#saveModifiedItem').addEventListener('click', addTweet);
    document.querySelector('#cancelModification').addEventListener('click', displaySectionSimpleTweeter);
}

start();

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addTweet() {
    const input = document.querySelector('#modifyItemInput').value;
    document.querySelector('#modifyItemInput').value = '';
    const tweets = localStorage.getItem('tweets');
    let arrTweets = [];
    const tweet = {
        text: input,
        id: generateId(),
        isLiked: false
    }
    console.log('tweets:', tweets);
    if (tweets) {
        arrTweets = JSON.parse(tweets);
        arrTweets.push(tweet);
    } else {
        arrTweets.push(tweet);
    }
    localStorage.setItem('tweets', JSON.stringify(arrTweets));
    renderTweet();
}


function renderTweet(arrTweet = getTweetsFromLocalStorage(), parent = document.querySelector('#tweetItems')) {
    deleteTweets();

    for (let i = 0; i < arrTweet.length; i++) {
        const tweetDiv = document.createElement('div');
        tweetDiv.classList.add(`tweet`);
        tweetDiv.id = arrTweet[i].id;

        parent.appendChild(tweetDiv);
        tweetDiv.appendChild(createTweet(arrTweet[i].text));
        tweetDiv.appendChild(createBtnLike());
        tweetDiv.appendChild(createTweetBtnRemove(arrTweet[i].id));
    }
}

function createTweet(text) {
    let tweet = document.createElement('div');
    tweet.textContent = text;
    return tweet;
}

function deleteTweets() {
    if (document.querySelectorAll('.tweet')) {
        document.querySelectorAll('.tweet').forEach(el => el.remove());
    }

}

function deleteH1() {
    if (document.querySelector('#addTweetH1')) {
        document.querySelector('#addTweetH1').remove();
    }
    if (document.querySelector('#divLikedSection')) {
        document.querySelector('#divLikedSection').remove();

    }
    if (document.querySelector('#divLikedSection')) {
        document.querySelector('#divLikedSection').remove();

    }
}

function createBtnLike() {
    const likeBtn = document.createElement('button');
    likeBtn.classList.add('likeBtn');
    let text = '';
    getTweetsFromLocalStorage().map(el => {
        if (el.isLiked === false) {
            text = 'like';
            return text
        } else {
            text = 'unlike';
            return text
        }
    });
    likeBtn.textContent = text;
    likeBtn.addEventListener('click', onClickLike);
    likeBtn.addEventListener('click', createGoToLikedBtn);

    return likeBtn;
}

function createTweetBtnRemove() {
    const removeTweetBtn = document.createElement('button');
    removeTweetBtn.classList.add('removeBtn');
    removeTweetBtn.textContent = 'remove';
    removeTweetBtn.addEventListener('click', removeTweet);
    return removeTweetBtn;
}

function onClickLike(event) {
    const id = event.target.parentElement.id;
    let arrTweets = getTweetsFromLocalStorage().map(el => {
        if (el.id === id) {
            event.target.textContent = !el.isLiked ? 'unlike' : 'like';
            el.isLiked = !el.isLiked;
            return el;
        }
        return el;
    });
    setTweetsToLocalStorage(arrTweets);
}


function removeTweet(event) {
    const id = event.target.parentElement.id;
    let arrTweets = getTweetsFromLocalStorage().filter(el => el.id !== id);
    setTweetsToLocalStorage(arrTweets);
    renderTweet();
}

function getTweetsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tweets'));
}

function setTweetsToLocalStorage(arrTweets) {
    localStorage.setItem('tweets', JSON.stringify(arrTweets));
}

function displaySectionAddTweet() {
    history.replaceState('data to be passed', 'Title of the page', '#add');
    deleteH1();
    history.pushState(null, null, '#add');
    showDiv(modifyItem);
    hideBlock(tweetItems);
    hideBlock(document.querySelector('#modifyItemHeader'));
    showDiv(document.querySelector('#modifyItemInput'));
    showDiv(document.querySelector('#cancelModification'));
    showDiv(document.querySelector('#saveModifiedItem'));
    const addTweetH1 = document.createElement('h1');
    addTweetH1.textContent = 'Add tweet';
    addTweetH1.id = 'addTweetH1';
    modifyItem.before(addTweetH1);
}

function displaySectionSimpleTweeter() {
    renderTweet();
    history.replaceState('data to be passed', 'Title of the page', '#simplTweeter');
    deleteH1();
    hideBlock(document.querySelector('#cancelModification'));
    hideBlock(document.querySelector('#saveModifiedItem'));
    hideBlock(document.querySelector('#modifyItemInput'));
    showDiv(tweetItems);

}

function hideBlock(div) {
    div.style.display = 'none';
}

function showDiv(div) {
    div.style.display = 'block';
}

function displaySectionLiked() {
    history.replaceState('data to be passed', 'Title of the page', '#liked');

    const divLikedSection = document.createElement('div');
    divLikedSection.id = 'divLikedSection';
    root.appendChild(divLikedSection);

    hideBlock(tweetItems);
    document.querySelectorAll('.tweet').forEach(el => el.remove());
    const likedH1 = document.createElement('h1');
    likedH1.textContent = 'Liked tweets';
    likedH1.id = 'likedTweetsH1';
    divLikedSection.appendChild(likedH1);
    const backBtn = document.createElement('button');
    backBtn.textContent = 'back';
    backBtn.id = 'backBtn';
    backBtn.addEventListener('click', displaySectionSimpleTweeter);
    divLikedSection.appendChild(backBtn);
    const arrTweetsLiked = getTweetsFromLocalStorage().filter(el => el.isLiked === true);
    renderTweet(arrTweetsLiked, divLikedSection);
}

function createGoToLikedBtn() {
    if (document.querySelector('#goToLikedTweetBtn')) {
        document.querySelector('#goToLikedTweetBtn').remove();
    }
    const goToLikedTweetBtn = document.createElement('button');
    goToLikedTweetBtn.id = 'goToLikedTweetBtn';
    goToLikedTweetBtn.textContent = 'Go to liked'
    goToLikedTweetBtn.addEventListener('click', displaySectionLiked);
    document.querySelector('#navigationButtons').appendChild(goToLikedTweetBtn);
}