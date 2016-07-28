import React from 'react'
import SkillTest from './SkillTest'
import {util,log2} from '../../utils/'
const log = log2("SkillTestContainer")
export default class SkillTestContainer extends React.Component{
constructor(props){
  super(props);
  this.state={
    questions = []
  }
}
render = function () {
  return (
    <SkillTest questions={questions}/>
  )
}
}
