import React, { useRef } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

function App(props) {

  console.log(props)
  const newform = useRef();
  const deleteContact  = (e, index) => { props.deleteContact(index) }
  const handleSubmit   = (e) =>{ e.preventDefault();
  const data = newform.current   
    let contact = { name: data['name'].value  }
    data['name'].value = '';
    props.createContact(contact);
  }


  const listView = (data, index) => {
    return (
      <div className="row">
        <div className="col-md-10">
          <li key={index} className="list-group-item clearfix">
            {data.name}
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => deleteContact(e, index)} className="btn btn-danger">Remove</button>
        </div>
    </div> 
    )
  }

    return (
     <div>
        <h1>Clientside Contacts Application</h1>
        <hr />
        <div>
          <h3>Add Contact Form</h3>
          <form onSubmit={handleSubmit}  ref={newform}>
            <input type="text"   name={'name'} id="name" placeholder="Contact Name"  />
            <input type="submit" />
          </form>
        </div>


         { <ul className="list-group">
           {props.contacts.map((contact, i) => listView(contact, i))}
           </ul> }
      </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);