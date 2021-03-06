# 代码编辑器VSCode

## 介绍

1. 官方网站：<https://code.visualstudio.com>
1. 关键字：代码高亮、智能感知、插件支持、MS出品
1. VsCode以文件目录的形式组织代码文件。也支持`tsconfig.json`、`package.json`等格式的项目配置文件。

PS:Vscode版本更新比较快，每次都会提升很多，以下操作可能与最新版本有一定出入。

## 基础

1. 启动
    - 在终端窗口输入`code .`就会打开当前文件夹启动VsCode。
    - 或者启动VsCode后通过菜单 `文件->打开文件夹` 来打开项目。
    - 如果无参数启动默认会打开上次的工作内容。

1. 布局  
    - 侧边栏  
        - **Ctrl+B** 展开或者收起
        - 资源管理器：查看当前打开的文件、当前目录；进行新建、复制、移动、重命名等操作；可过滤要显示的文件。
        - 搜索：在所有文件中搜索指定内容。可以设定是否区分大小写、是否使用正则表达式。
        - GIT：可进行GIT版本管理操作。要求已经安装了GIT。
        - 调试：可以查看当前变量、监视变量、回调、断点。
        - 扩展：可以搜索能够安装到VsCode的扩展插件。
    - 编辑区  
        - 默认打开一个编辑区。**Ctrl+\\** 可以分割编辑区，**Ctrl+W**关闭当前文档。
        - 最多支持同时呈现3个编辑区。**Ctrl+1,2,3**来切换。
        - 每个编辑区可以打开多个文件。
        - **Ctrl+=** 放大内容 **Ctrl+-** 缩小内容
        - 拖动编辑区标题可以改变顺序
    - 状态栏
        - 左下角显示错误警告，点击可以查看详情。
        - 右下角显示光标所在行列、文件字符编码、文件内容类型
    - 面板
        - 集成终端：直接在当前文件夹打开一个命令行交互终端，**Ctrl+\`** 打开或关闭。
        - 调试控制台：调试时输入命令。
        - 问题面板：编译时的问题和警告。**Ctrl+Shift+M**打开或关闭。
        - 输出面板：任务执行时输出的信息、Git的输出信息、扩展的输出信息。
        - **Ctrl+J** 打开上次使用的面板；或者关闭面板。（终端面板要把光标移回编辑区后快捷键才能生效）

## 自定义配置

1. 通过菜单：`文件->首选项`可以进行自定义配置。
1. `用户设置`影响所有的项目；`工作区设置`只影响当前项目。
1. 设置都是json格式的文件，直接修改值即可。

## 常用快捷键

1. 使用快捷键可以大幅度提高效率，要记住常用的快捷键。
1. 快捷键可能和输入法的快捷键冲突，需要调整VsCode的快捷键或者输入法的快捷键。  

### 通用编辑操作

    |按键组合|效果|   |按键组合|效果|
    |--------|----|---|--------|----|
    |Ctrl+X|剪切一行或者选中的内容| |Ctrl+C|复制一行或选中的内容|
    |Ctrl+V|粘贴剪贴板内容||Shift+Delete|删除一行或选中的内容|
    |Ctrl+Enter|光标下方插入一行，并移动光标到新行首| |Ctrl+Shift+Enter|光标上方插入一行，并移动光标到新行首|
    |Alt+Up|光标行内容上移||Alt+Down|光标行内容下移|
    |Shift+Up/Down/Left/Right|选择内容||Ctrl+/|注释或取消注释一行|
    |TAB|缩进||Shift+TAB|提升|
    |Ctrl+F|本文件内查找||Ctrl+Shift+F|所有文件内查找|
    |F3|查找下一个||Shift+F3|查找前一个|

### 编程语言编辑操作  

    因为`Ctrl+Space`被输入法占用，所以部分组合需要通过菜单`文件->首选项->键盘快捷方式`修改。
    |按键组合|效果|   |按键组合|效果|
    |--------|----|---|--------|----|
    |Ctrl+Q|提示自动补全。修改`editor.action.triggerSuggest`||Ctrl+Shift+Q|提示参数。修改`editor.action.triggerParameterHints`|
    |Shift+Alt+F|格式化代码（无需选中）||F2|符号重命名|
    |F12|跳转到定义||Alt+F12|浮动窗口查看定义|
    |Shift+F12|浮动窗口查看引用||||

### 导航操作

    |按键组合|效果|   |按键组合|效果|
    |--------|----|---|--------|----|
    |Ctrl+P|弹出输入文件名窗口，跳转至指定的文件| |Ctrl+T|跳转到某个符号（支持跨文件）|
    |Ctrl+G|跳转至某一行||Ctrl+Shift+O|跳转到某个符号（当前文件）|
    |F8|跳转至下一个错误(当前文件)||Shift+F8|跳转到前一个错误(当前文件)|
    |Alt+Left|回到上一个查看的文件(可跨编辑区)||Alt+Right|前进到下一个查看的文件(可跨编辑区)|
    |F1|激活命令输入框。可以输入控制VsCode的命令。||Ctrl+TAB|在当前编辑区的文件列表中切换文件|
    ## 编辑区
    |按键组合|效果|   |按键组合|效果|
    |--------|----|---|--------|----|
    |Ctrl+\\|分割编辑区| |Ctrl+W|关闭编辑区当前的文件。|
    |Ctrl+1,2,3|在编辑区之间切换|

### 代码片段

    - HTML文件支持EMMET(比如输入!后，按下tab就可以生成html5文档框架)
    - 当通过预定义片段生成代码后，按TAB可以在多个预定义输入区切换。

## 插件

1. 可通过侧边栏的扩展标签页安装、卸载插件。
1. 插件的开发可以参见官方网站介绍。
1. 推荐插件：  
    - AutoFileName 可以在require时自动补全路径  
    - Sort Lines 对选中代码排序 通过F1执行命令或者F9  
    - Document This 生成注释 Ctrl+Alt+D。和VIM冲突，可以用F1 Document命令来执行  
    - npm Intellisense 导入npm模块时自动补全  
    - vscode-icons 根据文件类型在侧边栏显示不同的图标  
    - vim 模拟VIM编辑的keymap  
    - paste image 写markdown的时候方面从剪贴板粘贴图片
    - markdown lint 自动检测markdown格式
    - tslint 编写typescript代码时检测格式
