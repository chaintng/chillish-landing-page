document.addEventListener('DOMContentLoaded', () => {
  const loadFragment = (id, file) => {
    fetch(file)
      .then(res => res.text())
      .then(html => {
        const container = document.getElementById(id);
        if (container) {
          container.innerHTML = html;
        }
      });
  };

  loadFragment('header', 'header.html');
  loadFragment('footer', 'footer.html');
});
