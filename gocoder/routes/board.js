var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();

router.get('/list', function(req, res, next){
    res.redirect('/board/list/1');
})
router.get('/list/:page', function(req, res, next){
    var page = req.params.page;
    var sql = "select idx, name, title, hit, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate from board";
    conn.query(sql, function(err, rows){
        if(err) console.error("err: " + err);
        res.render('list', {title: '게시판 리스트', rows:rows});
    });
});

router.get('/write', function(req, res, next){
    res.render('write', {title: "게시판 글 쓰기"});
});

router.post('/write', function(req, res, next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];

    var sql = "insert into board(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),?,0)";
    conn.query(sql,datas, function(err, rows){
        if(err)console.error("err: " + err);
        res.redirect('/board/list');
    });
});

router.get('/read/:idx', function(req, res, next){
    var idx = req.params.idx;
    // 상세 조회시 조회수 1 카운트
    var sql = "update board set hit=hit+1 where idx = ?";    
    conn.query(sql,[idx], function(err){
        if(err) console.error("err: " + err);
    })
    // 상세조회
    sql = "select idx,name,title,content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, date_format(regdate, '%Y-%m-%d %H:%i:%s')regdate, hit from board where idx = ?";
    console.log("read: " + sql);
    console.log("idx: " + idx);
    
    conn.query(sql, [idx], function(err, data){
        if(err)console.error("err: " + err);
        res.render('read', {title: "글 상세조회", data:data[0]});
    })
});

router.post('/update', function(req, res, next){
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name, title, content, idx, passwd];
    
    console.log("datas:  " + datas);
    var sql = "update board set name=?, title=?, content=?, modidate=now() where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result){
        if(err) console.error("err: " + err);
        if(result.affectedRows == 0){
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }else{
            res.redirect('/board/read/' + idx);
        }
    });
});

router.get('/page/:page', function(req, res, next){
    var page = req.params.page;
    var sql = "select idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate, hit from board";
    conn.query(sql, function(err, rows){
        if(err) console.error("err: " + err);
        res.render('page', {title: '게시판 리스트', rows:rows, page:page,
            length:rows.length - 1, page_num:10, pass:true});
    });
});

router.post('/delete', function(req, res, next){
    var idx = req.body.idx;
    var passwd = req.body.passwd;
    var datas = [idx,passwd];

    var sql = "delete from board where idx=? and passwd=?";
    conn.query(sql, datas, function(err, result){
        if(err) console.error("err: "+ err);
        if(result.affectedRows == 0){
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }else{
            req.redirect('/board/list/');
        }
    });
});

module.exports = router;