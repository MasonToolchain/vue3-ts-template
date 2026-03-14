# VSCode TypeScript 报错排查清单（项目正常但编辑器报错）

## 0) 先判定：项目问题还是编辑器问题

- [ ] 在项目根目录运行：
  - [ ] `npx tsc -p tsconfig.json --noEmit`
  - [ ] 或 `npx tsc -p tsconfig.node.json --showConfig`
- [ ] 判定：
  - [ ] 命令行通过、VSCode 报错 → 编辑器/TS Server问题
  - [ ] 命令行也报错 → 项目配置或依赖问题

---

## 1) 版本与依赖检查

- [ ] `npx tsc -v`
- [ ] `pnpm ls typescript`（或 npm/yarn 对应命令）
- [ ] 检查报错依赖是否已安装（例：`pnpm ls @tsconfig/node24`）
- [ ] 依赖异常时执行安装：`pnpm install`

---

## 2) VSCode 必做三步

- [ ] `TypeScript: Select TypeScript Version` → `Use Workspace Version`
- [ ] `TypeScript: Restart TS Server`
- [ ] `Developer: Reload Window`

---

## 3) 工作区与目录检查

- [ ] 确认 VSCode 打开的是项目根目录（不是上级目录）
- [ ] 若是 multi-root workspace，确认当前文件属于正确 root
- [ ] Monorepo 场景确认子包依赖和 tsconfig 引用链正确

---

## 4) tsconfig 继承链检查

- [ ] `extends` 路径正确（如 `@tsconfig/node24/tsconfig.json`）
- [ ] 文件名/后缀拼写无误
- [ ] JSON 无中文符号或隐藏字符
- [ ] 用 `--showConfig` 验证最终合并结果

---

## 5) 模块解析与包管理器相关

- [ ] `moduleResolution` 与构建工具匹配（Vite 通常 `bundler`）
- [ ] lockfile 与 node_modules 一致
- [ ] Pnpm/Yarn PnP 场景确认 VSCode 可正确解析依赖

---

## 6) 插件干扰排查

- [ ] 临时禁用可疑扩展（TS 增强、路径接管、Lint 接管类）
- [ ] Vue 项目优先使用 Volar，禁用 Vetur
- [ ] 重启 VSCode 后复测

---

## 7) 缓存清理（顽固问题）

- [ ] 关闭 VSCode
- [ ] 删除 `node_modules`
- [ ]（可选）删除 lock 文件后重装
- [ ]（可选）删除 `.vscode` 中异常配置
- [ ] 重新安装依赖并重新打开项目

---

## 8) Vue 项目专项

- [ ] 运行 `vue-tsc --noEmit` 对比 VSCode 报错
- [ ] 检查 `tsconfig.json / tsconfig.app.json / tsconfig.node.json` 引用关系
- [ ] 确保 Volar + workspace TS 组合生效

---

## 9) 最终判定标准

- [ ] `npx tsc` / `vue-tsc` 通过
- [ ] `vite build` 可成功
- [ ] 若仅 VSCode 报错，可判定为编辑器显示性问题

---

## 10) 快速修复模板（按顺序）

- [ ] `pnpm install`
- [ ] VSCode 切换到 workspace TypeScript
- [ ] Restart TS Server
- [ ] Reload Window
- [ ] `npx tsc -p tsconfig.node.json --showConfig`
- [ ] 若仍仅 VSCode 报错：先继续开发，后续做编辑器清理

---

## 当前项目结论（可选记录）

- [x] `@tsconfig/node24` 已安装
- [x] `npx tsc -p tsconfig.node.json --showConfig` 正常
- [x] 配置无问题，属于 VSCode/TS Server 侧问题
