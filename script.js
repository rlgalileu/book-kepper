const modal = document.getElementById('modal-container');
const modalShowBtn = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const boodmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];
let nameValue = websiteNameEl.value;
let urlValue = websiteUrlEl.value;

// Show Modal
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Build Bookmarks DOM
function buildBookmarks() {
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onClick', `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to Bookmarks Container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch Bookmarks
function fetchBookmarks() {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    bookmarks = [{
        name: 'Quote Generator',
        url: 'https://galileu-quote-generator.netlify.app/',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  buildBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  nameValue = websiteNameEl.value;
  urlValue = websiteUrlEl.value;

  if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
    urlValue = `https://${urlValue}`;
  }

  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  boodmarkForm.reset();
  websiteNameEl.focus();
}

// Validate Form
function validate(nameValue, urlValue) {
  const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.')
    return false;
  }

  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  return true;
}

// Modal Event Listeners
modalShowBtn.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false);

// Event Listener
boodmarkForm.addEventListener('submit', storeBookmark);

// On Load
fetchBookmarks();
