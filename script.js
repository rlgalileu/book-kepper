const modal = document.getElementById('modal-container');
const modalShowBtn = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const boodmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

const nameValue = websiteNameEl.value;
let urlValue = websiteUrlEl.value;

// Show Modal
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();

  if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
    urlValue = `https://${urlValue}`;
  }

  if (!validate(nameValue, urlValue)) {
    return false;
  }
}

// Validate Form
function validate(formValue, urlValue) {
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
