module.exports.getdate=getdate //allow us to use the infos inside app.js
function getdate(){
    const today=new Date() 
    const options={
    week:"long",
    day:"numeric",
    month:"long"

}
return day=today.toLocaleDateString("en-US",options)
}
