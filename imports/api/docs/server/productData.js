const Product = {
  features: [{
    name: 'keep',
    title: 'Keep interesting websites<br/>in one place.',
    description: 'Add and save interesting websites.<br/>Import/export bookmarks from browser.',
    iconClass: 'fa fa-star-o',
    cssClass: 'keep',
    innerFeatures: [{
      title: 'Chrome extention',
      description: 'Chrome browser extention to add, import, sync bookmarks.',
      iconClass: 'fa fa-chrome',
      stateClass: 'current',
    }, {
      title: 'Firefox extention',
      description: 'Firefox browser extention to add, import, sync bookmarks',
      iconClass: 'fa fa-firefox',
    }, {
      title: 'Edge extention',
      description: 'Edge browser extention to add, import, sync bookmarks',
      iconClass: 'fa fa-edge',
    }, {
      title: 'Safari extention',
      description: 'Safari browser extention to add, import, sync bookmarks',
      iconClass: 'fa fa-safari',
    }],
  }, {
    name: 'organize',
    title: 'Organize<br/> your bookmarks',
    description: 'Create collections, use categories, tags, colors to make search easier',
    iconClass: 'fa fa-random',
    cssClass: 'organize',
    innerFeatures: [{
      iconClass: 'fa fa-sitemap',
      title: 'Collections',
      description: ''
    }, {
      iconClass: 'fa fa-tags',
      title: 'Tags',
      description: 'Set tags to bookmarks, filter by tags.',
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
    cssClass: 'storage',
    innerFeatures: [{
      iconClass: 'fa fa-google',
      stateClass: 'current',
      title: 'Google Drive',
      description: 'Use Google Drive as your personal storage for bookmark collections.'
    }, {
      iconClass: 'fa fa-dropbox',
      title: 'Dropbox',
      description: ''
    }, {
      iconClass: 'fa fa-windows',
      title: 'OneDrive',
      description: ''
    }, {
      iconClass: 'fa fa-database',
      title: 'Back-up tool',
      description: ''
    }, {
      iconClass: 'fa fa-exchange',
      title: 'Import and export',
      description: ''
    }],
  }, {
    name: 'share',
    title: 'Share bookmarks and collections',
    description: 'Make your bookmarks and collections public, discover other user\'s collections',
    iconClass: 'fa fa-share-alt',
    cssClass: 'share',
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
      title: 'Collection subscription',
      description: ''
    }, {
      iconClass: 'fa fa-comments',
      title: 'Comments',
      description: ''
    }, {
      iconClass: 'fa fa-star',
      title: 'Voting',
      description: ''
    }],
  }],
};

export { Product as default };
