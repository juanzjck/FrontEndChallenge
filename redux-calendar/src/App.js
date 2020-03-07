import React from 'react';
import './App.css';
import Calendar from './component/Calendar';
import {createStore, combineReducers} from 'redux';
import {Provider,connect} from 'react-redux';
//ACTIONS  TYPE
const ADD_REMAINDER= 'add_remainder';
const DELETE_REMAINDER= 'delete_remainder';
const CHANGE_REMAINDER = 'change_remainder';
//Actions
const addRemainder = () =>({
  type:ADD_REMAINDER
});
const deleteRemainder = () =>(
  {
    type:DELETE_REMAINDER
  }
);
  const changeRemainder = () =>(
    {
      type:CHANGE_REMAINDER
    }
    );
//REDUCER
const managementReducer = (state = {remainders:[{Id:1,Subject: 'Ejemplo 1', StartTime: new Date(2020,3,3,2,2),EndTime: new Date(2020,3,3,2,30), Location: 'Yoga center', color:'#fff'}]}, action, newRemainder) =>{
  switch(action.type){
      case ADD_REMAINDER:
       
        return{
            ...state,
            remainders:state.remainders.push(newRemainder)
            
          }

      break;
      case DELETE_REMAINDER:

      break;
      case CHANGE_REMAINDER:

      break;

  }
  return state;
};
//Root reducer
const rootReducer= combineReducers({
  management:managementReducer,
});

//store
const store= createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//mapStateToProps
const mapStateToProps=state=>{
  return{
    remainders: state.management.remainders,
  }
};
const ConnectedCalendar=connect(mapStateToProps)(Calendar);
const App=()=> (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
        <ConnectedCalendar/>
        </Provider>
          
      </header>
    </div>
);
 


export default App;