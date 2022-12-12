#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
echo "======building======"

npm run docs:build

echo "======building-complete======"



# 添加文件到git
echo "======deploy======"

git add .

# 提交

git commit -m "auto-deploy"

# 推送到gitee（配置了仓库镜像，会同步到GitHub）

git push git@gitee.com:java-navigation/Java-Navigation.git main

echo "======deploy-complete======"
