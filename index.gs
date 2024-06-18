  const SS = SpreadsheetApp.getActiveSpreadsheet()
  const ws = SS.getSheetByName("index")
  const REGISTER_USERS_API_URL = "https://api.eeo.cn/partner/api/course.api.php?action=register"
  const CREATE_COURSE_API_URL = "https://api.eeo.cn/partner/api/course.api.php?action=addCourse"
  const CREATE_CLASS_API_URL = "https://api.eeo.cn/partner/api/course.api.php?action=addCourseClass"
  const ADDCOURSESTUDENTS_API_URL = "https://api.eeo.cn/partner/api/course.api.php?action=addCourseStudent"
  const ADDSHORTLINK_API_URL = "https://clev.ai/api/v2/action/shorten?key=4c3f28a0ac2f02a2e4350d3c3296287a71ccc62e01d2028925bb450fda85d6805e49b5ef8eef56eff5848f466128f2c3f774" 
  const REDASH_API_CacheDSHS = "https://redash.clev.ai/api/queries/387/results?api_key=E6fNGR9UbyCkphjZbkzgNzemcCTRsH8tMvzh21vF"
  const CREATE_SCHOOL_TAG_API_URL = "https://api.eeo.cn/partner/api/course.api.php?action=addSchoolLabel"
  const CREATE_CLASS_TAG_API_URL = "https://api.eeo.cn/partner/api/course.api.php?action=addClassLabels"
  const CHANGE_CLASSIN_TEACHER_URL = "https://api.eeo.cn/partner/api/course.api.php?action=editCourseClass"
  const END_COURSE_URL = "https://api.eeo.cn/partner/api/course.api.php?action=endCourse"
  const SECRET_KEY = "6zoKkcIs"
  const SID = 68103756


function MD5 () {
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

  var cell = ws.getRange("a2"); 
  cell.setValue(txtHash);
  var cell = ws.getRange("b2"); 
  cell.setValue(epochdate)
  // return txtHash;
  
}