Usage Tutorial for MSA Card Image Replacement and Interface Translation Script

By：黑客是我

Please see the image and text version at [Readme(Illustrated version).docx].

这篇教学由【MSA卡图替换及界面翻译脚本使用教学.docx】翻译而来，也许有翻译不当之处请谅解，如果有哪儿一部分讲解不明白，请查阅中文原版文档。

This tutorial is translated from [MSA 卡图替换及界面翻译脚本使用教学.docx]. Please forgive any inappropriate translations. If there are any parts that are not clearly explained, refer to the original Chinese document.
 
MSA(MobileSuitArena)：
https://mobilesuitarena.com/
Tampermonkey: Must be installed; alternatively, you can use a browser with native support for scripts.
Install it using [前置文件]/[篡改猴.zip] (located in the [前置文件] folder) or via the Google Chrome Web Store.
https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
Python: No mandatory installation required. If you want to modify the content of [GCG.py] or [MSA.exe] according to your own needs/ideas, please install Python and then refer to the tutorial.
https://www.python.org/downloads/
Preface:
This script operates independently outside of MSA (MobileSuitArena, referred to as MSA for short hereinafter). It has no affiliation with the original game developers or the holders of the Gundam IP, and is solely intended to provide localization-adaptive services while playing MSA.
The content replaced by the script includes in-game buttons, logs, main interface language, and card image files. The replaced content is only displayed locally and does not involve the game’s own data files; therefore, what your game opponents see will still be the content shown on their screens.
There are two versions of the script plugin. During gameplay, you only need to select and install one version for use—there is no need to install and enable both at the same time. The only difference between these two scripts lies in the source of the replaced card images; all other content is identical.
The content replaced by the two original script files I provide is [EN→中文]. If you are a non-Chinese-speaking player, please follow Step? of this tutorial to modify the file content before use.
This project is open-source and non-profit, so please do not commercialize it. MSA’s servers have no regional restrictions—no matter where you are, you can play games with players from China, the United States, Japan, South Korea, and other regions from the comfort of your home. Unfortunately, the only original language of MSA is English. For this reason, I developed this script in the hope of helping more players who, like me, face language barriers and are not proficient in English to play MobileSuitArena smoothly and practice GCG to get through the novice phase.
Simply follow the tutorial below, and it will help you localize this script, allowing you and your friends to play the game in a language you are familiar with.

File Introduction:
The files are divided into three items, and not all of them need to be used:
 
1.【前置文件】Prerequisite Files:
 
MobileSuitArena 在线卡图替换+界面翻译-0.0.3.user.js
(Online Card Image Replacement + Interface Translation)
MobileSuitArena 本地卡图替换+界面翻译-0.0.3.user.js
(Local Card Image Replacement + Interface Translation)
GCG.py
python-3.14.1-amd64.exe（Python Installation Package）
篡改猴 5.4.1.zip
（Tampermonkey Plugin, Compatible with Chrome）
msa_icon.ico
（Icon Files, replaceable with your preferred ones）
GCG-logo.ico
（Icon Files, replaceable with your preferred ones）
2.【MSAcard】
 
The Chinese version card images for GD01-02 and ST01-06 are only used when launching the local replacement script. The images are sourced from GCG official website data, official posters, and other materials. If there is any infringement, I will delete them immediately.
Do not modify the names of folders, card packs, or card image files during use; otherwise, they will not be recognized. The card image files are [.webp] files, and other formats are not supported.
For alternate art card images: if you have a preferred card face, you can rename it and place it in the corresponding folder.
3.MSA.exe
 
This is used only when the local replacement script is in use. It is packaged and created with [GCG.py], and the software icon is sourced from the header image of the MSA webpage.
The MSA webpage will open automatically upon launch. Do not close the window during use; otherwise, the images cannot be read. You can close it using the shortcut key [Ctrl+C].

Usage Instructions:
First, ensure that you are using a browser that supports the 【Tampermonkey】 plugin, such as Chrome (Windows), X Browser (Android), Lemur Browser (Android), Safari (iOS), etc. Select a suitable browser based on the device you usually use, then drag the 【.user.js】 file I provided into the 【Tampermonkey】 plugin to complete the installation.
Installing the 【Tampermonkey】 Plugin: Take Chrome as an example.
1. Open the Chrome browser and enter 【chrome://extensions/】 in the address bar.
 
2. Enable [Developer mode] in the upper right corner, then drag [篡改猴.zip] into this page or select [Load unpacked] in the upper left corner.
 
3. If the Tampermonkey Plugin installation via the compressed package file fails, you can use the Tampermonkey Plugin link from the Chrome Web Store at the top of the tutorial to install it online.
4. Open the Tampermonkey Plugin page, drag [MobileSuitArena 在线卡图替换.user.js] and [MobileSuitArena 本地卡图替换.user.js] from the Prerequisite Files into the page, then select [Select].
Finally, according to the script version you are using, enable it as follows.
1. Online Card Image Replacement Version
The script marked [在线] can be used directly after installation. It will automatically replace the content when you open the game, with no additional operations required.
It is compatible with all browsers that support Tampermonkey scripts. No external files or extra operations are needed—suitable for both computer and mobile users.
After the script is activated, it will replace the in-game buttons, interface language, and other elements with Chinese. The game card images will be loaded from the Gitee server I built. This Gitee server includes Chinese versions of the original card faces for all currently usable cards in the game.
2. Local Card Image Replacement Version
The script marked [本地] requires you to run the [MSA.exe] file after installation; a pop-up window will automatically appear to launch the game.
It can only be used on Windows platforms (by launching MSA.exe) or devices that support Python (by launching GCG.py). As cross-domain file reading is required, this script is not recommended for mobile users—using it on mobile devices will be extremely cumbersome.
[MSA.exe] must be placed in the same directory as a folder named [MSAcard]. Within the [MSAcard] folder, create subfolders according to the official card pack numbers to store your card image files (do not modify the folder names, otherwise they will not be recognized).
Due to security protocols, modern commonly used browsers cannot directly read local files. The purpose of [MSA.exe] is to identify the [MSAcard] folder, deploy it as a local HTTP server, and enable cross-domain reading of card images.
Currently, each card in the game can only have one card face. To replace a card image in the game, simply rename and overwrite the file with the corresponding label. For example, the default card image for [Gundam RX78-2 GD01-001] is [GD01-001.webp]; to replace it, rename [GD01-001-ALT1.webp] from [异画卡图] to [GD01-001.webp] and overwrite it to [MSAcard]/[GD01]. Note that filenames are case-sensitive during renaming—if the name is incorrect, the game will fail to recognize the image during loading.

Non-Chinese players please continue to refer to the following modification tutorial:
This section of the tutorial is only applicable to players who need to modify scripts or launchers; there is no need to read it during normal gameplay.

General Section for Online/Local Script Modification
The text and language in the game can be modified in the [// 界面汉化 EN→中] section of the script. After installing the script, open the Tampermonkey Plugin to view the script (or use Notepad as an alternative), then replace the Chinese content on the right side of the diagram with the language text you need. If you want to add the original in-game text for comparison, start a new line and add it in the format of ["":"",]. For example, to translate [Gundam] into [高达], write ["Gundam":"高达",] in this section.
 

Online
The card image source section is located at [// 卡图替换]. Simply replace the line of link I marked with your own image library link.
 
When creating an image library, you can use GitHub or any method you are familiar with. Below is a method for creating an image library on GitHub or Gitee for reference.
Create a new project repository, create folders corresponding to the card packs in the format shown in the figure, and upload your card image files. The naming and file type of the card images must follow the format of [GD01-001.webp]. Finally, copy your repository link and replace the original one.
   

Local
If you have modified the language text according to the general section and still want to replace the card images, simply replace the files in each card pack directory within [MSAcard] with your own images.
Note that the images must be genuine [.webp] files; merely renaming the suffix of files in formats like jpg or png to webp will not work, and filenames and suffixes are case-sensitive.
 
If the above content is insufficient for your needs and you wish to modify certain settings of [MSA.exe], be sure to install Python before proceeding. Below is a Python installation tutorial for Windows; for Android and other platforms, please refer to online resources.
1.Open the Python installation package in the files or the link at the top to install it.
2.Check [Add Python to PATH] during installation.
[MSA.exe] and [GCG.py] are essentially the same thing—I just packaged the py file into an exe file for the convenience of Windows users who have not installed Python. If you want to modify this file, you can open [GCG.py] with Notepad, edit the content, save it, and then repackage it into an exe file.
The port of the local server I set is [8080]. If it conflicts with your commonly used port, you can modify the port in the [GCG.py] file. Similarly, you can also modify the name of the folder to be read and other information; the specific content has been marked in the py file.
 
After completing all modifications, package the py file into an exe file to use it on Windows.
1.Install PyInstallerPress [Win+R] to open [cmd], then enter [pip install pyinstaller].Close the cmd window after installation.
2.Create a folder and place [GCG.py] and an icon file in ico format (optional) into it.
3.Enter [cmd] in the address bar of the folder you just created.
 
Enter [pyinstaller --onefile --icon=msa_icon.ico GCG.py] in cmd and wait for the execution to complete.
In the command, msa_icon.ico and GCG.py are your file names, which can be modified according to your actual files.
After packaging is complete, open [dist] and you will find your exe file—all other files can be deleted.
 
 
Now you have fully mastered how to modify the scripts and launchers—go ahead and create a familiar gaming environment for your friends!

Below are some screenshots of the game scripts when running normally, and the effects are consistent between the Online and Local versions.
主界面Home
 
 
 
游戏界面Game、Play
 
 
详细卡图、设置等Card、Set、Log
   
    
结束画面End
   
替换能源、EX能源、EX基地时的截图Screenshots when replacing Resource, EX Resource, and EX Base
 
Notes
If the game cards still show the original English images after completing all the above steps, having the correct file formats, and starting the game in sequence, follow these steps to clear Chrome's cache:
1.Open Chrome and click the three vertical dots (More) in the top-right corner 
2.Select Settings from the dropdown menu 
3.Scroll down and click on Privacy and Security in the left sidebar 
4.Under the Privacy and Security section, click on Clear Browsing Data 
5.In the dialog that appears, check the box next to "Cached images and files"
6.From the Time range dropdown, select All time 
7.Click the Clear Data button at the bottom of the dialog 
After clearing the cache, restart the game to see the updated card images.
 
If you encounter other errors, press [F12] to open the browser's developer tools and check the details of the error items.
 
If the replaced card images fail to load, or if you need to view the original English card images, disable the Tampermonkey script, restart the web page, and the original card images will be displayed normally.
