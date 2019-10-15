var express = require('express');
var router = express.Router();
// mysql 인스턴스를 가져옴.
var mysql_odbc = require('../db/db_conn')();
console.log(mysql_odbc);
var conn = mysql_odbc.init();

//var conn = mysql_odbc.init();
//var mysql = require('mysql');

router.get('/', function(req, res, next){
    // createConnection으로 db 설정
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'samsung1',
        database: 'nodedb'
    });
    // connect함수로 접속과 동시에 연결 설정 확인
    connection.connect(function(err){
        if(err){
            res.render('mysql', {connect: '연결 실패', err: err});
            console.error(err);
            throw err;
        }else{
            res.render('mysql', {conndect:'연결 성공', err:'없음'})
        }
    });
    // 연결 종료
    connection.end();
});

module.exports = router;