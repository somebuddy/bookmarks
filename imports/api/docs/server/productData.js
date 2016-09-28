const Product = {
  features: [{
    name: 'store',
    title: 'Keep interesting websites<br/>in one place.',
    description: 'Add and save interesting websites.<br/>Import/export bookmarks from browser.',
    iconClass: 'fa fa-star-o',
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
    name: 'organize',
    title: 'Organize<br/> your bookmarks',
    description: 'Create collections, use categories, tags, colors to make search easier',
    iconClass: 'fa fa-random',
    innerFeatures: [{
      iconClass: 'fa fa-sitemap',
      title: 'Collections',
      description: ''
    }, {
      iconClass: 'fa fa-tags',
      title: 'Tags',
      description: '',
      stateClass: 'current',
    }, {
      iconClass: 'fa fa-search',
      title: 'Power search',
      description: ''
    }],
  }, {
    name: 'personal-storage',
    title: 'Personal storage',
    description: 'Use Google Drive, Dropbox, OneDrive to store, backup your bookmark collections and never lose them',
    iconClass: 'fa fa-hdd-o',
    innerFeatures: [{
      iconClass: 'fa fa-google',
      stateClass: 'current',
      title: 'Google Drive storage',
      description: ''
    }, {
      iconClass: 'fa fa-dropbox',
      title: 'Dropbox storage',
      description: ''
    }, {
      iconClass: 'fa fa-windows',
      title: 'OneDrive storage',
      description: ''
    }, {
      iconClass: 'fa fa-database',
      title: 'Back-up tool',
      description: ''
    }, {
      iconClass: 'fa fa-exchange',
      title: 'Import/export bookmarks',
      description: ''
    }],
  }, {
    name: 'share',
    title: 'Share bookmarks and collections',
    description: 'Make your bookmarks and collections public, discover other user\'s collections',
    iconClass: 'fa fa-share-alt',
    innerFeatures: [{
      iconClass: 'fa fa-bookmark',
      title: 'Public bookmarks',
      description: ''
    }, {
      iconClass: 'fa fa-sitemap',
      title: 'Public collections',
      description: ''
    }, {
      iconClass: 'fa fa-envelope',
      title: 'Subscribe public collection updates',
      description: ''
    }, {
      iconClass: 'fa fa-comments',
      title: 'Comment bookmarks',
      description: ''
    }, {
      iconClass: 'fa fa-star',
      title: 'Vote for bookmarks',
      description: ''
    }],
  }],
};

export { Product as default };