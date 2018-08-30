function initSortable(): void {
  document.addEventListener('DOMContentLoaded', () => {
    sortable('.sortable', {
      acceptFrom: '.sortable',
      forcePlaceholderSize: true,
      placeholderClass: 'sortable-placeholder'
    });
  });
}