module.exports = (function() {
    return {
        local:{
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'samsung1',
            database: 'nodedb'
        },
        real: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        staging: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
    }
})();