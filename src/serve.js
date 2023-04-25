const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const { koaBody } = require('koa-body')
const static = require('koa-static')
const { v4: uuidv4 } = require('uuid')
const { verifyToken } = require('./token/token')

const goods = require('./router/goods/goods')
const login = require('./router/login/login')
const admin_user = require('./router/admin_user/admin_user')

const serve = new Koa()
const router = new KoaRouter()

serve.use(static(path.resolve(__dirname + '/public')));

serve.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, './public'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      // 保持文件路径
      let dir
      // 获取文件后缀
      let ext = file.newFilename.split('.');
      ext = ext[ext.length - 1]
      switch (name) {
        case 'image':
          dir = path.join(__dirname, './public/image/')
          break;
        case 'audio':
          dir = path.join(__dirname, './public/audio/')
          break;
        case 'lyrics':
          dir = path.join(__dirname, './public/lyrics/')
          break;
      }
      const fileName = 'niwaiyinyue_' + uuidv4() + '.' + ext
      file.newFilename = fileName
      file.filepath = dir + fileName
    },
    onError: (error) => {
      console.log('上传出现错误：', error);
    }
  }
}));

serve.use(router.routes());
serve.use(login.routes(), login.allowedMethods());
serve.use(goods.routes(), goods.allowedMethods());
serve.use(admin_user.routes(), admin_user.allowedMethods());

router.get('/', async ctx => {
  ctx.body = {
    title: "mall-server",
    describe: "服务端接口"
  }
});

serve.listen('9209',() => {
  console.log("服务器已启动：http://127.0.0.1:9209");
})