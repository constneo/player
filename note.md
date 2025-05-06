react-native-awesome-slider 进度条

react-native-track-player 音乐播放

react-native-local-media-metadata 媒体文件元数据

lrc-file-parser lrc 文件解析

@react-native-async-storage/async-storage React Native 的异步、未加密、持久、键值存储系统。

zustand 状态管理

@react-native-menu/menu 原生上下文菜单 右键菜单

react-native-volume-manager 用于管理音量的 React Native 库

React Navigation @react-navigation/native 提供了简单易用的跨平台导航方案

react-native-navigation 在 iOS 和 Android 两个平台都适用的原生导航

@react-navigation/native 与 react-native-navigation 冲突

## TODO

- [✓] 登录
- [ ]歌单
- [ ]播放页
- [ ]设置
- [ ]所有歌曲
- [ ]歌手
- [ ]专辑

## 修改核心 react-natvie 到 react-native-tvos

```json
{
  "react-native": "0.79.2",
  // react-native 修改为下面这行
  "react-native": "npm:react-native-tvos@latest"
}
```

## build.gradle

```
buildscript {
    ext {
        buildToolsVersion = "35.0.0"
        minSdkVersion = 24
        compileSdkVersion = 35
        targetSdkVersion = 35
        // ndkVersion = "27.1.12297006"
        ndkVersion = "29.0.13113456"
        kotlinVersion = "2.0.21"
    }
    repositories {
        google()
       // jcenter()
         mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
}

apply plugin: "com.facebook.react.rootproject"

```

https://akveo.github.io/react-native-ui-kitten
