<div style={styles}>

    <ActionHome style={styles} />

  <h3>Sorular</h3>

    <div>

        <p><b>1)</b> İş tecrübeniz var mı?</p>

        <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

        <RadioButton
          value="experience"
           label="Evet"
           style={styles.radioButton}
         />
         <RadioButton

            label="Hayır"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
    </div>
    <div>
        <p><b>2)</b> Aşağıdaki koddaki hatayı düzeltebilir misiniz?</p>
        <p>functionn carpim()"{" "}"
        </p>

        <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

        <RadioButton
          value="experience"
           label="Evet"
           style={styles.radioButton}
         />
         <RadioButton

            label="Hayır"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
    </div>
    <div>
        <p><b>3)</b>Scala biliyor musunuz?</p>

        <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

        <RadioButton
          value="experience"
           label="Evet"
           style={styles.radioButton}
         />
         <RadioButton

            label="Hayır"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
    </div>
    <div>
        <p><b>4)</b>React biliyor musunuz?</p>

        <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

        <RadioButton
          value="experience"
           label="Evet"
           style={styles.radioButton}
         />
         <RadioButton

            label="Hayır"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
    </div>  <br/><br/><br/>
    <div style={styles.button}>
      <Link to="/questions2"><RaisedButton label="İleri" primary={true}/></Link>
    </div>
      <br/><br/><br/><br/>
    <div>
        <span>Klavyeden evet için <b>"e"</b> hayır için <b>"h"</b> tuşlarını kullanabilirsiniz.</span>
    </div>

</div>
