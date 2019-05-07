const vimReg = /(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
const ytReg = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;

function getEmbedProviderUrl(provider) {
  if (provider === 'youtube') return 'https://www.youtube.com/embed/';
  if (provider === 'vimeo') return 'https://player.vimeo.com/video/';
  return null;
}

function getEmbedProvider(string) {
  if (ytReg.test(string)) return 'youtube';
  if (vimReg.test(string)) return 'vimeo';
  return null;
}

function getId(url, provider) {
  const regExp = provider === 'youtube' ? ytReg : vimReg;
  const match = url.match(regExp);

  if (provider === 'youtube') {
    if (match && match[1].length === 11) {
      return match[1];
    }
  }
  if (provider === 'vimeo') {
    if (match && match[4]) {
      return match[4];
    }
  }
  return 'error';
}

function buildEmbeddedUrl(string) {
  const provider = getEmbedProvider(string);
  const regExp = provider === 'youtube' ? ytReg : vimReg;
  const userUrl = string.match(regExp)[0];

  const id = getId(userUrl, provider);
  return `${getEmbedProviderUrl(provider)}${id}`;
}

function testEmbed(string) {
  const provider = getEmbedProvider(string);
  const regExp = provider === 'youtube' ? ytReg : vimReg;

  return regExp.test(string);
}

module.exports = {
  buildEmbeddedUrl,
  getId,
  testEmbed
};
