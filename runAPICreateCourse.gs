function CreateCourse(){
  let registerSheet = SS.getSheetByName("course list")
  let dataArr = registerSheet.getRange("A3:x").getDisplayValues()
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
    else if(row[22] != ""){
      console.log("row",i+3,"registed")
    }
    else if(row[20] != ""){
      try{
      let respone = runApiCreateCourse()
      console.log(respone)
      registerSheet.getRange(`w${i+3}`).setValue(respone.error_info.errno)
      registerSheet.getRange(`x${i+3}`).setValue(respone.data)
      }
      catch(e){
        console.log(e)
        registerSheet.getRange(`x${i+3}`).setValue(e)
      }

    }
  }
}


function runApiCreateCourse(){
  let md5 = generateMd5()
  let raw = {

    "SID":SID,
    "safeKey":md5.safeKey,
    "timeStamp":md5.timeStamp,
    "courseName":"Clevai",
    "folderId":"2295678676",
    "allowAddFriend":"0",
  }
  console.log(raw)
  const options = {
      'headers': {
        contentType:"application/x-www-form-urlencoded",
      },
      'method': 'POST',
      'payload': raw
    }
  let respone = JSON.parse(UrlFetchApp.fetch(CREATE_COURSE_API_URL, options))
  // console.log(respone)
  return respone
}

function generateMd5() {
  console.log(new Date())
  const date = new Date();
  const secretkey = SECRET_KEY
  const epochdate = Math.floor((date.getTime()/1000)).toString(); 
  const dateValue = secretkey+epochdate
  console.log(epochdate)
  console.log(dateValue)

  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5,dateValue);

  var txtHash = '';
  for (i = 0; i < rawHash.length; i++) {
    var hashVal = rawHash[i];
    if (hashVal < 0) {
      hashVal += 256;
    }
    if (hashVal.toString(16).length == 1) {
      txtHash += '0';
    }
    txtHash += hashVal.toString(16);
  }
  console.log(txtHash)
   console.log(new Date())
  return { 
    safeKey: txtHash,
    timeStamp: epochdate
  } 
}