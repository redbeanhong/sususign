# SuSuSign
數位、快速為線上簽名重點，利用兩詞相近音結合成名字。
logo集合數位邏輯的0與1，以及簽名需要使用到筆與框呈現。 
顏色以護眼的綠色為主，整體風格以柔和漸層展示。使用時，讓人感到較為放鬆。

## 進度說明
目前完成基本畫面、簽核、下載PDF功能。 
因localStorage限制，預計可存在3支文件，無法上傳時可於文件頁面進行刪除。 
基本功能雖完成，但仍有待優化的部分，不足之處請見諒。

## 系統說明

專案使用vite建置，運行方式如下

```sh
npm install
```

```sh
npm run dev
```

```sh
npm run build
```

## 資料夾說明
```sh
dist - 部屬資料夾
src - 檔案資料夾
    ├─ assets - 樣式資料夾
    │  ├─ img - 圖片
    │  └─ scss - 樣式
    ├─ components - 小型元件
    ├─ router - 路由
    └─ views - 畫面元件
```

## 使用技術
* Vite
* Vue3
* LocalStorage
* canvas
* PDF.js
* fabric.js
* jsPDF
* RWD
