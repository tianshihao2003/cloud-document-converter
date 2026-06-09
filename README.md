<p align="center">
  <p align="center">
   <img width="150" height="150" src="apps/chrome-extension/design/logo.svg" alt="Logo">
  </p>
	<h1 align="center"><b>Cloud Document Converter</b></h1>
</p>

Cloud Document Converter 是一个浏览器扩展，支持下载、复制飞书云文档为 Markdown。

**简体中文** · [English](./README_EN.md)

# 安装

从 [Chrome 应用商店](https://chromewebstore.google.com/detail/cloud-document-converter/ehkomhhcinhikfddnmklbloahaakploh)、[Microsoft Edge 加载项](https://microsoftedge.microsoft.com/addons/detail/pcjebkebnehplnpkpnhipagefaffiopp) 和 [Firefox 附加组件](https://addons.mozilla.org/addon/cloud-document-converter) 安装 Cloud Document Converter。

# 功能

## 核心功能

- **下载为 Markdown**：将飞书文档下载为 Markdown 文件，包含图片和附件
- **复制为 Markdown**：将飞书文档复制到剪贴板（⚠️ 图片 URL 两小时后过期）
- **查看为 Markdown**：在新窗口预览 Markdown 内容

## 下载方式

扩展提供三种下载方式，可在设置中切换：

1. **直接下载**：使用浏览器默认下载行为
2. **显示保存文件选择器**：弹出文件选择对话框，可选择保存位置
3. **保存到文件夹**：直接保存到指定文件夹，无需打包 ZIP（✨ 新功能）

### 保存到文件夹（新功能）

当文档包含图片或附件时，使用"保存到文件夹"功能可以：

- 📁 直接将 Markdown 文件和图片保存到文件夹，无需解压 ZIP
- 💾 自动记住选择的文件夹，下次下载时自动复用
- 🌐 按网站分别保存文件夹设置

**使用方法：**
1. 在扩展设置中选择"保存到文件夹"下载方式
2. 打开飞书文档，点击"下载为 Markdown"
3. 首次使用时会弹出文件夹选择框，选择后自动保存
4. 之后在同一网站下载时，会直接保存到已设置的文件夹

## 设置选项

- **语言**：支持 English 和简体中文
- **主题**：浅色 / 深色 / 跟随系统
- **表格处理**：过滤块级内容 / 转换为 HTML
- **分栏处理**：平铺 / 转换为表格 / 转换为 HTML
- **文本高亮**：保留字体颜色和背景颜色
- **图片命名**：使用 UUID 命名图片文件

# 兼容性

## 块级元素

| **飞书云文档** | **支持情况** | **Markdown** |
| --- | --- | --- |
| 分割线 | ✅ | Thematic Break |
| 标题 (一级至六级) | ✅ | ATX Headings (Level 1 to level 6) |
| 标题 (七级至九级) | ✅ | Paragraph |
| 代码块 | ✅ | Code Block |
| 引用 | ✅ | Blockquote |
| 无序列表 | ✅ | Bullet list |
| 有序列表 | ✅ | Ordered list |
| 任务列表 | ✅ | Task list |
| 表格 | ✅ | Table |
| 图片 | ✅ | Image |
| 公式 | ✅ | Math Block |
| 高亮块 | ❌ | Blockquote |
| 引用块（同步引用） | ✅ | 内联内容 |
| 图表 (流程图、UML 图) | ❌ | Image（仅下载支持） |
| 分栏 | ✅ | 展平 / 表格 / HTML |
| 多维表格 | 待定 | |
| 群名片 | 待定 | |
| 文件 | ❌ | Link（仅下载支持） |
| 内嵌网页 | ✅ | HTML |
| 小组件 | 待定 | 文本绘图 → Code Block ✅ |
| 思维笔记 | 待定 | |
| 电子表格 | 待定 | |

## 行内元素

| **飞书云文档** | **支持情况** | **Markdown** |
| --- | --- | --- |
| 加粗 | ✅ | **Bold** |
| 删除线 | ✅ | ~~Delete~~ |
| 倾斜 | ✅ | *Italic* |
| 行内代码 | ✅ | `Inline Code` |
| 链接 | ✅ | [Link](url) |
| 字体颜色 | ✅ | HTML |
| 字体背景色 | ✅ | HTML |
| 下划线 | ✅ | `<u>Underline</u>` |
| @提及 | ✅ | @用户名 |

## 其它

- 缩进和对齐：待定

# 开发

## 环境要求

- Node.js >= 22.12.0
- pnpm >= 10.15.0

## 常用命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm run build

# 类型检查
pnpm run type-check

# 运行测试
pnpm run test

# 代码检查
pnpm run lint

# 格式化代码
pnpm run format

# 扩展开发
pnpm --filter @dolphin/chrome-extension dev:pages    # 启动开发服务器
pnpm --filter @dolphin/chrome-extension build         # 构建扩展
pnpm -C apps/chrome-extension exec web-ext run --source-dir dist --target chromium  # 运行扩展

# E2E 测试
pnpm run test:e2e:install   # 安装 Playwright 浏览器
pnpm run test:e2e           # 运行 E2E 测试
```

## 项目结构

```
cloud-document-converter/
├── apps/
│   ├── chrome-extension/          # Vue 3 浏览器扩展
│   │   ├── src/
│   │   │   ├── scripts/           # 核心脚本（复制、下载、查看）
│   │   │   ├── pages/             # Vue 页面（弹窗、设置）
│   │   │   ├── common/            # 共享工具模块
│   │   │   └── components/ui/     # UI 组件库
│   │   └── scripts/cli.ts         # 构建 CLI
│   └── chrome-extension-e2e/      # Playwright E2E 测试
├── packages/
│   ├── lark/                      # 飞书文档转 Markdown 核心引擎
│   ├── common/                    # 共享工具库
│   └── typescript-config/         # TypeScript 配置预设
└── .changeset/                    # 版本变更记录
```

# 贡献

如果你有兴趣修复问题并直接为代码库做出贡献，请参阅文档 [如何贡献](./contributing.md)。

## 提交规范

使用 Conventional Commits 格式：
- `feat(scope): ...` - 新功能
- `fix(scope): ...` - 修复
- `chore: ...` - 杂项
- `refactor(scope): ...` - 重构

如果有用户可见的变更，请添加 changeset：
```bash
pnpm exec changeset add
```

# 支持我

如果你喜欢这个项目，欢迎你请我喝杯咖啡！你的支持将帮助我继续改进和维护这个项目。

[请我喝咖啡 ☕](https://lujunji.vercel.app/about)

# 免责声明

本项目（以下简称"项目"）仅供参考和学习使用。作者尽力确保项目的准确性和可靠性，但不提供任何明示或暗示的保证，包括但不限于对项目的适销性、特定用途的适用性或无侵权的保证。

作者不对因使用本项目而产生的任何直接、间接、偶然、特殊、惩罚性或结果性损害承担任何责任，包括但不限于因使用、误用、或依赖项目中的信息而导致的利润损失、业务中断或数据丢失。

本项目中的所有内容均基于作者的个人见解和经验，不代表任何组织或公司的观点。

使用者应自行承担使用本项目所产生的一切风险。在任何情况下，作者均不对使用本项目而导致的任何损失或损害承担责任。
