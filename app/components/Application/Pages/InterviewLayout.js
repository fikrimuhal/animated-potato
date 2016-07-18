import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  space:{
      marginLeft: 185,
  },
};
export default React.createClass({
  render() {
    return (
        <div>
            <div style={styles.space}>
              <h3>Fikrimuhal Teknoloji Çalışan Arıyor.</h3>
              Hangi alanlarda çalışabilirim?
              <ul>
                <li>Linux Sistem/Sunucu</li>
                <li>Web Teknolojileri</li>
                <li>Front End</li>
                </ul>
                Kimler Başvurmalı?
                <ul>
                  <li>-----</li>
                  <li>-----------</li>
                  <li>--------------</li>
                  </ul>
                  Nerede?
                  <ul>
                    <li>-----</li>
                    <li>-----------</li>
                    <li>--------------</li>
                    </ul>
                    <br/>
                  <p><b>Dipnot: </b> Başvuru yapabilmek için lütfen tıklayınız.</p>
                  <div>
                    <Link to="/interview/applicationform"><RaisedButton label="Başvuru Yap" primary={true}/></Link>
                  </div>
            </div>
        </div>
    )}
})
