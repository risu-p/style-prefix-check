# README

描述：检查项目中所有 .less 中 prefix 的定义是否重复，避免样式冲突



## 注意事项

该脚本检测的是`.less`文件中的`@prefix: ~'Loading';` 定义，例如：

```less
@prefix: ~'Loading';

.@{prefix} {
	position: absolute;
  ...
  
  &-body {
    ...
  }
}
```

如果更改为`@prefix243` 或其它名字则无法检测



## 使用方法

1. `yarn add -D style-prefix-check`：将该仓库安装为dev依赖
2. 在`commit`时，执行脚本检测：`node node_modules/.bin/prefix-check --dir=src`

`--dir`：指定要检测的文件夹路径

例如`husky`提供了`pre-commit`生命周期，让我们可以在这里执行提交前的检测：

```js
"husky": {
  "hooks": {
    "pre-commit": "node node_modules/.bin/prefix-check --dir=src && lint-staged",
  }
},
```



## 项目开发

1. `yarn`：安装依赖
2. `yarn build`：编译
3. `yarn run`：运行编译后的文件



## 项目发布

1. 升级版本号
2. 阅读新人文档，检查是否正确配置npm发布源为公司
3. `npm publish` 

