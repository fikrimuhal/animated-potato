/**
 * Created by MYigit on 9.8.2016.
 */
var image=require("../assets/images/bg1.jpg")
export const userLayoutStyles={
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
        height: "100%"
    },
    skillTestPaper: {
        margin: "0 auto",
        border: "1px teal solid",
        borderRadius: "10px",
        height: "auto !important",
        minHeight: "350px",
        width: "55%",
        padding: "15px",
        marginTop: "10px"
    },
    skillTestPaperMobil: {
        margin: "0 auto",
        height: "auto !important",
        minHeight: "350px",
        padding: "15px",
        marginTop: "10px",
        boxShadow: "none"
    },
    testButtonGroup: {
        float: "right",
        marginRight: "1%",
        position: "relative",
        bottom: 0,
        marginTop: "12%",
        height: '20%'
    },
    questionContainer: {

        marginTop: "10px",
        minHeight: "84%",
        height: 'auto !important'
    },
    questionText: {
        fontSize: "21px",
        color: "#444444",
        fontWeight: "500",
        marginLeft:"14px"
    },
    questionBadgeRed:{
        width:"36px",
        height:"36px",
        backgroundColor:"rgb(255, 64, 129)",
        fontWeight: "800",
        fontSize: "16px",
        top:"22px",
        left:"-13px"
    },
    questionBadgeYellow:{
        width:"36px",
        height:"36px",
        backgroundColor:"rgb(212, 197, 41)",
        fontWeight: "800",
        fontSize: "16px",
        top:"22px",
        left:"-13px"
    },
    questionBadgeBlue:{
        width:"36px",
        height:"36px",
        backgroundColor:"#2196f3",
        fontWeight: "800",
        fontSize: "16px",
        top:"22px",
        left:"-13px"
    },
    questionBadgeGreen:{
        width:"36px",
        height:"36px",
        backgroundColor:"#4caf50",
        fontWeight: "800",
        fontSize: "16px",
        top:"22px",
        left:"-13px"
    },
    optionText: {
        fontSize: "20px",
        color: "rgb(44, 94, 101)",
        fontWeight: "500"
    },
    tusStili: {
        display: "inline-block",
        padding: "3px 5px",
        font: "11px Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        lineHeight: "10px",
        color: "#555",
        verticalAlign: "middle",
        backgroundColor: "#fcfcfc",
        borderSolid: "1px   #ccc",
        borderBottomColor: "#bbb",
        borderRadius: "3px",
        boxShadow: "inset 0 -1px 0 #bbb"
    },
    signInContainer: {
        margin: "0 auto",
        minWidth: "299px",
        border: "1px dotted teal",
        padding: "54px",
        backgroundColor: "#f9feff",
        height: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        marginTop: "15px"
    },
    signUpFormContainer: {
        border: "1px dotted teal",
        padding: "30px",
        backgroundColor: "#f9feff",
        height: "100%",
        margin: "0 auto",
        maxWidth: "500px",
        width: "300px"

    }
}


export const questionSetDetailPage = {
    setCreateToolbar : {
        textAlign:"right"
    }
}