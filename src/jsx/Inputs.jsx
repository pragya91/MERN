import React from 'react';

export class NumInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {value : this.format(props.value)};
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //to change the input value into a string value
  format(num){
    return num!=null? num.toString() : '';
  }

  //to change string value to num value
  unformat(str){
    const val = parseInt(str,10);
    return isNaN(val) ? null : val;
  }

  componentWillReceiveProps(newProps){
    this.setState({value : this.format(newProps.value)})
  }

  onBlur(e){
    this.props.onChange(e,this.unformat(this.state.value));
  }

  onChange(e){
    if(e.target.value.match(/^\d*$/))
      this.setState({value : e.target.value});
  }

  render(){
    return (
      <input type='text' {...this.props} value={this.state.value} onBlur={this.onBlur} onChange={this.onChange} />
    );
  }
}

/*
export class DateInput extends React.Component{
  constructor(){
    super();
    this.onBlur = this.onBlur.bind(this);
  }
  onBlur(e){
    const value = e.target.value;
    if(value==undefined || value==''){
      this.props.onValidityChange(e, false);
      return;
    }
    const date = value.split('-');
    if(date.length!=3){
      this.props.onValidityChange(e, false);
    }else{
      this.props.onValidityChange(e, true);
      this.props.onChange(e, new Date(date[2],date[0],date[1]));
    }
  }
  render(){
    return (
      <input name='date' placeholder='mm-dd-yyyy' onBlur = {this.onBlur} />
    );
  }
}
*/
