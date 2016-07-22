import React from 'react'
import Immutable from 'Immutable'

const q1 = {
  title: "Aşağıdakilerden hangisinde daha iyisiniz?",
  id: 1,
  type: "radio",
  categoryWeights:[
    {
      category:"Back-End",
      weight:0.1
    },
    {
      category:"Front-End",
      weight:0.3
    }
  ],
  options:[],
  weight:2,
  setList:["Set 1"]
};
const q2 = {
  title: "Aşağıdakilerden hangisinde daha iyisiniz?",
  id: 1,
  type: "radio",
  categoryWeights:[
    {
      category:"Back-End",
      weight:0.1
    },
    {
      category:"Front-End",
      weight:0.3
    }
  ],
  options:[],
  weight:2,
  setList:["Set 1"]
};;
const m1 = Immutable.fromJS(q1,(key,value)=>{
  var isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
})
const m2 = Immutable.fromJS(q2,(key,value)=>{
  var isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
})
const Deneme = React.createClass({
  render () {
    console.dir(m1);
console.dir(m2);
    return (
     <div></div>
    )
  }
})

export default Deneme
