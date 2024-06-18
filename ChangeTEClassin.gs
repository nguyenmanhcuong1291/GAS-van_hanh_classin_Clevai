function ChangeTE() {

  sheet = SS.getSheetByName("change TE");
  dataArr = sheet.getRange(4,1,sheet.getLastRow(),7).getValues();

var server = "mysql-production-05-replica01.cehf1xx1kagh.ap-southeast-1.rds.amazonaws.com";
var port = 3306;
var db = "bp_log_v2";
var user = "bp_log_v2";
var pwd = "d9b2a29c2616082195311808ea26554a";


  var url = "jdbc:mysql://" + server+":"+port+"/"+db;
  console.log(url)
  var conn = Jdbc.getConnection(url, user, pwd);
  Logger.log(conn);

  stmt = conn.createStatement();

 for (i=0 ; i< dataArr.length ; i++ )
  { let row = dataArr[i]
    console.log(row)

    if(row[0] == ""){
      console.log("row",i+3,"empty")
    }
    else if(row[2] == ""){
    let qr = "SELECT vcr.code from bp_usi_vcr_meeting uvm join bp_vcr_meeting vcr on uvm.published and uvm.myvcr = vcr.code and date(vcr.start_time) = CURRENT_DATE and date(vcr.end_time) = CURRENT_DATE and uvm.myusi = '"+row[0]+"'"
    console.log(qr)
    let results = stmt.executeQuery(qr)
    while (results.next()) {
      let rowString = '';
        rowString += results.getString(1)
      console.log(rowString);
      sheet.getRange(`c${i+4}`).setValue(rowString)
    }
  }
  }
  conn.close();

dataArr2 = sheet.getRange(4,1,sheet.getLastRow(),8).getValues();
console.log(dataArr2)

for (i2=0 ; i2< dataArr2.length ; i2++ )
  { let row = dataArr2[i2]
    console.log(row)

    if(row[0] == ""){
      console.log("row",i2+3,"empty")
    }
     else if(row[2] != ""&& row[7] == ""){
      try{
      let respone = runAPIChangeTE(row[3],row[4],row[5])
      console.log(respone)
      sheet.getRange(`h${i2+4}`).setValue(respone.error_info.errno)
      }
      catch(e){
        console.log(e)
        sheet.getRange(`h${i2+4}`).setValue(e)
      }
     }
}
}

function runAPIChangeTE(course_id="248936647"	,class_id = "710297947",teacher_classin_id="70678872"){
  let md5 = generateMd5()
  let raw = {
    "SID":"68103756",
    "safeKey":md5.safeKey,
    "timeStamp":md5.timeStamp,
    "courseId":course_id,
    "classId":class_id,
    "teacherUid":teacher_classin_id
  }

  console.log(raw)
  const options = {
      'headers': {
        contentType:"application/x-www-form-urlencoded",
      },
      'method': 'POST',
      'payload': raw
    }
  let respone = JSON.parse(UrlFetchApp.fetch(CHANGE_CLASSIN_TEACHER_URL, options))
   console.log(respone)
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