function UpdateShortlink() {

  sheet = SS.getSheetByName("shortlink");
  dataArr = sheet.getRange("A4:G").getDisplayValues() ;

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

 for (i=0 ; i<100 ; i++ )
  { let row = dataArr[i]
    console.log(row)
    let qr = "UPDATE links set long_url ='"+row[6]+"' WHERE short_url = '"+row[1]+"'"
    console.log(qr)
    sheet.getRange(`h${i+4}`).setValue("done")
    stmt.execute(qr);
  }


  conn.close();
}

