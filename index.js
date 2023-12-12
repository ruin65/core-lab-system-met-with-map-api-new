import express from 'express';


const app = express();
const port = process.env.PORT || 3000;


// 中间件来解析 JSON 格式的请求体
app.use(express.json());

// 静态文件目录，用于提供静态资源，例如 HTML、CSS 和 JavaScript 文件
app.use(express.static('public'));

// 处理根路径请求，并路由到主页面
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle POST requests for location display
app.post('/submit-location', (req, res) => {
  console.log(req.body);
  let exhibitName = req.body.exhibitName;
  let latitude = parseFloat(req.body.latitude);
  let longitude = parseFloat(req.body.longitude);

  // 这里可以添加更多的处理逻辑，例如检查坐标的有效性

  const response = {
      message: `Location for ${exhibitName} received successfully.`,
      location: { latitude, longitude }
  };
  
  res.json(response);
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});





import cors from 'cors';
app.use(cors());