import React from "react";

var styles = {
  container:{
    backgroundColor:'#6925C7',
    padding: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  item:{
    backgroundColor:'#D4E42C',
    padding: 15,
    margin: 10,
    width: 100,
    height: 70,
  },
  header:{
    backgroundColor:'#25CAD5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  footer:{
    backgroundColor:'#D52595',
    display: 'flex',
    flexDirection: 'row',
  }
}
const DivDeneme = () => {
  return(
  <div>
  <div style={styles.container}>
    <div style={styles.item}>Div1</div>
    <div style={styles.item}>Div2</div>
    <div style={styles.item}>Div3</div>
    <div style={styles.item}>Div1</div>
    <div style={styles.item}>Div2</div>
    <div style={styles.item}>Div3</div>
  </div>

  <div style={styles.header}>
  <div style={styles.item}>Div1</div>
  <div style={styles.item}>Div2</div>
  <div style={styles.item}>Div3</div>
  <div style={styles.item}>Div1</div>
  <div style={styles.item}>Div2</div>
  <div style={styles.item}>Div3</div>
  </div>

  <div style={styles.footer}>
  <div style={styles.item}>Div1</div>
  <div style={styles.item}>Div2</div>
  <div style={styles.item}>Div3</div>
  <div style={styles.item}>Div1</div>
  <div style={styles.item}>Div2</div>
  <div style={styles.item}>Div3</div>
  </div>

  </div>
)};

export default DivDeneme
