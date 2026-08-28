function updateProjectLinks() {
  document.querySelectorAll('.project-link').forEach((link) => {
    const urlElement = link.querySelector(`[data-key="${link.dataset.urlKey}"]`);
    const value = urlElement.textContent.trim();
    link.href = /^https?:\/\//i.test(value) ? value : '#';
  });
}

updateProjectLinks();

document.querySelector('#year').textContent = new Date().getFullYear();

const profileWindow = document.querySelector('.hero-card');
const profileReopen = document.querySelector('.profile-reopen');
const profileMinimize = document.querySelector('[data-window-action="minimize"]');

document.querySelectorAll('[data-window-action]').forEach((control) => {
  control.addEventListener('click', () => {
    const action = control.dataset.windowAction;

    if (action === 'minimize') {
      profileWindow.classList.toggle('is-enlarged');
      control.setAttribute('aria-label', profileWindow.classList.contains('is-enlarged') ? 'Restore profile snapshot size' : 'Enlarge profile snapshot');
      control.setAttribute('title', profileWindow.classList.contains('is-enlarged') ? 'Restore size' : 'Enlarge');
      return;
    }

    if (action === 'hide') {
      profileWindow.classList.add('is-minimized');
      profileMinimize.disabled = true;
      profileMinimize.setAttribute('aria-disabled', 'true');
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
    profileMinimize.disabled = false;
    profileMinimize.setAttribute('aria-disabled', 'false');
  }
});

profileReopen.addEventListener('click', () => {
  profileWindow.classList.remove('is-hidden', 'is-minimized', 'is-enlarged');
  profileMinimize.disabled = false;
  profileMinimize.setAttribute('aria-disabled', 'false');
  profileReopen.classList.remove('is-visible');
});