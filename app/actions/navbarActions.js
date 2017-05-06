/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

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
