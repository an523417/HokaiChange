# 🐾 HokaiChange｜奇美拉交換所

《崩壞：星穹鐵道》萌寵交換資訊平台。

提供玩家發布與搜尋萌寵交換需求，目前支援：

- 奇美拉
- 貓貓狸
- 經典款
- 珍藏款
- Asia
- TW / HK / MO

---

## ✨ Features

###  交換資訊發布
玩家可以填寫：

- UID
- 玩家名稱
- 伺服器
- 萌寵種類
- 款式
- 我有的萌寵
- 想交換的萌寵
- 備註
- 社群聯絡連結

交換資訊發布後有效 48 小時。

###  交換篩選

可依照以下條件搜尋：

- 伺服器
- 萌寵種類
- 經典款 / 珍藏款
- 我有
- 我想換

篩選採用交換需求反向配對：

> 我有 A、想換 B  
> → 尋找「擁有 B、想換 A」的玩家。

###  萌寵預覽

選擇萌寵時會即時顯示對應圖片，方便確認交換對象。

###  Responsive Design

支援桌面與手機版介面，篩選、交換規則及詳細資料視窗皆可於小尺寸畫面使用。

###  基本安全防護

- Firebase Anonymous Authentication
- Firestore Security Rules
- 欄位型別與長度限制
- 發布者 UID 驗證
- HTML / XSS 輸入防護
- 社群連結僅允許 HTTP / HTTPS
- 使用者輸入輸出安全處理

---

##  Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES Modules)

### Backend / Database

- Firebase Authentication
- Cloud Firestore

### Version Control

- Git
- GitHub

---
## Disclaimer
-本專案為非官方玩家交流工具，與 HoYoverse / 《崩壞：星穹鐵道》官方無關。

##  Project Structure

```text
HokaiChange/
├── css/
│   └── style.css
├── images/
│   ├── pet_r/
│   │   ├── cat/
│   │   └── chimera/
│   └── pet_sr/
│       ├── cat/
│       └── chimera/
├── js/
│   └── main.js
├── index.html
└── README.md
