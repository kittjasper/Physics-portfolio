const editButton = document.querySelector('#editButton');
const heroEditButton = document.querySelector('#heroEditButton');
const saveStatus = document.querySelector('#saveStatus');
const photoInput = document.querySelector('#photoInput');
const profilePhoto = document.querySelector('#profilePhoto');
const profileAvatar = document.querySelector('#profileAvatar');
const editableElements = document.querySelectorAll('.editable');
const storedData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
let editing = false;

const savedPhoto = localStorage.getItem('portfolioPhoto');
if (savedPhoto) {
  profilePhoto.src = savedPhoto;
  profileAvatar.classList.add('has-photo');
}

const legacyContent = {
  futureRole: ['Environmental engineer', 'Engineer'],
  stemField: ['Environmental science', 'Engineering'],
  stemTitle: ['Environmental science', 'Engineering'],
  stemDetails: ['I want to understand natural systems and design practical ways to care for them.', 'I want to understand how systems work and design practical solutions to real-world problems.'],
  researchTitle: ['How can we make our communities more sustainable?', 'How can engineering make our communities more sustainable?'],
  researchDetails: ['Write about the research question you chose, why it matters to you, and what you hope to discover. This is your space to let the work speak.', 'Write about the engineering question you chose, why it matters to you, and what you hope to discover. This is your space to let the work speak.']
};

Object.entries(legacyContent).forEach(([key, [oldValue, newValue]]) => {
  if (storedData[key] === oldValue) storedData[key] = newValue;
});

editableElements.forEach((element) => {
  const key = element.dataset.key;
  if (storedData[key]) element.textContent = storedData[key];
});

function updateProjectLinks() {
  document.querySelectorAll('.project-link').forEach((link) => {
    const urlElement = link.querySelector(`[data-key="${link.dataset.urlKey}"]`);
    const value = urlElement.textContent.trim();
    link.href = /^https?:\/\//i.test(value) ? value : '#';
  });
}

updateProjectLinks();

document.querySelector('#year').textContent = new Date().getFullYear();

function setStatus(message) {
  saveStatus.textContent = message;
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(() => { saveStatus.textContent = 'Changes saved locally'; }, 2200);
}

function saveChanges() {
  const data = {};
  editableElements.forEach((element) => { data[element.dataset.key] = element.textContent.trim(); });
  localStorage.setItem('portfolioData', JSON.stringify(data));
  setStatus('Changes saved locally');
}

function toggleEditing() {
  editing = !editing;
  document.body.classList.toggle('editing', editing);
  editButton.classList.toggle('active', editing);
  editButton.innerHTML = editing ? '<span class="edit-icon">✓</span> Save changes' : '<span class="edit-icon">✎</span> Edit portfolio';
  editableElements.forEach((element) => {
    element.contentEditable = editing;
    element.setAttribute('aria-label', `Edit ${element.dataset.key}`);
  });
  if (!editing) saveChanges();
}

editButton.addEventListener('click', toggleEditing);
heroEditButton.addEventListener('click', toggleEditing);
photoInput.addEventListener('change', () => {
  const [file] = photoInput.files;
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    profilePhoto.src = reader.result;
    profileAvatar.classList.add('has-photo');
    localStorage.setItem('portfolioPhoto', reader.result);
    setStatus('Photo saved locally');
  });
  reader.readAsDataURL(file);
});
editableElements.forEach((element) => {
  element.addEventListener('input', () => { updateProjectLinks(); if (editing) setStatus('Unsaved changes'); });
});