// ==UserScript==
// @name         MobileSuitArena 在线卡图替换+界面翻译
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  设置了Gitee为图库地址，不再从本地加载图片，改为在线加载，按键汉化调整部分翻译
// @author       黑客是我
// @match        https://mobilesuitarena.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 卡图替换
    // --------------------------
    const GITEE_CARD_BASE = "https://gitee.com/adamsadam/msacard/raw/master/cardimage/";
    const ORIGIN_CDN_BASE = "https://cdn.jsdelivr.net/gh/MobileSuitArena/images@main/";

    function getGiteeImgPath(originUrl) {
        if (!originUrl.startsWith(ORIGIN_CDN_BASE)) return originUrl;
        const subPath = originUrl.replace(ORIGIN_CDN_BASE, "");
        return GITEE_CARD_BASE + subPath;
    }

    function replaceLoadedImages() {
        const cardImgs = document.querySelectorAll('img[src^="' + ORIGIN_CDN_BASE + '"]');
        cardImgs.forEach(img => {
            const newSrc = getGiteeImgPath(img.src);
            if (img.src !== newSrc) {
                img.src = newSrc;
                img.srcset = newSrc;
                img.onerror = function() {
                    console.log(`Gitee图片加载失败，回退原地址: ${this.src}`);
                    this.src = this.src.replace(GITEE_CARD_BASE, ORIGIN_CDN_BASE);
                }
            }
        });
    }

    const imgObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === "IMG" && node.src.startsWith(ORIGIN_CDN_BASE)) {
                    node.src = getGiteeImgPath(node.src);
                    node.srcset = node.src;
                }
                else if (node.querySelectorAll) {
                    const childImgs = node.querySelectorAll('img[src^="' + ORIGIN_CDN_BASE + '"]');
                    childImgs.forEach(img => {
                        img.src = getGiteeImgPath(img.src);
                        img.srcset = img.src;
                    });
                }
            });
        });
    });

    // 拦截fetch请求中的图片资源
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === "string" && url.startsWith(ORIGIN_CDN_BASE)) {
            url = getGiteeImgPath(url);
        }
        return originalFetch.call(this, url, options);
    };

    // 界面汉化 EN→中
    // --------------------------
    const replaceMap = {
    //主界面 Home
        "Join the Arena": "加入战场",
        "Nickname": "昵称",
        "Login": "登录",
        "Connected":"已登录",
        "Logout":"退出",
        "Decklist": "临时卡组",
        "Edit Decklist": "构建临时卡组",
        "Saved Deck": "已保存卡组",
        "Edit Deck":"构建卡组",
        "Starter Deck": "官方预组",
        "Selsct a stater deck":"查询官方预组",
        "Quick Match": "快速匹配",
        "Create": "创建房间",
        "Join": "加入房间",
        "Mode": "模式",
        "Casual": "娱乐模式",
        "Competitive": "竞技模式",
        "Ranked": "排位模式",
        "Learn, chill, or try new decks!":"学习摸索、轻松休闲，或体验新卡组！",
        "For experienced players to train!":"高手专属，战术特训！",
        "Climb the ladder, prove your skill!":"冲击天梯，实力见证！",
        "Jump in with starter decks!":"新手卡组，即刻开局！",
        "coming soon...":"敬请期待...",
        "Game Code": "房间代码",
        "Time relaxed": "加长游戏时间",
        "Search Game": "搜寻游戏",
        "Create Game": "创建游戏",
        "Join Game": "加入游戏",
        "Searching for":"寻找对手",
        "Game found!":"找到对手！",
        "Redirecting...":"重新定向中",
        "Waiting your friend to join the game...":"等待你的朋友进入房间",
        "Match code copied!":"房间代码已复制！",
        "Send your friend和prepare for battle.":"发送好友，准备战斗！",
        "Ongoing Battles": "进行中的对战",
        "Finished Battles": "结束的对战",
        "IN PROGRESS": "进行中",
        "Spectate": "观战",
        "FINISHED": "已结束",
        "Result": "结果",
        "vs": "对战",
        "Turn": "回合",
        "Gundam Card Game":"高达卡牌对战",
        "online now!":"在线游戏！",
        "Victory is never determined by the mobile suit performance alone!":"机体的性能不是决定胜负的关键！",
        "Nor is it decided by the skill of the pilot, alone.":"也绝非只看驾驶员的个人技术。",
        "The result itself is the only truth!":"结果才是唯一真理！",
        "Fix release!":"修复版已上线！",
        "Dev Updates & Bits":"开发日志与补丁",
        "Deckbuilders & Tournament list":"卡组构筑站与赛事列表",
        "Youtube highlights":"YouTube 精彩集锦",
        "Follow us":"关注我们",
        "Screenshots":"游戏快照",
        "What is Mobile Suit Arena?":"什么是Mobile Suit Arena?",
        "Screenshots & more":"游戏快照及其他",
        "is a free online platform dedicated to the Gundam Card Game.":"是一款专为高达卡牌游戏开发的免费线上对战平台。",
        "Fully automated and featuring every card currently available, the platform allows you to test strategies and play competitive matches against real players — all directly from your browser. Our mission is to provide a reliable space where you can train and sharpen your skills.":"平台支持全自动化对战，收录当前所有已推出的卡牌，你可直接通过浏览器测试战术策略，与真实玩家展开竞技对战-无需额外安装，即刻开始游戏。我们的核心使命是为玩家提供一个稳定可靠的练习场所，助力大家锤炼技巧、精进实力。",
        "More than just a digital tool,":"它不仅是一款模拟游戏，",
        "is designed to help players get ready for official events and tournaments at their local stores. It’s the perfect place to refine tactics, explore new interactions, and step into each event with confidence and experience.":"更致力于帮助玩家为线下门店的官方赛事与锦标赛做好充分准备。在这里，你可以打磨战术细节、探索卡牌全新联动组合，带着充足的实战经验与十足信心，从容迎战每一场赛事。",
        "Disclaimer:":"免责声明：",
        "All Gundam names, designs and trademarks are the property of SOTSU, SUNRISE and BANDAI.":"所有高达相关的名称、设计及商标，均为SOTSU、SUNRISE及万代的专属财产。",
        "Mobile Suit Arena is a non-official fan creation and has no connection to the official Gundam brand.":"Mobile Suit Arena为非官方爱好者自制作品，与高达官方品牌无任何关联。",
        "Please support the official game and franchise at":"如需支持正版游戏及相关系列作品，敬请访问官网：",
    //游戏界面 Game
        "Want to play first?":"是否选择先攻？",
        "Play frist!":"选择先攻",
        "Play second!":"选择后攻",
        "Deciding who goes first":"正在决定先攻方",
        "Mulligan starting hand?":"是否重新抽取手牌？",
        "I'll":"我要",
        "Deciding if mulligan starting hand":"",
        "Settings": "设置",
        "Go back home": "回到主界面",
        "Layout options": "画面布局",
        "Dark Mode": "黑暗模式",
        "Perspective view": "改变视角",
        "Fit screen":"缩放画面",
        "Scale to fit screen": "适应屏幕",
        "Show unit stats and icons": "显示单位能力与效果图标",
        "Show resource and card counters": "显示能源与其他计数",
        "Animation speed": "动画速度",
        "Sound effects volume": "效果音量",
        "Off": "关闭",
        "Normal": "一般",
        "Fast": "较快",
        "Ultra": "最快",
        "High": "较高",
        "Louder": "最高",
        "shortcuts":"快捷键",
        "Skip action": "主动跳过",
        "Skip block": "跳过阻挡",
        "End Turn": "结束回合",
        "Open logs": "打开日志",
        "Open settings": "打开设置",
        "perspective":"俯视视角",
        "Scale to fit": "缩放画面",
        "soon!":"敬请期待！",
        "Action skipping options": "跳过步骤设置",
        "Never skip actions": "不跳过任何步骤",
        "Skip when no resources (or no hand cards)": "当前无能源（或无手牌）时自动跳过",
        "Skip actions when nothing to play": "当前无行动时自动跳过",
        "Auto-select single target": "单一目标时自动选择",
        "Concede": "投降",
        "Chat": "聊天",
        "Enable/Disable":"启用/关闭",
        "Battle Area":"战斗区",
        "Base":"基地",
        "Deck":"卡组",
        "Shield":"护盾区",
        "Resource Area":"能源区",
        "Trash":"废弃区",
        "Battle logs": "战斗日志",
    //卡图界面 Card
        "Unit": "机体",
        "Pilot": "驾驶员",
        "Total Attack Points": "总攻击力",
        "Total Health Points": "总耐久值",
        "Damage Taken": "受到伤害值",
        "Remaining Health Points": "剩余耐久值",
        "REPAIR": "修复",
        "BREACH": "突破",
        "SUPPORT": "支援",
        "BLOCKER": "阻挡者",
        "SUPPRESSION": "压制",
        "HIGH-MANEUVER": "高机动",
        "FIRST STRIKE": "先制攻击",
        "LINKED": "共鸣",
        "remaining HP":"剩余耐久值",
        "Total AP/HP":"合计攻击/耐久",
        "Can't attack on the turn played":"配置的回合无法进攻",
    //行动指令 Play
        "Play Unit": "配置机体",
        "Play Pilot": "搭乘驾驶员",
        "Play Base": "放置基地",
        "Play Command": "使用指令",
        "Play Action": "使用瞬动效果",
        "play":"选择",
        "Select": "选择",
        "Activate": "发动",
        "Attack": "攻击",
        "cancel":"取消",
        "discard":"丢弃",
        "Looking cards for":"查看卡牌",
        "Add to HAND":"加入手牌",
        "Return To TOP": "放置顶端",
        "Return To BOTTOM": "放置底层",
        "Skip selecting":"跳过选择",
        "Complete selection":"选择效果对象 ",
        "no":"无",
        "Selecting":"选择",
        "Deciding if activate shield [Burst]":"选择使用护盾爆发效果",
        "Selecting effect to resolve first":"选择优先发动的效果",
        "Skip Playing Action": "跳过连锁",
        "Skip Blocking":"跳过阻挡者",
        "Selecting effects order":"选择效果顺序",
        "Select effect to resolve first":"选择优先发动的效果",
        "Selecting target for":"选择目标",
        "Selecting Blockering":"选择阻挡者",
        "Select opponent":"攻击对手",
        "Activate Burst effect?": "是否使用爆发效果？",
        "Activate Dramatic Turnabout burst!": "用爆发将战局扭转！",
        "No, just discard!": "不，直接丢弃！",
        "Paired pilot": "已搭乘驾驶员",
        "Playing action": "执行动作",
        "Playing turn": "回合进行中",
    //日志消息 Log
        "Game started!":"游戏开始！",
        "started!":"开始！",
        "Turn end phase started":"回合结束",
        "Choose to":"选择",
        "Choose to play":"选择",
        "first":"先攻",
        "second":"后攻",
        "starting hand":"起手牌",
        "keep":"保持",
        "mulligan":"重抽",
        "Passed":"跳过",
        "Turn ended!":"回合结束！",
        "deployed":"配置",
        "Played command:":"使用指令：",
        "Combat declared:":"攻击宣言：",
        "Combat started:":"开始进攻：",
        "Action step":"效果处理",
        "Combat ended":"开始攻击",
        "Combat initiated":"攻击结束",
        "against":"进攻",
        "Enemy Player":"对方玩家",
        "received":"受到",
        "damage":"伤害",
        "now destroyed":"已击破",
        "Draw":"抽取",
        "cards":"卡牌",
        "Played base:":"放置基地：",
        "Rested unit:":"机体转为休息状态：",
        "discarded":"已丢弃",
        "Played action:":"使用瞬动效果：",
        "Card added to hand:":"卡牌加入手牌",
        "returned to hand":"回到手牌",
        "Replaced":"替换",
        "revealed":"展示",
        "Shield card added to hand":"护盾区卡牌加入手牌",
        "moved to":"进入",
        "Modifier applied to:":"状态改变：",
        "No blockers available":"没有可选用的阻挡者",
        "to block":"作为阻挡者",
        "no blocker":"不使用阻挡者",
        "Can't block HIGH-MANEUVER":"无法阻挡高机动",
        "Assigned":"选择",
        "Activated":"已发动",
        "Dealt":"造成",
        "repaired":"修复了",
        "Rested":"转为休息",
        "Resources":"能源",
        "Set Active:":"转为活跃状态",
        "on uvity":"驾驶机体",
        "No targets for":"无可选目标",
        "card":"卡牌",
        "leaving":"当前",
        "remaining":"剩余",
        " to ":"给予",
        " or ":"或",
        " and ":"和",
        " from ":"来自",
        "Timeout":"超时",
    //结束界面 End
        "Game ended": "游戏结束",
        "Winner": "胜者",
        "concede":"投降",
        "Rematch?!": "再来一次？！",
        "Go home...": "回主界面...",
        "Opponent Conceded": "对手认输",
        "Opponent abandoned!": "对手弃赛！",
        "Opponent damaged!": "目标已击破！",
        "wandts a rematch!":"要求复赛！",
        "Sure you want to concede?": "杂鱼，这就认输了？",
        "I'll concede!!": "我是杂鱼，我投降!!",
        "Let's win this": "还没结束呢！",
        "Prepare for Rematch!":"准备复赛！",
        "challenged you for another battle,":"向你发起一场新的挑战，",
        "pick your deck and join now!!":"准备卡组并加入房间！！",
        "If you run, gain one. Move forward, gain two.": "急行得一，稳进获二。",
    };

    const sortedReplaceRules = Object.entries(replaceMap).sort((a, b) => {
        return b[0].length - a[0].length;
    });

    function replaceAllText(targetNode) {
        if (!targetNode || targetNode.isContentEditable) return;

        const walker = document.createTreeWalker(
            targetNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    const parent = node.parentElement;
                    if (parent && ['SCRIPT', 'STYLE', 'IFRAME', 'NOSCRIPT', 'CODE', 'PRE'].includes(parent.tagName)) {
                        return NodeFilter.FILTER_SKIP;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while ((node = walker.nextNode())) {
            let text = node.textContent;
            const originalText = text;
            if (!text.trim()) continue;

            sortedReplaceRules.forEach(([eng, chn]) => {
                if (!eng) return;
                const escapedEng = eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(${escapedEng})`, 'gi');
                text = text.replace(regex, chn);
            });

            if (text !== originalText) {
                node.textContent = text;
            }
        }
    }

    function initTextObserver() {
        let debounceTimer;
        const debounceReplace = (node) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                replaceAllText(node || document.body);
            }, 100);
        };

        const textObserver = new MutationObserver((mutations) => {
            let needReplace = false;

            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0 || mutation.type === 'characterData') {
                    needReplace = true;

                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            debounceReplace(node);
                        }
                    });
                }
            });

            if (needReplace) {
                debounceReplace();
            }
        });

        textObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: false
        });

        const handleIframes = () => {
            document.querySelectorAll('iframe').forEach(iframe => {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc) {
                        replaceAllText(iframeDoc.body);
                        textObserver.observe(iframeDoc.documentElement, {
                            childList: true,
                            subtree: true,
                            characterData: true
                        });
                    }
                } catch (e) {
                    // 跨域iframe跳过
                }
            });
        };

        setTimeout(handleIframes, 3000);
        window.msaTextObserver = textObserver;
    }

    // --------------------------
    // 初始化执行流程
    // --------------------------
    function init() {
        // 按键汉化初始化
        replaceAllText(document.body);
        setTimeout(() => replaceAllText(document.body), 1500);
        initTextObserver();

        // 卡图替换初始化
        window.addEventListener("DOMContentLoaded", replaceLoadedImages);
        setInterval(replaceLoadedImages, 2000);
        imgObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["src", "srcset"]
        });

        // 补充处理
        window.addEventListener('load', () => {
            setTimeout(() => replaceAllText(document.body), 500);
            replaceLoadedImages();
        });

        console.log("[MSA卡图替换及按键汉化] 已成功加载");
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();