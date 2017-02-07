# 代码版本管理-Git快速入门

## 安装

1. Git for windows <<https://git-scm.com/download/win>>
1. TortoiseGit <https://tortoisegit.org/>

> **以下内容依据TortoiseGit整理，部分语义和原始Git不一样。**

## 文档

1. Git命令行手册 <https://git-scm.com/docs>
1. 《Pro Git》中文第2版 <https://git-scm.com/book/zh/v2>

## 基础概念

1. 仓库(repository)：就是包含.git目录的项目目录。可以在本地也可以在远端。每个项目一个库。
1. 提交(commit)：把修改的代码保存到本地仓库。每次commit都会分配一个id来代表这次commit。
    每当文件修改了就可以通过`git add`把文件加入到暂存区，然后一起commit。
1. origin：仓库clone时或手工设置的远端仓库，多人协作时通过origin合并代码。
1. push：把本地仓库的修改推到指定的仓库。
1. pull：从远端指定的仓库获取最新代码到本地，并与本地代码合并。
1. fetch： 从远端指定仓库获取最新代码但不合并，稍后手工处理。
1. 分支：代码隔离方案，对文件的修改只影响当前分支。其余分支不受影响。
1. merge：在A分支上merge分支B，那么会把B分之上和A分支上不一样的地方合并到一起，最终结果保存在A分支上。
1. rebase：在A分支上基于B分支进行rebase，相当于把B分支上所有A分支和B分支分叉之后的commit先提交到A分支，
    然后再把A分支上自从分叉之后的commit提交一遍，最终结果也是两个分支合并后保存在A分支上。
    其和merge不一样的地方是所有commit经过这么处理后必然是线性的了，分支图上不会出现分叉。
1. 冲突(conflicts)：分支合并时同一个文件如果在两个分支上都修改了，那么就会产生冲突，需要手工把两部分的修改合并到一起。
1. checkout: 切换分支。如果加上参数，那么可以在切换的时候同时创建分支。
1. diff:对比两个指定版本的差异。
1. log：查看提交历史。
1. tag:给某次commit起一个有语义的名称，方便查找。

## TortoiseGit基本操作

1. 创建仓库：  
    创建一个目录，在文件夹右键弹出菜单中选择：`Git create repository here`。
1. 添加文件：  
    在要添加的文件上右键弹出菜单中选择，`TortoiseGit->Add`。
1. 本地commit：  
    在文件或者文件夹空白处右键，`Git commit`，在弹出对话框输入注释后完成提交到本地repository。
    * 可以双击要提交的文件，看下点击的文件修改了哪些内容。
    * 如果本次提交和上次提交可以合并，那么提交时可以勾选`Amend Last Commit`，把上次提交合并到本次提交，
        注释内容改成包含这两次提交的，这样可以避免琐碎的提交在log上很乱。
1. 合并commit：
    在空白处右键`TortoiseGit->Show log`触发弹出窗口，选择需要合并的多个commit，
    右键菜单，`combine to one commit`(如果所选择的commit跨分支不能合并，这个菜单不会显示）。
1. 查看修改：  
    * 在文件上右键：`TortoiseGit->diff`，会弹出窗口显示这个文件和最后一次提交的差异。
    * 在目录上右键，会弹出所有修过的文件列表，双击某个文件就可以查看这个文件的修改。
    * 任意两个文件比较：选择一个文件后，选diff later，然后再选一个文件，可以比较这两个文件。
    * Working tree和前面任意一次commit比较：show log，选择commit，右键`Compare with working tree`，
    在弹出的对话框中双击要查看的文件就可以看到这两个版本的差异。
1. 版本回退：
    * 某个文件回退：
        * 在要回退的文件上右键，`Revert`就可以回到上一个版本
        * 或`Show log`后选中某次commit，在下方的文件变更列表中选择要回退的文件，在文件名上右键，执行`Revert to this revision`， 
        则文件回退到指定版本。此时文件变为修改了的状态，要再次commit到仓库。
    * 整个分支回退到某个commit：`Show log`后选中某个commit，在上方commit列表中选择要回退到的目标commit，在commit的名称上右键，
    执行`Reset master to this`，根据需要选择reset type，则master分支会回退到此commit。reset type有三种：
        * soft： head指向指定的commit；暂存区的修改保持不变；工作区的修改保持不变
        * mixed(默认值)：head指向指定的commit；暂存区的文件被指定commit上的文件覆盖；工作区的文件保持不变，如果有修改，需要再次add到暂存区后commit。[暂存区的概念前面没讲，待补充]
        * hard： head指向指定的commit；暂存区的文件被指定commit上的文件覆盖；工作区的文件被指定commit上的文件覆盖
        TODO:配合git status命令验证三种类型的区别。
    * 回到未来：当整个分支回退后到某个commit后，通过`show log`就无法看到这个commit之后的commit了，
    那么如果想跳转到这些看不到commit，那么在项目目录的空白处右键，`show reflog`可以看到按照日期倒序的所有操作，包括commit的id，执行的action，
    在要跳转的commit上右键，`reset master to this`就可以跳转到指定的commit了。
1. 删除文件：  
    右键菜单`TortoiseGit->delete file`
1. 打标签：
    * 创建：选择要创建tag的commit，create tag at this revision，输入标签名称和message后就可以了。一个commit可以创建多个标签。
    * 删除: show log，选择要删除tag的commit，delete tag。
1. 创建分支：右键菜单Create branch。
1. 切换分支：右键菜单Switch branch。
1. 合并分支：
    * merge:
    * rebase:（rebase之前建议做这个操作，避免冲突的时候，一个commit一个commit的改要崩溃）
1. 解决冲突：
1. 临时保存：
1. 关联远端仓库：
1. clone项目：
1. 合并远端仓库修改：
1. 获取远端仓库修改但不合并：

### 右键和双击

TortoiseGit很多操作在弹出菜单或者弹出的对话框中，使用时多用右键和双击来打开。

## Git flow

1. Git flow是一种git分支管理方案，参见 [Git flow(AVH version)版本管理模型研究](../../020502learn_gitflow)
1. 还有其它的分支管理模型（GitHub flow、GitLab flow等）
