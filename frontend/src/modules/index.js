import { combineReducers } from 'redux'
import counter from './counter'
import theme from './theme'
import global from './global'
// import countryReducers from '../containers/countries/reducers/countries';
// import addCourse from '../containers/course/reducers/courseReducers';
// import branchReducers from '../containers/branch/reducers/branchReducers';
// import universityReducers from '../containers/university/reducers/university';
// import stateReducers from '../containers/state/reducers/state';
// import cityReducers from '../containers/city/reducers/city';
// import campusReducers from '../containers/campus/reducers/campus';
import productReducers from '../containers/product/reducers/productreducer';



import { connectRouter } from 'connected-react-router'
import { createBrowserHistory as createHistory } from 'history'
export const history = createHistory()

export default combineReducers({
  counter,
  theme,
  global,
  // countryReducers,
  // universityReducers,
  // stateReducers,
  // cityReducers,
  // addCourse,
  // branchReducers,
  // campusReducers,
  productReducers,
  router: connectRouter(history)

})
