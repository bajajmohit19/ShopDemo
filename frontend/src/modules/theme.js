const initialState = {
  collapsed: true,
  navTheme: 'dark', // theme for nav menu
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false // sticky siderbar
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'TOGGLE_SIDEBAR_COLLAPSED':
      return {
        ...state,
        // collapsed: true
        collapsed: !state.collapsed
      }

    default:
      return state
  }
}
