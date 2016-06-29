import React from "react";


export default class Soru extends React.Component{
  render() {
    return <div>
    1) Hangisini biliyorsunuz?<br/>
    <input type="radio" name="programlama" value="python" /> python <br/>
    <input type="radio" name="programlama" value="Javascript" /> Javascript <br/>
    <input type="radio" name="programlama" value="Java" /> Java <br/>
    <input type="radio" name="programlama" value="C" /> C <br/>
    <input type="radio" name="programlama" value="C++" /> C++ <br/>


    </div>;
  }
}
