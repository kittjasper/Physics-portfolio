function updateProjectLinks() {
  document.querySelectorAll('.project-link').forEach((link) => {
    const urlElement = link.querySelector(`[data-key="${link.dataset.urlKey}"]`);
    const value = urlElement.textContent.trim();
    link.href = /^https?:\/\//i.test(value) ? value : '#';
  });
}

function updateProjectOverviews() {
  const knownOverviews = {
    'physics-group-task-1-or-something-': 'A digital physics portfolio documenting the measurement and density experiment.'
  };

  document.querySelectorAll('.project-card').forEach((card) => {
    const link = card.querySelector('.project-link');
    const details = card.querySelector('[data-key^="projectDetails"]');
    const urlElement = link && card.querySelector(`[data-key="${link.dataset.urlKey}"]`);

    if (!link || !details || !urlElement || details.textContent.trim() || !/^https?:\/\//i.test(urlElement.textContent.trim())) {
      return;
    }

    const url = new URL(urlElement.textContent.trim());
    const projectKey = url.pathname.split('/').filter(Boolean).pop().toLowerCase();
    details.textContent = knownOverviews[projectKey] || `A digital project published on ${url.hostname}.`;
    details.dataset.generated = 'true';
  });
}

updateProjectLinks();
updateProjectOverviews();

document.querySelector('#year').textContent = new Date().getFullYear();

const profileWindow = document.querySelector('.hero-card');
const profileReopen = document.querySelector('.profile-reopen');
const profileEnlarge = document.querySelector('[data-window-action="enlarge"]');

document.querySelectorAll('[data-window-action]').forEach((control) => {
  control.addEventListener('click', () => {
    const action = control.dataset.windowAction;

    if (action === 'minimize') {
      profileWindow.classList.add('is-minimized');
      return;
    }

    if (action === 'enlarge') {
      profileWindow.classList.remove('is-minimized');
      return;
    }

    profileWindow.classList.add('is-closing');
    window.setTimeout(() => {
      profileWindow.classList.remove('is-closing');
      profileWindow.classList.add('is-hidden');
      profileReopen.classList.add('is-visible');
    }, 320);
  });
});

profileWindow.addEventListener('click', (event) => {
  if (profileWindow.classList.contains('is-minimized') && !event.target.closest('button')) {
    profileWindow.classList.remove('is-minimized');
  }
});

profileReopen.addEventListener('click', () => {
  profileWindow.classList.remove('is-hidden', 'is-minimized', 'is-enlarged');
  profileReopen.classList.remove('is-visible');
});