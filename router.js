const router = require("koa-router")();

const user = require('./routes/user');
const project = require('./routes/project');
const source = require('./routes/source');

// 指定一个url匹配
router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})

router.use('/user', user.routes());
router.use('/project', project.routes());
router.use('/source', source.routes());

module.exports = router;