const Product = {
  features: [{
    iconClass: 'fa fa-star-o',
    name: 'store',
    title: 'Keep interesting websites<br/>in one place.',
    description: 'Add and save interesting websites.<br/>Import/export bookmarks from browser.',
    innerFeatures: [{
      iconClass: 'fa fa-chrome',
      stateClass: 'current',
      title: 'Chrome',
      description: 'Chrome browser extention to add, import, sync bookmarks'
    }, {
      iconClass: 'fa fa-firefox',
      title: 'Firefox',
      description: 'Firefox browser extention to add, import, sync bookmarks'
    }, {
      iconClass: 'fa fa-edge',
      title: 'Edge',
      description: 'Edge browser extention to add, import, sync bookmarks'
    }, {
      iconClass: 'fa fa-safari',
      title: 'Safari',
      description: 'Safari browser extention to add, import, sync bookmarks'
    }],
  }, {
    iconClass: 'fa fa-random',
    name: 'organize',
    title: 'Organize your bookmarks',
    description: 'Create collections, set categories and tags for bookmark to make search easier',
    innerFeatures: [{
      iconClass: 'fa fa-sitemap',
      stateClass: 'current',
      title: 'Collections',
      description: ''
    }, {
      iconClass: 'fa fa-tags',
      title: 'Tags',
      description: ''
    }, {
      iconClass: 'fa fa-search',
      title: 'Power search',
      description: ''
    }],
  }],
};

export { Product as default };