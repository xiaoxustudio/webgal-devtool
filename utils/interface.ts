export enum DebugCommand {
    // 跳转
    JUMP,
    // 同步自客户端
    SYNCFC,
    // 同步自编辑器
    SYNCFE,
    // 执行指令
    EXE_COMMAND,
    // 重新拉取模板样式文件
    REFETCH_TEMPLATE_FILES,
}
export interface IsceneMsg {
    scene: any;
    sentence: any;
}
export interface IWS {
    command: DebugCommand;
    sceneMsg: IsceneMsg;
    stageSyncMsg: IStageState;
    message: string;
}
/**
 * @interface IStageState 游戏舞台数据接口
 */
export interface IStageState {
    oldBgName: string; // 旧背景的文件路径
    bgName: string; // 背景文件地址（相对或绝对）
    figName: string; // 立绘_中 文件地址（相对或绝对）
    figNameLeft: string; // 立绘_左 文件地址（相对或绝对）
    figNameRight: string; // 立绘_右 文件地址（相对或绝对）
    // 自由立绘
    freeFigure: Array<IFreeFigure>;
    figureAssociatedAnimation: Array<IFigureAssociatedAnimation>;
    showText: string; // 文字
    showTextSize: number; // 文字
    showName: string; // 人物名
    command: string; // 语句指令
    choose: Array<IChooseItem>; // 选项列表
    vocal: string; // 语音 文件地址（相对或绝对）
    playVocal: string; // 真实播放语音
    vocalVolume: number; // 语音 音量调整（0 - 100）
    bgm: {
        // 背景音乐
        src: string; // 背景音乐 文件地址（相对或绝对）
        enter: number; // 背景音乐 淡入或淡出的毫秒数
        volume: number; // 背景音乐 音量调整（0 - 100）
    };
    uiSe: string; // 用户界面音效 文件地址（相对或绝对）
    miniAvatar: string; // 小头像 文件地址（相对或绝对）
    GameVar: IGameVar; // 游戏内变量
    effects: Array<IEffect>; // 应用的变换
    bgTransform: string;
    bgFilter: string;
    PerformList: Array<IRunPerform>; // 要启动的演出列表
    currentDialogKey: string; // 当前对话的key
    live2dMotion: ILive2DMotion[];
    live2dExpression: ILive2DExpression[];
    // 当前演出的延迟，用于做对话插演出！
    // currentPerformDelay:number
    currentConcatDialogPrev: string;
    // 测试：电影叙事
    enableFilm: string;
    isDisableTextbox: boolean;
    replacedUIlable: Record<string, string>;
}
/**
 * 游戏内变量
 * @interface IGameVar
 */
export interface IGameVar {
    [propName: string]: string | boolean | number | Array<string | boolean | number>;
}
export interface ISetGameVar {
    key: string;
    value: string | boolean | number;
}
/**
 * 单个选项
 * @interface IChooseItem
 */
export interface IChooseItem {
    key: string; // 选项名称
    targetScene: string; // 选项target
    isSubScene: boolean; // 是否是子场景调用
}

export interface ITransform {
    alpha: number;
    scale: {
        x: number;
        y: number;
    };
    // pivot: {
    //   x: number;
    //   y: number;
    // };
    position: {
        x: number;
        y: number;
    };
    rotation: number;
    blur: number;
}

/**
 * 基本效果接口
 * @interface IEffect
 */
export interface IEffect {
    target: string; // 作用目标
    transform?: ITransform; // 变换
}

/**
 * 基本变换预设
 */
export const baseTransform: ITransform = {
    alpha: 1,
    scale: {
        x: 1,
        y: 1,
    },
    // pivot: {
    //   x: 0.5,
    //   y: 0.5,
    // },
    position: {
        x: 0,
        y: 0,
    },
    rotation: 0,
    blur: 0,
};

export interface IFreeFigure {
    basePosition: 'left' | 'center' | 'right';
    name: string;
    key: string;
}

export interface IFigureAssociatedAnimation {
    mouthAnimation: IMouthAnimationFile;
    blinkAnimation: IEyesAnimationFile;
    targetId: string;
    animationFlag: string;
}

export interface IMouthAnimationFile {
    open: string;
    close: string;
    halfOpen: string;
}

export interface IEyesAnimationFile {
    open: string;
    close: string;
}

/**
 * 启动演出接口
 * @interface IRunPerform
 */
export interface IRunPerform {
    id: string;
    isHoldOn: boolean; // 演出类型
    script: ISentence; // 演出脚本
}

export interface ILive2DMotion {
    target: string;
    motion: string;
}

export interface ILive2DExpression {
    target: string;
    expression: string;
}
/**
 * 单条语句接口
 * @interface ISentence
 */
export interface ISentence {
    command: commandType; // 语句类型
    commandRaw: string; // 命令的原始内容，方便调试
    content: string; // 语句内容
    args: Array<arg>; // 参数列表
    sentenceAssets: Array<IAsset>; // 语句携带的资源列表
    subScene: Array<string>; // 语句包含子场景列表
}
export enum commandType {
    say, // 对话
    changeBg, // 更改背景
    changeFigure, // 更改立绘
    bgm, // 更改背景音乐
    video, // 播放视频
    pixi, // pixi演出
    pixiInit, // pixi初始化
    intro, // 黑屏文字演示
    miniAvatar, // 小头像
    changeScene, // 切换场景
    choose, // 分支选择
    end, // 结束游戏
    setComplexAnimation, // 动画演出
    setFilter, // 设置效果
    label, // 标签
    jumpLabel, // 跳转标签
    chooseLabel, // 选择标签
    setVar, // 设置变量
    if, // 条件跳转
    callScene, // 调用场景
    showVars,
    unlockCg,
    unlockBgm,
    filmMode,
    setTextbox,
    setAnimation,
    playEffect,
    setTempAnimation,
    comment,
    setTransform,
    setTransition,
    getUserInput,
    applyStyle,
}
const map = {
    [commandType.say]: '对话', // 对话
    [commandType.changeBg]: '更改背景', // 更改背景
    [commandType.changeFigure]: '更改立绘', // 更改立绘
    [commandType.bgm]: '更改背景音乐', // 更改背景音乐
    [commandType.video]: '播放视频', // 播放视频
    [commandType.pixi]: 'pixi演出', // pixi演出
    [commandType.pixiInit]: 'pixi初始化', // pixi初始化
    [commandType.intro]: '黑屏文字演示', // 黑屏文字演示
    [commandType.miniAvatar]: '小头像', // 小头像
    [commandType.changeScene]: '切换场景', // 切换场景
    [commandType.choose]: '分支选择', // 分支选择
    [commandType.end]: '结束游戏', // 结束游戏
    [commandType.setComplexAnimation]: '动画演出', // 动画演出
    [commandType.setFilter]: '设置效果', // 设置效果
    [commandType.label]: '标签', // 标签
    [commandType.jumpLabel]: '跳转标签', // 跳转标签
    [commandType.chooseLabel]: '选择标签', // 选择标签
    [commandType.setVar]: '设置变量', // 设置变量
    [commandType.if]: '条件跳转', // 条件跳转
    [commandType.callScene]: '调用场景', // 调用场景
    [commandType.showVars]: '显示变量',
    [commandType.unlockCg]: '解锁cg',
    [commandType.unlockBgm]: '解锁bgm',
    [commandType.filmMode]: '电影模式',
    [commandType.setTextbox]: '设置文本框',
    [commandType.setAnimation]: '设置动画',
    [commandType.playEffect]: '播放效果',
    [commandType.setTempAnimation]: '设置缓存动画',
    [commandType.comment]: '注释',
    [commandType.setTransform]: '设置变换',
    [commandType.setTransition]: '设置过渡',
    [commandType.getUserInput]: '获取用户输入',
    [commandType.applyStyle]: '应用样式',
};
export function transitionCommand(_cmd: commandType): string | null {
    if (map[_cmd]) {
        return map[_cmd];
    }
    return null;
}

/**
 * 单个参数接口
 * @interface arg
 */
export interface arg {
    key: string; // 参数键
    value: string | boolean | number; // 参数值
}

/**
 * 资源接口
 * @interface IAsset
 */
export interface IAsset {
    name: string; // 资源名称
    type: fileType; // 资源类型
    url: string; // 资源url
    lineNumber: number; // 触发资源语句的行号
}
export enum fileType {
    background,
    bgm,
    figure,
    scene,
    tex,
    vocal,
    video,
}
export interface IDebugMessage {
    event: string;
    data: {
        command: DebugCommand;
        sceneMsg: {
            sentence: number;
            scene: string;
        };
        message: string;
        stageSyncMsg: any;
    };
}
