// require로 원하는 인스턴스를 받아 사용할 수 있게 함.
var express = require('express');
// express 프레임워크 라우터를 사용하기 위해 변수를 선언.
var router = express.Router();

// 라우터는 URI 요청에 응답하는 방식을 말함.
router.get('/', function(req, res, next){
    res.render('form', {
        name:'Lee Jin Hyun',
        blog:'gocoder.tistory.com',
        homepage:'gocoder.net'
    });
});
router.post('/', function(req, res, next){
    res.json(req.body);
});

// global 전역으로 해당 라우터를 사용하게 해줌.
module.exports = router;