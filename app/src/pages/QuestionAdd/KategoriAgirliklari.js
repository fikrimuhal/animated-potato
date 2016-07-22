import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {log2} from '../../utils/'
const log = log2("KategoriAgirliklari: ")
const styles = {
  flexContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flexStart",
    flexFlow:"row wrap"
  },
  container: {

    backgroundColor:"#f1f1f1",
    padding:"5px 5px 5px 5px",
    marginTop:"5px",

  },
  child:{
    width:"200px",
    height:"100px",
    backgroundColor:"lightYellow",
    padding:"5px 5px 5px 5px",
    marginLeft:"5px",
    marginTop:"5px"
  }
};
export default class KategoriAgirliklari extends React.Component{
  constructor(props)
  {
    super(props)
  }
  handleQuestionCategoryChange = function (event,value) {
    var model = this.props.parent.state.data;
    if (value != null && value!="") {
      model.category = event.target.textContent;
      this.props.parent.setState({
        data : model
     });
    }
  }

handleChange = function (item,event,values) {
  console.dir(this);
  let kategoriList = this.props.parent.state.data.categoryWeights;

}
categorySelected = function (kategori,event) {
//console.dir(this);
  let kategoriList = this.props.parent.state.data.categoryWeights; //parentın state'deki datasını aldık güncellicez. Eğer
  let index = _.findIndex(kategoriList,(k)=>{return k.category==kategori});
  let isFound = index != -1;

  if (isFound) {
    kategoriList.splice(index,1);
  }
  else {
    kategoriList.push({
      category:kategori,
      weight:0
    });
  }
  this.props.parent.setState({
    categoryWeights:kategoriList
  });

}
sliderChange = function (kategori,event,value) {
//log(value,kategori,event);
let kategoriList = this.props.parent.state.data.categoryWeights; //parentın state'deki datasını aldık güncellicez. Eğer
let index = _.findIndex(kategoriList,(k)=>{return k.category==kategori});
kategoriList[index].weight = value;
this.props.parent.setState({
  categoryWeights:kategoriList
});

}
shouldComponentUpdate= function(nextProps, nextState) {
  return true;
}


  render= ()=>{
    log("kategoriler")
    //console.dir(this.props.kategoriler)
      let kategoriList = this.props.parent.state.data.categoryWeights;
    return (

      <div style = {styles.container}>

      <label>Kategorileri seçip ağırlıklarını belirleyiniz.</label>
      <div style = {styles.flexContainer}>
          {
            //let _this = this; /*aşağıda yeni blok açılıyor this kavramı kaybolduğu için bu değişkene attım aşağıda kullanabilmek için*/

            this.props.kategoriler.map( (kategori) => {
              let index = _.findIndex(kategoriList,(k)=>{return k.category==kategori});
              let checked = index != -1;
              let weight = (checked)? kategoriList[index].weight:0;

              //log(index,checked,weight);
              //console.log("weight:" + weight)
              return(
                <div style={styles.child}>
                  <Checkbox ref="cbKategori" checked={checked}  key={kategori} value={kategori} label={kategori} onClick={this.categorySelected.bind(this,kategori)}/>
                  <span>Ağırlık: {weight}</span>
                  <Slider   value={weight} disabled={!checked} onChange={this.sliderChange.bind(this,kategori)} />
                </div>

              )
                  })
           }
        </div>
      </div>

    )

  }
}
