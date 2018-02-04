const buildItemObject = (options = {}) => {
  const title = options.title || 'New video I made up';
  const description = options.description || 'This is a video I made up durrr';
  return {title, description};
};

module.exports = {
  // parseTextFromHTML,
  buildItemObject
};