
import React from 'react';
import {Inject,ViewDirective,ViewsDirective,ScheduleComponent, Day, Week, WorkWeek,Month, Agenda} from '@syncfusion/ej2-react-schedule';
import {L10n} from '@syncfusion/ej2-base';
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import Weather from '../component/Weather';
import {connect} from 'react-redux';

/*Edit translate*/
L10n.load({
    'en-US':{
        'schedule':{
            'saveButton' : 'Add',
            'cancelButton' : 'Close',
            'deleteButton' : 'Close',
            'newEvent' : 'Add reminders',
        }
    }
});

/* End Vaildidation reminders description */
/*Template for a quickInfo */
const header = (props)=>{
 
    return(
        
        <div style={colorDrawer(props.Color)}>
 
        {props.elementType === 'cell' ?
            <div className="e-cell-header">
            <div className="e-header-icon-wrapper" >
              <button className="e-close" title="Close"></button>
            </div>
          </div> :
            <div className="e-event-header">
            <div className="e-header-icon-wrapper">
              <button className="e-close" title="CLOSE"></button>
            </div>
          </div>}
    </div>
    );
}
const content =(props)=>{
   
    return (<div>
        {props.elementType === 'cell' ?
              <div className="e-cell-content e-template custom-event-editor">
              <form className="e-schedule-form"  >

                  <div className="form-group">
                      <label> reminders title</label>
                      <input type="text" className="form-control subject e-field" name="Subject" aria-describedby="Title" placeholder="Title" minLength="1" maxLength="10" />
                  </div>
          
                  <div className="form-group">
                      <label> Location (City)</label>
                      <input className=" form-control location e-field" type="text" name="Location" placeholder="Location" />
                  </div>
                  <div className="form-group">
                      <label>Description (max 30 chars)</label>
                      <input className="form-control location e-field" type="text" name="Description" placeholder="Description..." minLength="1" maxLength="30" />
                  </div>
                  <div className="form-group">
          
                      <label>Color</label>
                      <input className="form-control location e-field" type="color" name="Color" />
                  </div>
              </form>
          </div> :
          <div className="e-event-content e-template">
              <div className="e-subject-wrap">
                  {(props.Subject !== undefined) ?
                  <div className="subject">
                      <label>
                          <h5>Title</h5></label>
                      <p> {props.Subject}</p>
                  </div> : ""} {(props.Location !== undefined) ?
                  <div className="location">
                      <label>
                          <h5>Location (city):</h5></label>
                      <p> {props.Location}</p>
                  </div> : ""} {(props.Description !== undefined) ?
                  <div className="description">
                      <label>
                          <h5>Description:</h5></label>
                      <p> {props.Description}</p>
                  </div> : ""}
          
                  <Weather city={props.Location} date={props.StartTime} />
          
              </div>
            
              <div className="e-event-footer">
                  <button className="e-event-edit" onClick={()=>getProps().change(props.Id)} title="Edit">Edit</button>
                  <button className="e-event-delete" onClick={()=>getProps().delete(props.Id)} title="Delete">Delete</button>
              </div>
          </div>}
          </div>);
}
const footer = (props) =>{
    return (<div>
        {props.elementType === 'cell' ?
              <div className="e-cell-footer">'
             
                <button className="e-event-details" title="Extra Details">Extra Details</button>
                <button className="e-event-create" onClick={()=>getProps().add(props)}  title="Add">Add</button>
              </div>
              :""}
            </div>);

}
/*End of template for a quickInfo */
/*Tempakte for editor pop up*/

const editorWindowsTemplate = (props)=>{
    return(

      <table className="custom-event-editor">

      <tbody>
          <tr>
              <td className="e-textlabel">
                  reminders title
              </td>
              <td>
                  <input id="Color" className="e-field e-input" type="text" id="Subject" name="Subject" minLength="1" maxLength="10" />
              </td>
          </tr>
          <tr>
              <td className="e-textlabel">
                  From
              </td>
              <td>
                  <DateTimePickerComponent id="StartTime" data-name="StartTime" className="e-field e-input" value={new Date(props.StartTime || props.startTime)} format="dd/MM/yy hh:mm a"></DateTimePickerComponent>
              </td>
          </tr>
          <tr>
              <td className="e-textlabel">
                  To
              </td>
              <td>
                  <DateTimePickerComponent id="EndTime" data-name="EndTime" className="e-field e-input" value={new Date(props.endTime || props.EndTime)} format="dd/MM/yy hh:mm a"></DateTimePickerComponent>
              </td>
          </tr>
          <tr>
              <td className="e-textlabel">
                  Location (City)
              </td>
              <td>
                  <input type="text" id="Location" className="e-field e-input" name="Location" />
              </td>
          </tr>
          <tr>
              <td className="e-textlabel">
                  Description (max 30 chars)
              </td>
              <td>
                  <textarea id="Description" name="Description" className="e-field e-input" type="text" minLength="1" maxLength="30" />
              </td>
          </tr>
          <tr>
              <td className="e-textlabel">
                  Color
              </td>
              <td>
                  <input id="Color" name="Color" className="e-field e-input" type="color" />
              </td>
          </tr>
      </tbody>
  </table>
    
    );

};
/*Custom color */
const colorDrawer = (color)=>{
    return(
        {
            background:color,
        }
    );

}

/** template for a reaminder caelendar view*/
const remindersTemplate =(props)=>{
    return (
    <div className="template-wrap" style={colorDrawer(props.Color)}><div>{props.Subject}</div></div>
    );
}


/*Local props*/
var localProps;
const setProps=(props)=>{
    localProps=props;
}
const getProps=()=>{
    return localProps;
}


const Calendar = (props) => {
    setProps(props);
 
    return(
        <div>      
     
        <ScheduleComponent eventSettings={{dataSource:props.reminders, template:remindersTemplate.bind(this)}} editorTemplate={editorWindowsTemplate.bind(this)} quickInfoTemplates={{ header: header.bind(this), content: content.bind(this), footer: footer.bind(this)} }   currentView='Month' >
        
         <ViewsDirective>
         <ViewDirective option='Month' />
        <ViewDirective option='Day' />
        <ViewDirective option='Week' />
        <ViewDirective option='WorkWeek' />
        <ViewDirective option='Agenda' />
         </ViewsDirective>
        <Inject services={[Month,Day,Week,WorkWeek,Agenda]} />
    </ScheduleComponent>
    </div>
    );
}

    

    

         
const mapStateToProps=state=>{
    return{
      reminders: state.management.reminders,
  
    }
  };
  
  const mapDispatchToProps = dispatch =>({
    add: (reminders) =>dispatch({type: 'add_reminder',playload:reminders}),
    delete: (id) => dispatch({type: 'delete_reminder',playload:id}),
    change: (id)=>dispatch({type: 'change_reminder',playload:id})
  });
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)