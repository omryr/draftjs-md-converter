const vimReg = /(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
const ytReg = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;

function getEmbedProviderUrl(provider) {
  if (provider === 'youtube') return 'https://www.youtube.com/embed/';
  if (provider === 'vimeo') return 'https://player.vimeo.com/video/';
  return null;
}

function getEmbedProvider(string) {
  if (ytReg.test(string)) return 'youtube';
  // return 'https://www.youtube.com/embed/'
  if (vimReg.test(string)) return 'vimeo';
  // return 'https://player.vimeo.com/video/'
  return null;
}

function getId(url, provider) {
  const regExp = provider === 'youtube' ? ytReg : vimReg;
  console.log('provider ', provider);
  console.log('regRexp ', regExp);
  // /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }
  return 'error';
}

function buildEmbeddedUrl(string) {
  const provider = getEmbedProvider(string);
  const userUrl = string.match(ytReg)[0];

  const id = getId(userUrl, provider);
  return `${getEmbedProviderUrl(provider)}/${id}`;
}

function testEmbed(string) {
  const reg = ytReg;
  return reg.test(string);
}

module.exports = {
  buildEmbeddedUrl,
  getId,
  testEmbed
};
