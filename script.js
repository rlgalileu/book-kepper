const modal = document.getElementById('modal-container');
const modalShowBtn = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const boodmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('bookmarks-container');

// Show Modal
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
  console.log(modal)
  console.log(showModal)
}

// Modal Event Listeners
modalShowBtn.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false);
