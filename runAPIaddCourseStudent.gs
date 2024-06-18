function addCourseStudent(){
  let registerSheet = SS.getSheetByName("ds hs")
  let dataArr = registerSheet.getRange("A3:V").getDisplayValues()
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
    else if(row[20] != ""){
      console.log("row",i+3,"registed")
    }
    else if(row[17] != ""&&row[16] != ""){
      try{
      let respone = runAPIaddCourseStudent(row[17],row[16])
      console.log(respone)
      registerSheet.getRange(`u${i+3}`).setValue(respone.error_info.errno)
      registerSheet.getRange(`v${i+3}`).setValue(respone.data)
      }
      catch(e){
        console.log(e)
        registerSheet.getRange(`v${i+3}`).setValue(e)
      }

    }
  }
}


function runAPIaddCourseStudent(course_id,student_uid){
  let md5 = generateMd5()
  let raw = {
    "SID":"68103756",
    "safeKey":md5.safeKey,
    "timeStamp":md5.timeStamp,
    "courseId":course_id,
    "identity":"1",
    "studentUid":student_uid
  }

  console.log(raw)
  const options = {
      'headers': {
        contentType:"application/x-www-form-urlencoded",
      },
      'method': 'POST',
      'payload': raw
    }
  let respone = JSON.parse(UrlFetchApp.fetch(ADDCOURSESTUDENTS_API_URL, options))
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