function onOpen() {
var spreadsheet = SpreadsheetApp.getActive();
var menuItems = [
{name: 'get key', functionName: 'MD5'},
{name: '1.Register accounts', functionName: 'registerAccounts'},
{name: '2.Create Course', functionName: 'CreateCourse'},
{name: '3.Create Class', functionName: 'CreateClass'},
{name: '5.Add students to Course', functionName: 'addCourseStudent'},
{name: '4.Get DSHS', functionName: 'getCacheDSHS'},
{name: '6.Update Shortlink', functionName: 'UpdateShortlink'},
{name: '7.Add Class Tag', functionName: 'CreateClassTag'},
{name: '8.ChangeTE', functionName: 'ChangeTE'},

];
spreadsheet.addMenu('Operation tools', menuItems);
}