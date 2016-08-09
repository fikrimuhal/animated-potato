/**
 * Created by MYigit on 9.8.2016.
 */
var image = require("../assets/images/bg1.jpg")
export const userLayoutStyles = {
    paperStyle: {
        margin: "0 auto",
        border: "1px teal solid",
        borderRadius: "10px",
        minHeight: "400px",
        height: "auto !important",
        width: "75%",
        padding: "15px",
        marginTop: "10px"
    },
    main: {
        backgroundImage: "url(" + image + ")",
        height:"100%"
    },
    skillTestPaper:{
        margin: "0 auto",
        border: "1px teal solid",
        borderRadius: "10px",
        height: "300px",
        width: "40%",
        padding: "15px",
        marginTop: "10px"
    },
    testButtonGroup:{
        float:"right",
        marginRight:"1%"
    },
    questionContainer:{

        marginTop:"10px",
        minHeight:"80%"
    }
}
