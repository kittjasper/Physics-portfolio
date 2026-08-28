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

document.querySelectorAll('[data-window-action]').forEach((control) => {
  control.addEventListener('click', () => {
    const action = control.dataset.windowAction;

    if (action === 'minimize') {
      profileWindow.classList.toggle('is-minimized');
      control.setAttribute('aria-label', profileWindow.classList.contains('is-minimized') ? 'Restore profile snapshot' : 'Minimize profile snapshot');
      return;
    }

    profileWindow.classList.add('is-hidden');
    profileReopen.classList.add('is-visible');
  });
});

profileReopen.addEventListener('click', () => {
  profileWindow.classList.remove('is-hidden', 'is-minimized');
  profileReopen.classList.remove('is-visible');
});