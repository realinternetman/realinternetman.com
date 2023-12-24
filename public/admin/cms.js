CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    console.log(entry.get('collection'));
    switch (entry.get('collection')) {
      case 'posts':
        const post = entry.get('data');
        const slug = post.get('slug');
        if (slug === '') {
          const defaultSlug = generateDefaultSlug(post.get('date'));
          const slugInput = document.querySelector('input[id^="slug-field-"]');
          slugInput.value = defaultSlug;
          return post.set('slug', defaultSlug);
        }
        return;
      default:
        return;
    }
  },
});

function generateDefaultSlug(dateValue) {
  const date = new Date(dateValue);
  const ymd = new Intl.DateTimeFormat('ja-jp', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\//g, '-');
  const his = new Intl.DateTimeFormat('ja-jp', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
    .format(date)
    .replace(/:/g, '');
  const defaultSlug = `${ymd}_${his}`;
  return defaultSlug;
}
