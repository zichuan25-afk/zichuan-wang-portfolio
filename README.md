# 汪子川 · 舞台设计作品集

## 文件结构
```
portfolio-static/
  index.html          # 主页面
  images/             # 所有图片
    1.jpg ~ 36.jpg
  README.md           # 本文件
```

## 本地预览
直接双击打开 `index.html` 即可在浏览器中预览。

## 发布方式

### 方式一：打包发送（最简单）
将整个 `portfolio-static` 文件夹压缩成 ZIP，发给甲方/老师。
对方解压后双击 `index.html` 即可查看。

### 方式二：GitHub Pages（免费 + 有网址）
1. 注册 [github.com](https://github.com)
2. 新建一个仓库（Repository），比如叫 `portfolio`
3. 上传 `index.html` 和 `images/` 文件夹到仓库
4. 进入 Settings → Pages → Source 选择 main 分支
5. 等待几分钟，会生成一个网址：`https://你的用户名.github.io/portfolio/`

### 方式三：Netlify（免费 + 拖拽上传）
1. 打开 [netlify.com](https://netlify.com)
2. 注册/登录（可用 GitHub 账号直接登录）
3. 把 `portfolio-static` 文件夹直接拖进网页
4. 立刻获得一个网址，可以自定义域名

### 方式四：购买域名 + 服务器（最正式）
- 购买域名（阿里云/腾讯云/GoDaddy 等，约 50-100 元/年）
- 购买虚拟主机或对象存储（阿里云 OSS / 腾讯云 COS）
- 上传文件即可获得 `www.你的名字.com` 这样的专属网址
