export const updateNavbarTitle = (title) => {
  return {
    type: 'SET_NAVBAR_TITLE',
    title
  }
};

export const updateNavbarBacklink = (backlink) => {
  return {
    type: 'SET_NAVBAR_BACKLINK',
    backlink
  }
};

export const updateNavbar = (title, backlink) => {
  return {
    type: 'SET_NAVBAR',
    title,
    backlink
  }
};
