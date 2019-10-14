#!/bin/bash
# 编译脚本
rm -rf build
bun r

mv build/static/index.html build/
rm -rf ./output && mkdir ./output && cd ./build && tar -zcf ../output/dist.tar.gz ./* && cd ..

echo "*****  build end  *****"