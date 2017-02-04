# 基于VsCode打造Markdown编辑器

## 安装VsCode

下载地址：[https://code.visualstudio.com/](https://code.visualstudio.com/)

## 安装插件

1. markdownlint  
    用来检测markdown格式是否正确，给出修改的提示。  
    微调一下配置，通过菜单 `文件->首选项->用户设置` 打开配置文件后输入如下内容：

    ```json
    // 将设置放入此文件中以覆盖默认设置
    {
        "markdownlint.config": {
            "default": true,                //继承默认设置
            "MD009": {"br_spaces": 2},      //尾部强制换行的两个空格不作为错误
            "MD013": false                  //不强制每行80字符以内
        }
    }
    ```

1. paste image  
    可以直接从剪贴板粘贴图片，方便截屏后插入markdown文件。
1. vscode-icons  
    文件图标，安装后通过 `文件->首选项->文件图标主题->VSCode Icons` 启用
1. vim  
    在编辑器中启用VIM的编辑操作。（习惯了VIM高效）

## 编辑Markdown文件

1. 打开md文件
1. 按照Markdown语法输入内容，如果格式不对会有提示，按照提示修改即可。

## 附录

1. Markdown语法说明 [https://github.com/adam-p/markdown-here/wiki](https://github.com/adam-p/markdown-here/wiki)