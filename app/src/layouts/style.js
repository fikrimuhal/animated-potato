/**
 * Created by MYigit on 9.8.2016.
 */
var image = require("!file!../assets/images/bg1.jpg");
export const userLayoutStyles = {
    paperStyle:{
        margin:"0 auto",
        border:"1px teal solid",
        borderRadius:"10px",
        minHeight:"400px",
        height:"auto !important",
        width:"75%",
        padding:"15px",
        marginTop:"10px"
    },
    main:{
        backgroundImage:"url(" + image + ")",
        height:"100%"
    },
    skillTestPaper:{
        margin:"0 auto",
        border:"1px teal solid",
        borderRadius:"10px",
        height:"auto !important",
        minHeight:"350px",
        width:"55%",
        padding:"15px",
        marginTop:"10px"
    },
    skillTestPaperMobil:{
        margin:"0 auto",
        height:"auto !important",
        minHeight:"350px",
        padding:"15px",
        marginTop:"10px",
        boxShadow:"none"
    },
    testButtonGroup:{
        float:"right",
        marginRight:"1%",
        position:"relative",
        bottom:0,
        marginTop:"12%",
        height:'20%'
    },
    questionContainer:{

        marginTop:"10px",
        minHeight:"84%",
        height:'auto !important'
    },
    questionText:{
        fontSize:"21px",
        color:"#444444",
        fontWeight:"500",
        marginLeft:"14px"
    },
    questionBadgeRed:{
        width:"36px",
        height:"36px",
        backgroundColor:"rgb(255, 64, 129)",
        fontWeight:"800",
        fontSize:"16px",
        top:"22px",
        left:"-13px"
    },
    questionBadgeYellow:{
        width:"36px",
        height:"36px",
        backgroundColor:"rgb(212, 197, 41)",
        fontWeight:"800",
        fontSize:"16px",
        top:"22px",
        left:"-13px"
    },
    questionBadgeBlue:{
        width:"36px",
        height:"36px",
        backgroundColor:"#2196f3",
        fontWeight:"800",
        fontSize:"16px",
        top:"22px",
        left:"-13px"
    },
    questionBadgeGreen:{
        width:"36px",
        height:"36px",
        backgroundColor:"#4caf50",
        fontWeight:"800",
        fontSize:"16px",
        top:"22px",
        left:"-13px"
    },
    optionText:{
        fontSize:"20px",
        color:"rgb(44, 94, 101)",
        fontWeight:"500"
    },
    tusStili:{
        display:"inline-block",
        padding:"3px 5px",
        font:"11px Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        lineHeight:"10px",
        color:"#555",
        verticalAlign:"middle",
        backgroundColor:"#fcfcfc",
        borderSolid:"1px   #ccc",
        borderBottomColor:"#bbb",
        borderRadius:"3px",
        boxShadow:"inset 0 -1px 0 #bbb"
    },
    signInContainer:{
        margin:"0 auto",
        minWidth:"299px",
        border:"1px dotted teal",
        padding:"54px",
        backgroundColor:"#f9feff",
        height:"100%",
        maxWidth:"500px",
        margin:"0 auto",
        marginTop:"15px"
    },
    signUpFormContainer:{
        border:"1px dotted teal",
        padding:"30px",
        backgroundColor:"#f9feff",
        height:"100%",
        margin:"0 auto",
        maxWidth:"500px",
        width:"300px"

    }
}

export const questionSetDetailPage = {
    setCreateToolbar:{
        textAlign:"right"
    }
};

export const questionAddPage = {
    sectionTitle:{
        fontSize:"large",
        color:"teal",
        fontWeight:"600",
        fontFamily:"inherit"
    },
    dottedContainer:{
        backgroundColor:"#f1f1f1",
        padding:"5px 5px 5px 5px",
        marginTop:"5px",
        border:"dotted 1px teal"
    },
    optionItem:{
        marginTop:"5px",
        padding:"5px 5px 5px 5px",
        border:"solid 1px teal",
        borderRadius:"10px",
        backgroundColor:"white",

    }
}

export const AdminLayoutStyle = {
    main:{
        backgroundImage:"url(" + image + ")",
        height:"auto !important",
        minHeight:"100%",
        backgroundSize:"cover"
    },
    mainPaper:{
        //margin:"0 auto",
        border:"1px teal solid",
        borderRadius:"10px",
        minHeight:"300px",
        height:"auto !important",
        width:"95%",
        padding:"15px",
        marginTop:"10px"
    },
    adminMenuContainer:{
        margin:'0 auto',
        marginTop:'10px'
    },
    adminMenuBar:{
        width:"100% important",
        maxWidth:"100%"
    }
}

export  const GraphStyles = {
  widgetContainer:{
      border:"1px teal dotted",
      borderRadius:"10px",
      marginTop:"15px",
      padding:"5px",
      backgroundColor:"rgba(213, 224, 205, 0.1)"
  },
    SummaryBarPaper:{
        height: "110px",
        width: "90%",
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        border:"1px solid teal"
    },
    SummaryBarLabel:{
        fontWeight: "bolder",
        fontSize: "35px",
        color: "#9c475b",
        padding:"5px",
        //borderBottom:"5px inset #9c475b",
        //borderRadius:"50%",

    },
    userInfoCol:{
        fontSize:"17px",
        color:"9c475b",
        borderBottom:"1px dotted teal"
    },
    avatar:{
        width:"100%",
        height:"100%",
        border:"1px solid teal"
    }
};