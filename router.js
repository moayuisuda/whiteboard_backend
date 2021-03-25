const router = require("koa-router")();

const user = require('./routes/user');
const project = require('./routes/project');

// 指定一个url匹配
router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})

router.use('/user', user.routes());
router.use('/project', project.routes());

module.exports = router;