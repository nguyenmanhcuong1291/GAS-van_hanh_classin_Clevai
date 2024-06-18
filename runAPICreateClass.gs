function CreateClass(){
  let registerSheet = SS.getSheetByName("course list")
  let dataArr = registerSheet.getRange("A3:y").getDisplayValues()
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
    else if(row[24] != ""){
      console.log("row",i+3,"registed")
    }
    else if(row[23] != ""){
      try{
      let class_Name = row[2]+row[3]+"-"+row[13]+"_"+row[17]
      let respone = runApiCreateClass(row[23],class_Name,row[14],row[15],row[16])
      console.log(respone)
      registerSheet.getRange(`y${i+3}`).setValue(respone.error_info.errno)
      registerSheet.getRange(`z${i+3}`).setValue(respone.data),
      registerSheet.getRange(`aa${i+3}`).setValue(respone.more_data.live_url)
      }
      catch(e){
        console.log(e)
        registerSheet.getRange(`z${i+3}`).setValue(e)
      }

    }
  }
}


function runApiCreateClass(course_id,class_Name,begin_time,end_time,teacher_uid){
  let md5 = generateMd5()
  let raw = {

    "SID":"68103756",
    "safeKey":md5.safeKey,
    "timeStamp":md5.timeStamp,
    "courseId":course_id,
    "className":class_Name,
    "beginTime":begin_time,
    "endTime":end_time,
    "teacherUid":teacher_uid,
    "folderId":"2295678676",
    "seatNum":"12",
    "live":"1",
    "record":"1",
    "isAutoOnstage":"0",
    "allowUnloggedChat":"0",
  }

  console.log(raw)
  const options = {
      'headers': {
        contentType:"application/x-www-form-urlencoded",
      },
      'method': 'POST',
      'payload': raw
    }
  let respone = JSON.parse(UrlFetchApp.fetch(CREATE_CLASS_API_URL, options))
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