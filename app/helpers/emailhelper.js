const nodemailer = require("nodemailer"); 
const hbs = require('nodemailer-express-handlebars')
let responseGot = {}
const dotenv=require('dotenv');
dotenv.config();

exports.emailUtility= async (emailFrom, emailTo, emailSubject,  emailLink, emailLink2, text, fName  ) =>{
   
        let resp= await wrapedSendMail();
         return resp;

    async function wrapedSendMail(){
        return new Promise((resolve,reject)=>{
            let transport = nodemailer.createTransport({
    
                host: process.env.mailName,
                port: 465,
                secure: true, 
                auth: {
                        user: process.env.user,
                        pass:  process.env.pass  
               }  
               });
  const handlebarsOptions= {
      viewEngine:{
          extName:'index.handlebars',
          partialsDir: './',
          layoutsDir: './',
          defaultLayout:'./app/helpers/index'
      },
      viewPath:'./app/helpers',
      extName:'.handlebars',
   
  };
        transport.use('compile', hbs(handlebarsOptions));
        const mailOptions = {
            // should be replaced with real  recipient's account 
            from: emailFrom,
            to: emailTo,         
            subject:emailSubject,
            text:emailLink,
            template: 'index',
            context: {
                name: fName,
                link:emailLink,
                link2: emailLink2,
                message: text
               
            }
        }; 


     let resp=false;
     transport.sendMail(mailOptions, function(error, info){
        if (error) {
         //   console.log('=======================================yyyyyyy======================')
            console.log("error is "+error);
           reject(false); // or use rejcet(false) but then you will have to handle errors
           //return error
        } 
       else {
          
     //   console.log('=======================================uuuuuuuuu======================')
         console.log('Email sent: ' + info.response);    
           resolve(true);
        }
       });
     
       })
    }
       
  
} 

exports.emaiforgotPassword= async (emailFrom, emailTo, emailSubject, emailText, emailText2 ) =>{
   
    let resp= await wrapedSendMail();
     return resp;

async function wrapedSendMail(){
    return new Promise((resolve,reject)=>{
    let transport = nodemailer.createTransport({
        service: 'gmail',
    auth: {
        // should be replaced with real sender's account
        user: process.env.emaillUser,
        pass: process.env.emailPassword     
    },
    });
const handlebarsOptions= {
  viewEngine:{
      extName:'forgotpassword.handlebars',
      partialsDir: './',
      layoutsDir: './',
      defaultLayout:'./app/helpers/forgotpassword'
  },
  viewPath:'./app/helpers',
  extName:'.handlebars',
};
    transport.use('compile', hbs(handlebarsOptions));
    const mailOptions = {
        // should be replaced with real  recipient's account 
        from: emailFrom,
        to: emailTo,         
        subject:emailSubject,
        text:emailText,
        template: 'forgotpassword',
        context: {
            name: emailTo,
            link:emailText,
            link2: emailText2
        }
    }; 


 let resp=false;
 transport.sendMail(mailOptions, function(error, info){
    if (error) {
     //   console.log('=======================================yyyyyyy======================')
        console.log("error is "+error);
       reject(false); // or use rejcet(false) but then you will have to handle errors
       //return error
    } 
   else {
      
 //   console.log('=======================================uuuuuuuuu======================')
     console.log('Email sent: ' + info.response);    
       resolve(true);
    }
   });
 
   })
}
   

} 

exports.twoFactorAuth= async (emailFrom, emailTo, emailSubject, emailText ) =>{
   
    let resp= await wrapedSendMail();
     return resp;

async function wrapedSendMail(){
    return new Promise((resolve,reject)=>{
    let transport = nodemailer.createTransport({
        service: 'gmail',
    auth: {
        // should be replaced with real sender's account
        user: process.env.emaillUser,
              pass: process.env.emailPassword               
    },
    });
const handlebarsOptions= {
  viewEngine:{
      extName:'twofactorauth.handlebars',
      partialsDir: './',
      layoutsDir: './',
      defaultLayout:'./app/helpers/twofactorauth'
  },
  viewPath:'./app/Helpers',
  extName:'.handlebars',

};
    transport.use('compile', hbs(handlebarsOptions));
    const mailOptions = {
        // should be replaced with real  recipient's account 
        from: emailFrom,
        to: emailTo,         
        subject:emailSubject,
        text:emailText,
        template: 'twofactorauth',
        context: {
            name: emailTo,
            link:emailText,
            
        }
    }; 


 let resp=false;
 transport.sendMail(mailOptions, function(error, info){
    if (error) {
     //   console.log('=======================================yyyyyyy======================')
        console.log("error is "+error);
       reject(false); // or use rejcet(false) but then you will have to handle errors
       //return error
    } 
   else {
      
 //   console.log('=======================================uuuuuuuuu======================')
     console.log('Email sent: ' + info.response);    
       resolve(true);
    }
   });
 
   })
}
   

} 

exports.notifyuser= async (emailFrom, emailTo, emailSubject, emailText, shopperUsername, earnerUsername, cancellationReason) =>{
   
    let resp= await wrapedSendMail();
     return resp;

async function wrapedSendMail(){
    return new Promise((resolve,reject)=>{
    let transport = nodemailer.createTransport({
        service: 'gmail',
    auth: {
        // should be replaced with real sender's account
          user: process.env.emaillUser,
              pass: process.env.emailPassword               
    },
    });
const handlebarsOptions= {
  viewEngine:{
      extName:'notifyuser.handlebars',
      partialsDir: './',
      layoutsDir: './',
      defaultLayout:'./app/helpers/notifyuser'
  },
  viewPath:'./app/Helpers',
  extName:'.handlebars',

};
    transport.use('compile', hbs(handlebarsOptions));
    const mailOptions = {
        // should be replaced with real  recipient's account 
        from: emailFrom,
        to: emailTo,         
        subject:emailSubject,
        text:emailText,
        template: 'notifyuser',
        context: {
            name: shopperUsername,
            link: emailText,
            earnerUsername: earnerUsername,
            cancellationReason: cancellationReason
        }
    }; 


 let resp=false;
 transport.sendMail(mailOptions, function(error, info){
    if (error) {
     //   console.log('=======================================yyyyyyy======================')
        console.log("error is "+error);
       reject(false); // or use rejcet(false) but then you will have to handle errors
       //return error
    } 
   else {
      
 //   console.log('=======================================uuuuuuuuu======================')
     console.log('Email sent: ' + info.response);    
       resolve(true);
    }
   });
 
   })
}
   

}

exports.sendMessage= async (emailFrom, emailTo, subject, phoneNo, fullName, text ) =>{
   
    let resp= await wrapedSendMail();
     return resp;

async function wrapedSendMail(){
    return new Promise((resolve,reject)=>{
    let transport = nodemailer.createTransport({
        service: 'gmail',
    auth: {
        // should be replaced with real sender's account
          user: process.env.emaillUser,
          pass: process.env.emailPassword               
    },
    });
const handlebarsOptions= {
  viewEngine:{
      extName:'index5.handlebars',
      partialsDir: './',
      layoutsDir: './',
      defaultLayout:'./app/helpers/index5'
  },
  viewPath:'./app/Helpers',
  extName:'.handlebars',
 
};
    transport.use('compile', hbs(handlebarsOptions));
    const mailOptions = {
        // should be replaced with real  recipient's account 
        from: emailFrom,
        to: emailTo,         
        subject:subject,
        text:text,
        template: 'index5',
        context: {
            name: fullName,
            message: text,
            phoneNo: phoneNo
           
        }
    }; 


 let resp=false;
 transport.sendMail(mailOptions, function(error, info){
    if (error) {
     //   console.log('=======================================yyyyyyy======================')
        console.log("error is "+error);
       reject(false); // or use rejcet(false) but then you will have to handle errors
       //return error
    } 
   else {
      
 //   console.log('=======================================uuuuuuuuu======================')
     console.log('Email sent: ' + info.response);    
       resolve(true);
    }
   });
 
   })
}
   

}