function callRedashApi2() {

  const url2 = REDASH_API_CacheDSHS

  const raw2 = {
    "id":387,
    "parameters":{

      },
    "apply_auto_limit":false,
    "max_age":100
  }
  let option2 = {
    method: "POST",
    payload: JSON.stringify(raw2)
  }
  let respone
  let i = 0
  do{
    console.log(i)
    respone = JSON.parse(UrlFetchApp.fetch(url2,option2))
    i += 1
    console.log(respone)
    Utilities.sleep(1000)
  }while(respone.job != undefined && i <= 40)

  if(respone.query_result == undefined){
    return "Call api fail"
  }
  console.log(respone.query_result.data.rows)
  return respone.query_result.data.rows
}


function getCacheDSHS() {
  const ss2 = SpreadsheetApp.getActiveSpreadsheet()
  const ws2 = ss2.getSheetByName("cache ds hs")

  // const todayStr = Utilities.formatDate(new Date(), ss2.getSpreadsheetTimeZone(), "YYYY-MM-dd")
  
  let studentList2 = callRedashApi2()

  //clear work sheet
  if(ws2.getLastRow() > 1){
    ws2.getRange(2,1,ws2.getLastRow() - 1, 13).clear()
  }
  //set data by header
  let headers = ws2.getRange(1,1,1,13).getValues()[0]
  let result = []
  studentList2.forEach(item => {
    let row = []
    headers.forEach(h => {
      row.push(item[h])
    })
    result.push(row)
  })
  if(result.length > 0){
    ws2.getRange(2,1,result.length,headers.length).setValues(result)
  }
}

