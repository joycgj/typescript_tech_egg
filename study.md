# 视频简介

1个项目学会TypeScript核心基础语法

https://www.bilibili.com/video/BV12P411E79E/?share_source=copy_web&vd_source=59203eaa2a5b43acef991f52c90c9743

通过一个简单的添加行和删除行来讲解Typescript，介绍了
- class 
- interface 
- ? 
- as(断言) 
- 联合类型 |
- Promise<T> 泛型
- const response: Response let message: string 声明类型

# repo

https://gitee.com/eggtoopain/type-script-tutorial/

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


# 他们两个的区别是什么

```
ev.target as HTMLAnchorElement <HTMLAnchorElement>ev.target
```

好问题 👍，这两个写法在 TypeScript 里都可以用来做 **类型断言 (Type Assertion)**，但是它们之间有一些细微区别。

---

## 🔹 两种写法

1. **`as` 语法（推荐）**

   ```ts
   ev.target as HTMLAnchorElement
   ```

   这是 **TypeScript 标准推荐的断言语法**。
   它只在 TypeScript 编译阶段生效，编译成 JavaScript 后会被完全去掉。
   👉 在 JSX/TSX（比如 React）里，只能用 `as`，不能用尖括号写法。

---

2. **尖括号语法**

   ```ts
   <HTMLAnchorElement>ev.target
   ```

   这是早期 TypeScript（借鉴 C#/Java 的语法）里常见的断言写法。
   **限制**：如果你在 `.tsx` 文件里用 React，会和 JSX 标签 `<div>...</div>` 冲突，编译器就分不清你是想写断言还是 JSX。
   所以在 React 项目中通常不用这种写法。

---

## 🔹 二者的效果对比

举例：

```ts
function handleClick(ev: MouseEvent) {
  const anchor1 = ev.target as HTMLAnchorElement;  // ✅ 推荐
  const anchor2 = <HTMLAnchorElement>ev.target;    // ✅ 也可以（但不推荐）
  
  console.log(anchor1.href);
  console.log(anchor2.href);
}
```

编译成 JavaScript 后，两种写法都会变成：

```js
function handleClick(ev) {
  const anchor1 = ev.target;
  const anchor2 = ev.target;
  console.log(anchor1.href);
  console.log(anchor2.href);
}
```

也就是说 **运行时没有区别**，只是编译器在检查时知道 `anchor` 是 `HTMLAnchorElement`。

---

## 🔹 总结

| 写法    | 说明                               | 是否推荐               |
| ----- | -------------------------------- | ------------------ |
| `as`  | TypeScript 官方推荐写法；不会与 JSX 冲突；更现代 | ✅ 推荐               |
| `<T>` | 老写法；和 JSX 冲突；在纯 TS 文件中可以用        | ❌ 不推荐（除非是非 JSX 项目） |

---

👉 一句话：
**功能一样，`as` 更通用，React/JSX 里必须用 `as`。**

---

要不要我给你整理一份 **“TypeScript 里类型断言、类型守卫、类型缩小”的区别总结”**？这样你能更系统地区分 `as`、`typeof`、`instanceof`、`in`、类型守卫函数等用法。

