const verifCodeStyle = "padding : 5px; background-color : black; color : white; width : fit-content; border-radius: 5px";
//mail form  
module.exports.verificationEmailBody = (firstName, lastName, verifCode) =>{
    return `Hello ${firstName} ${lastName},<br>Here's your verification code<br>`+
    `<h2 style=${verifCodeStyle}> ${verifCode.toString()}</h2>`
}