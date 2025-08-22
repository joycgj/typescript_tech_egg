# 初始化工程步骤
npm create vite@latest typescript_tech_egg

> npx
> create-vite typescript_tech_egg

│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript
│
◇  Scaffolding project in /Users/cgj/stock_work/typescript_tech_egg...
│
└  Done. Now run:

  cd typescript_tech_egg
  npm install
  npm run dev


# 报错信息解决方案

刚开始没有使用vite，直接写ts文件，会报错，以下是GPT的回答，我使用了2. 使用 **打包工具 (推荐 Vite/Webpack/Parcel)**

```
Refused to execute script from 'http://127.0.0.1:5501/script.ts' because its MIME type ('video/mp2t') is not executable.
```

原因是：**浏览器不认识 TypeScript (`.ts`) 文件**，它只能执行 JavaScript (`.js`) 文件。浏览器看到 `.ts` 扩展名时，会把它当成一种视频流格式（MPEG-2 TS，MIME type `video/mp2t`），所以拒绝执行。

---

### ✅ 解决方法

你有几个选择：

#### 1. 使用 **TypeScript 编译器 (tsc)**

把 `script.ts` 编译成 `script.js`，然后在 HTML 里引用编译后的 `script.js`：

```bash
npx tsc script.ts
```

生成的 `script.js` 放在同目录下，在 HTML 引入：

```html
<script src="script.js"></script>
```

---

#### 2. 使用 **打包工具 (推荐 Vite/Webpack/Parcel)**

现代前端不会直接在浏览器里加载 `.ts`，而是用打包工具把 TS 转成 JS。

比如用 **Vite**：

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

然后把你的 `script.ts` 放进去，Vite 会自动处理。

---

#### 3. 用 **ts-node-dev 或者 live-server + tsc --watch**

本地开发时可以开两个进程：

* 一个跑 `tsc --watch` 自动把 `.ts` 转成 `.js`
* 一个用 `live-server` 或者 VSCode 的 Live Server 插件来运行 HTML

---

#### 4. 如果只是测试，可以用 CDN (tslib + transpiler)

也可以在 HTML 里用 `es-module-shims` + `typescript` 的在线编译器（不推荐生产用）：

```html
<script async src="https://unpkg.com/es-module-shims"></script>
<script type="importmap">
{
  "imports": {
    "typescript": "https://esm.sh/typescript"
  }
}
</script>
<script type="module">
  import * as ts from "typescript";
  // 动态编译TS，但性能差，只适合实验
</script>
```

---

👉 总结：**浏览器不能直接执行 `.ts` 文件**，你需要先编译成 `.js`，或者用 Vite 这种工具来自动处理。

---

要不要我帮你写一个 **最小可运行的 Vite + TypeScript demo 工程结构**，这样你只需要 `npm install && npm run dev` 就能跑？

