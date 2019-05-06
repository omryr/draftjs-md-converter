function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }
  return 'error';
}

function buildEmbeddedUrl(string) {
  const userUrl = string.match(
    /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/
  )[0];
  const id = getId(userUrl);
  return `https://www.youtube.com/embed/${id}`;
}

module.exports = {
  buildEmbeddedUrl,
  getId
};
