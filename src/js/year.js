document.addEventListener('DOMContentLoaded', function () {
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
  }
});
