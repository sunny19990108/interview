const http = require('http');
const childProcess = require('child_process');


const server = http.createServer((req,res) => {
    if(req.url === '/get_sum') {
        console.info('主进程 id', process.pid)

        // 开启子进程
        const computeProcess = childProcess.fork('./compute')
        computeProcess.send('开始计算')

        computeProcess.on('message', (data) => {
            console.info('主进程接受到的信息：', data)
            res.end('sum is ' + data)
        })

        computeProcess.on('close', () => {
            console.info('子进程因报错而退出')
            computeProcess.kill()
            res.end('error')
        })

    }
})

server.listen('3000',() => {
    console.info('http://localhost:3000')
})
