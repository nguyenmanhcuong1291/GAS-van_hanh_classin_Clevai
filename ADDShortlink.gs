function ADDSHORTLINK(){
  let registerSheet = SS.getSheetByName("shortlink")
  let dataArr = registerSheet.getRange("A3:e").getDisplayValues()
  if(dataArr.length == 0) {
    console.log("no data")
    return -1
  }
  for(let i = 0; i < dataArr.length; i ++){
    let row = dataArr[i]
    console.log(row)
    if(row[0] == ""){
      console.log("row",i+3,"empty")
    }
    else if(row[4] != ""){
      console.log("row",i+3,"registed")
    }
    else {
      try{
        let respone = runAPIADDSHORTLINK(row[1])
      console.log(respone)
      registerSheet.getRange(`e${i+3}`).setValue(respone)
      }
      catch(e){
        console.log(e)
        registerSheet.getRange(`e${i+3}`).setValue(e.toString())
      }
    }
  }
}


function runAPIADDSHORTLINK(user_name){

  let raw = {
"url":"https://drive.google.com/file/d/1TK6lab0kub0aXBEjE_TwARiuIq3Dc9XF/view?usp=drive_link",
"custom_ending":user_name
  }

  console.log(raw)
  const options = {
      'headers': {
        contentType:"application/x-www-form-urlencoded",
      },
      'method': 'POST',
      'payload': raw
    }
  let respone = UrlFetchApp.fetch(ADDSHORTLINK_API_URL, options)
   console.log(respone.toString())
  return respone.toString()
}
