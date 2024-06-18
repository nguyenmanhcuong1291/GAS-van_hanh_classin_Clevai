function UpdateShortlink() {

  sheet = SS.getSheetByName("shortlink_mkt");
  dataArr = sheet.getRange(4,1,sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues() ;
console.log(dataArr.length)
var server = "mysql-production-01.cehf1xx1kagh.ap-southeast-1.rds.amazonaws.com";
var port = 3306;
var db = "polr";
var user = "polr";
var pwd = "b39e738e9ffbe448e15993ae1f8d35ea";


  var url = "jdbc:mysql://" + server+":"+port+"/"+db;
  console.log(url)
  var conn = Jdbc.getConnection(url, user, pwd);
  Logger.log(conn);

  stmt = conn.createStatement();
// xóa api response 
  sheet.getRange("h4:h").clear()

 for (i=0 ; i<dataArr.length ; i++ )
  { let row = dataArr[i]
    console.log(row)
    if(row[0] == ""){
      console.log("row",i+3,"empty")
    }
    else {
    let qr = "UPDATE links set long_url ='"+row[6]+"' WHERE short_url = '"+row[1]+"'"
    console.log(qr)
    sheet.getRange(`h${i+4}`).setValue("done")
    stmt.execute(qr);
    SpreadsheetApp.flush()
  }
  }

  conn.close();
}

