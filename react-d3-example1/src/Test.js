import React from 'react';

export default function Test(props){
  return <div onClick={props.personClicked}>Hello {props.person}</div>
}