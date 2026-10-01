import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
    getAuth,
    signInAnonymously
} from
    "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    where
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCYxqS1PMzx0n4hh9uCGPco6jwwCiM-__w",
    authDomain: "hokaichange.firebaseapp.com",
    projectId: "hokaichange",
    storageBucket: "hokaichange.firebasestorage.app",
    messagingSenderId: "944304305743",
    appId: "1:944304305743:web:e5173d3dd261cd2ede9c3a"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

console.log("main.js 有成功執行！");
signInAnonymously(auth)
    .then((userCredential) => {
        console.log(
            "Firebase 匿名登入成功：",
            userCredential.user.uid
        );
        loadExchanges();
    })
    .catch((error) => {
        console.error(
            "Firebase 匿名登入失敗：",
            error.code,
            error.message
        );
    });
// =========================
// Pet Data
// =========================

const pets = [
    // -------------------------
    // 經典款 - 奇美拉
    // -------------------------
    {
        id: "chimera_001",
        name: "芙拉卡農",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_002",
        name: "大魔導師",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_003",
        name: "流光螢螢",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_004",
        name: "迷途獸",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_005",
        name: "圓目將軍",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_006",
        name: "芝麻糊",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_007",
        name: "梅梅",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_008",
        name: "飽飽龍",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_009",
        name: "冰糖相機",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_010",
        name: "比格椰",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_011",
        name: "昔米露",
        type: "chimera",
        collection: "classic"
    },
    {
        id: "chimera_012",
        name: "車釐比斯",
        type: "chimera",
        collection: "classic"
    },

    // -------------------------
    // 經典款 - 貓貓狸
    // -------------------------
    {
        id: "cat_001",
        name: "球棒狸",
        type: "cat",
        collection: "classic"
    },
    {
        id: "cat_002",
        name: "浪浪仙",
        type: "cat",
        collection: "classic"
    },
    {
        id: "cat_003",
        name: "晴天鳥鳥",
        type: "cat",
        collection: "classic"
    },
    {
        id: "cat_004",
        name: "嚶嚶子",
        type: "cat",
        collection: "classic"
    },
    {
        id: "cat_005",
        name: "咪奈花",
        type: "cat",
        collection: "classic"
    },

    // =========================
    // 珍藏款 - 奇美拉
    // =========================

    {
        id: "chimera_001",
        name: "芙拉卡農·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_002",
        name: "大魔導師·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_003",
        name: "流光螢螢·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_004",
        name: "迷途獸·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_005",
        name: "圓目將軍·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_006",
        name: "芝麻糊·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_007",
        name: "梅梅·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_008",
        name: "飽飽龍·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_009",
        name: "冰糖相機·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_010",
        name: "比格椰·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_011",
        name: "昔米露·珍藏",
        type: "chimera",
        collection: "special"
    },
    {
        id: "chimera_012",
        name: "車釐比斯·珍藏",
        type: "chimera",
        collection: "special"
    },

    // =========================
    // 珍藏款 - 貓貓狸
    // =========================

    {
        id: "cat_001",
        name: "球棒狸·珍藏",
        type: "cat",
        collection: "special"
    },
    {   
        id: "cat_002",
        name: "浪浪仙·珍藏",
        type: "cat",
        collection: "special"
    },
    {
        id: "cat_003",
        name: "晴天鳥鳥·珍藏",
        type: "cat",
        collection: "special"
    },
    {
        id: "cat_004",
        name: "嚶嚶子·珍藏",
        type: "cat",
        collection: "special"
    },
    {
        id: "cat_005",
        name: "咪奈花·珍藏",
        type: "cat",
        collection: "special"
    }

];

// =========================
// Exchange Data
// =========================

const exchanges = [];


let currentPetType = "all";
let currentServer = "all";
let currentCollection = "all";

let currentOwnedPet = "";
let currentWantedPet = "";

// =========================
// Pet Select Elements
// =========================

const petType = document.getElementById("petType");
const petCollection = document.getElementById("petCollection");

const ownedPet = document.getElementById("ownedPet");
const wantedPet = document.getElementById("wantedPet");
const ownedPetPreview =
    document.getElementById("ownedPetPreview");

const wantedPetPreview =
    document.getElementById("wantedPetPreview");

const publishForm =
    document.getElementById("publishForm");

const playerUid =
    document.getElementById("playerUid");

const playerName =
    document.getElementById("playerName");

const server =
    document.getElementById("server");

const exchangeNote =
    document.getElementById("exchangeNote");

const socialLink =
    document.getElementById("socialLink");

// =========================
// Message Modal
// =========================

const messageModal =
    document.getElementById("messageModal");

const messageTitle =
    document.getElementById("messageTitle");

const messageText =
    document.getElementById("messageText");

const closeMessageModal =
    document.getElementById("closeMessageModal");

const exchangeList =
    document.getElementById("exchangeList");

const exchangeDetailModal =
    document.getElementById("exchangeDetailModal");

const closeExchangeDetail =
    document.getElementById("closeExchangeDetail");

const detailTitle =
    document.getElementById("detailTitle");

const detailPlayerName =
    document.getElementById("detailPlayerName");

const detailUid =
    document.getElementById("detailUid");

const detailServer =
    document.getElementById("detailServer");

const detailOwnedImage =
    document.getElementById("detailOwnedImage");

const detailOwnedName =
    document.getElementById("detailOwnedName");

const detailWantedImage =
    document.getElementById("detailWantedImage");

const detailWantedName =
    document.getElementById("detailWantedName");

const detailNoteSection =
    document.getElementById("detailNoteSection");

const detailNote =
    document.getElementById("detailNote");

const detailSocialLink =
    document.getElementById("detailSocialLink");

const applyFilterButton =
    document.getElementById("applyFilterButton");

const clearFilterButton =
    document.getElementById("clearFilterButton");

// =========================
// Filter Modal
// =========================

const filterButton =
    document.getElementById("filterButton");

const filterModal =
    document.getElementById("filterModal");

const closeFilterModal =
    document.getElementById("closeFilterModal");


function showMessage(title, text) {

    messageTitle.textContent = title;
    messageText.textContent = text;

    messageModal.classList.add("show");
}


function hideMessage() {

    messageModal.classList.remove("show");
}


closeMessageModal.addEventListener(
    "click",
    hideMessage
);
// 開啟篩選視窗
function openFilterModal() {
    filterModal.classList.add("show");
}


// 關閉篩選視窗
function closeFilterForm() {
    filterModal.classList.remove("show");
}


// 點擊「篩選」
filterButton.addEventListener(
    "click",
    openFilterModal
);


// 點擊右上角「×」
closeFilterModal.addEventListener(
    "click",
    closeFilterForm
);
    
// =========================
// Display Helpers
// =========================

// 取得萌寵資料
function getPetById(petId, collection) {

    return pets.find(pet =>
        pet.id === petId &&
        pet.collection === collection
    );
}


// 伺服器顯示名稱
function getServerName(serverValue) {

    if (serverValue === "asia") {
        return "亞洲服";
    }

    if (serverValue === "tw-hk-mo") {
        return "台港澳服";
    }

    return "";
}


// 類型顯示名稱
function getPetTypeName(typeValue) {

    if (typeValue === "chimera") {
        return "奇美拉";
    }

    if (typeValue === "cat") {
        return "貓貓狸";
    }

    return "";
}
const exchangeTabs =
    document.querySelectorAll(".exchange-tab");


exchangeTabs.forEach(tab => {

    tab.addEventListener("click", function () {

        // 更新目前選擇
        currentPetType = tab.dataset.type;


        // 清掉所有 active
        exchangeTabs.forEach(item => {
            item.classList.remove("active");
        });


        // 被點擊的加上 active
        tab.classList.add("active");


        // 套用篩選
        applyFilters();
    });

});

// Filter form elements
const filterPetType =
    document.getElementById("filterPetType");

const filterCollection =
    document.getElementById("filterCollection");

const filterOwnedPet =
    document.getElementById("filterOwnedPet");

const filterWantedPet =
    document.getElementById("filterWantedPet");

const filterOwnedPreview =
    document.getElementById("filterOwnedPreview");

const filterWantedPreview =
    document.getElementById("filterWantedPreview");


// =========================
// Filter Pet Preview
// =========================

function showFilterPetPreview(
    previewElement,
    petId,
    collection
) {

    if (!petId) {
        previewElement.textContent =
            "不限萌寵";
        return;
    }

    const pet = pets.find(pet =>
        pet.id === petId &&
        pet.collection === collection
    );

    if (!pet) {
        previewElement.textContent =
            "找不到萌寵資料";
        return;
    }

    const imagePath =
        getPetImagePath(pet);

    previewElement.innerHTML = `
        <img
            src="${imagePath}"
            alt="${pet.name}"
            class="pet-preview-image"
        >

        <span class="pet-preview-name">
            ${pet.name}
        </span>
    `;
}


// =========================
// Update Filter Pet Options
// =========================

function updateFilterPetOptions() {
    

    const selectedType =
        filterPetType.value;

    const selectedCollection =
        filterCollection.value;

    // 找出符合篩選條件的萌寵
    const filteredPets = pets.filter(pet => {

        const matchType =
            selectedType === "all" ||
            pet.type === selectedType;

        const matchCollection =
            selectedCollection === "all" ||
            pet.collection === selectedCollection;

        return matchType && matchCollection;
    });


    // 先清空
    filterOwnedPet.innerHTML =
        '<option value="">不限</option>';

    filterWantedPet.innerHTML =
        '<option value="">不限</option>';


    // 加入符合條件的萌寵
   filteredPets.forEach(pet => {

    // =========================
    // 我有
    // =========================
        const ownedOption =
            document.createElement("option");

        ownedOption.value = pet.id;
        ownedOption.textContent = pet.name;

        // 記住這隻萌寵的種類與款式
        ownedOption.dataset.type =
            pet.type;

        ownedOption.dataset.collection =
            pet.collection;


    // =========================
    // 我想換
    // =========================
        const wantedOption =
            document.createElement("option");

        wantedOption.value = pet.id;
        wantedOption.textContent = pet.name;

        // 記住這隻萌寵的種類與款式
        wantedOption.dataset.type =
            pet.type;

        wantedOption.dataset.collection =
            pet.collection;


        // 放進兩個選單
        filterOwnedPet.appendChild(
            ownedOption
        );

        filterWantedPet.appendChild(
            wantedOption
        );
    });


    // 條件改變後 Preview 清空
    showFilterPetPreview(
        filterOwnedPreview,
        ""
    );

    showFilterPetPreview(
        filterWantedPreview,
        ""
    );
}

// =========================
// Sync Filter Pet Options
// =========================

function syncFilterPetOptions(
    sourceSelect,
    targetSelect
) {

    const selectedOption =
        sourceSelect.options[
            sourceSelect.selectedIndex
        ];

    // 選「不限」就解除限制
    if (!sourceSelect.value) {

        Array.from(
            targetSelect.options
        ).forEach(option => {
            option.disabled = false;
        });

        return;
    }


    const selectedType =
        selectedOption.dataset.type;

    const selectedCollection =
        selectedOption.dataset.collection;

    const selectedPetId =
        sourceSelect.value;


    Array.from(
        targetSelect.options
    ).forEach(option => {

        // 「不限」永遠可以選
        if (!option.value) {
            option.disabled = false;
            return;
        }

        const sameType =
            option.dataset.type ===
            selectedType;

        const sameCollection =
            option.dataset.collection ===
            selectedCollection;

        const samePet =
            option.value === selectedPetId;


        // 必須：
        // 1. 同種類
        // 2. 同款式
        // 3. 不能同一隻
        option.disabled =
            !sameType ||
            !sameCollection ||
            samePet;
    });


    // 如果另一邊原本選的現在變成非法
    const targetOption =
        targetSelect.options[
            targetSelect.selectedIndex
        ];

    if (
        targetSelect.value &&
        targetOption.disabled
    ) {
        targetSelect.value = "";
    }
}

// =========================
// Prevent Same Filter Pet
// =========================

// 我有 A → 我想換不能選 A
function updateFilterWantedDisabled() {

    const ownedPetId =
        filterOwnedPet.value;

    Array.from(
        filterWantedPet.options
    ).forEach(option => {

        // 「不限」永遠不鎖
        if (!option.value) {
            return;
        }

        option.disabled =
            option.value === ownedPetId;
    });


    // 如果原本兩邊剛好相同
    if (
        ownedPetId &&
        filterWantedPet.value === ownedPetId
    ) {
        filterWantedPet.value = "";

        showFilterPetPreview(
            filterWantedPreview,
            ""
        );
    }
}


filterPetType.addEventListener(
    "change",
    updateFilterPetOptions
);

filterCollection.addEventListener(
    "change",
    updateFilterPetOptions
);

// 我有
filterOwnedPet.addEventListener(
    "change",
    function () {

        // 我有 → 限制我想換
        syncFilterPetOptions(
            filterOwnedPet,
            filterWantedPet
        );

        const selectedOption =
            filterOwnedPet.options[
                filterOwnedPet.selectedIndex
            ];

        showFilterPetPreview(
            filterOwnedPreview,
            filterOwnedPet.value,
            selectedOption.dataset.collection
        );


        // 如果右邊因為規則不符被清空
        if (!filterWantedPet.value) {
            showFilterPetPreview(
                filterWantedPreview,
                ""
            );
        }
    }
);

// 我想換
filterWantedPet.addEventListener(
    "change",
    function () {

        const selectedOption =
            filterWantedPet.options[
                filterWantedPet.selectedIndex
            ];

        showFilterPetPreview(
            filterWantedPreview,
            filterWantedPet.value,
            selectedOption.dataset.collection
        );
    }
);

updateFilterPetOptions();


function formatDate(date) {

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
}

playerUid.addEventListener("input", function () {

    // 只保留 0-9
    playerUid.value =
        playerUid.value.replace(/\D/g, "");
});

function openExchangeDetail(exchange) {

    const ownedPetData =
        getPetById(
            exchange.ownedPetId,
            exchange.collection
        );

    const wantedPetData =
        getPetById(
            exchange.wantedPetId,
            exchange.collection
        );

    if (!ownedPetData || !wantedPetData) {
        return;
    }


    // 標題
    detailTitle.textContent =
        `${ownedPetData.name} 換 ${wantedPetData.name}`;


    // 玩家資料
    detailPlayerName.textContent =
        exchange.playerName;

    detailUid.textContent =
        exchange.uid;

    detailServer.textContent =
        getServerName(exchange.server);


    // 我有
    detailOwnedImage.src =
        getPetImagePath(ownedPetData);

    detailOwnedImage.alt =
        ownedPetData.name;

    detailOwnedName.textContent =
        ownedPetData.name;


    // 我想要
    detailWantedImage.src =
        getPetImagePath(wantedPetData);

    detailWantedImage.alt =
        wantedPetData.name;

    detailWantedName.textContent =
        wantedPetData.name;


    // 備註
    if (exchange.note) {

        detailNoteSection.style.display = "block";
        detailNote.textContent = exchange.note;

    } else {

        detailNoteSection.style.display = "none";
    }


    // 社群連結
    const safeSocialUrl =
        getSafeUrl(exchange.socialLink);

    if (safeSocialUrl) {

        detailSocialLink.style.display = "inline-flex";
        detailSocialLink.href = safeSocialUrl;

    } else {

        detailSocialLink.style.display = "none";
        detailSocialLink.removeAttribute("href");
    }


    // 顯示 Modal
    exchangeDetailModal.classList.add("show");
}

// =========================
// Security Helpers
// =========================

// 將使用者輸入轉成安全文字，避免 HTML / Script 注入
function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// 檢查社群網址是否安全
function getSafeUrl(value) {

    if (!value) {
        return null;
    }

    try {
        const url = new URL(value);

        // 只允許一般網頁連結
        if (
            url.protocol !== "https:" &&
            url.protocol !== "http:"
        ) {
            return null;
        }

        return url.href;

    } catch {
        return null;
    }
}


// =========================
// Render Exchange
// =========================

function renderExchange(exchange) {

    const ownedPetData =
        getPetById(
            exchange.ownedPetId,
            exchange.collection
        );

    const wantedPetData =
        getPetById(
            exchange.wantedPetId,
            exchange.collection
        );

    // 找不到萌寵資料就不要繼續
    if (!ownedPetData || !wantedPetData) {
        return;
    }

    const item = document.createElement("article");

    item.dataset.petType = exchange.petType;
    item.dataset.server = exchange.server;

    // 儲存真正的發布時間，提供排序使用
    item.dataset.createdAt =
        exchange.createdAt.getTime();

    item.classList.add("exchange-item");

    item.dataset.collection =
        exchange.collection;

    item.dataset.ownedPetId =
        exchange.ownedPetId;

    item.dataset.wantedPetId =
        exchange.wantedPetId;

    item.innerHTML = `
        <div class="exchange-item-main">

            <div class="exchange-item-content">

                <h3>
                    ${ownedPetData.name}
                    <span class="exchange-word">換</span>
                    ${wantedPetData.name}
                </h3>

                <div class="exchange-meta">

                    <span class="exchange-tag">
                        ${getPetTypeName(exchange.petType)}
                    </span>

                    <span>
                        ${getServerName(exchange.server)}
                    </span>

                    <span>
                        UID：${escapeHTML(exchange.uid)}
                    </span>

                </div>

                <div class="exchange-player">
                    玩家：${escapeHTML(exchange.playerName)}
                </div>

            </div>

            <time class="exchange-date">
                ${formatDate(exchange.createdAt)}
            </time>

        </div>
    `;
    item.addEventListener("click", function () {
        openExchangeDetail(exchange);
    });
    // 先加入交換消息
    exchangeList.appendChild(item);

    // 依發布時間排序：最新 → 最舊
    const exchangeItems = Array.from(
     exchangeList.querySelectorAll(".exchange-item")
        );

    exchangeItems.sort((a, b) => {
        return Number(b.dataset.createdAt) -
             Number(a.dataset.createdAt);
    });

    exchangeItems.forEach(exchangeItem => {
        exchangeList.appendChild(exchangeItem);
    });
}

const EXCHANGE_LIFETIME =
    48 * 60 * 60 * 1000;


// 判斷交換消息是否已超過 48 小時
function isExchangeExpired(createdAt) {

    const now = Date.now();

    const createdTime =
        createdAt.getTime();

    return now - createdTime >= EXCHANGE_LIFETIME;
}

async function loadExchanges() {

    try {

        const exchangesQuery = query(
            collection(db, "exchanges"),
            orderBy("createdAt", "desc")
        );

        const querySnapshot =
            await getDocs(exchangesQuery);

        exchangeList.innerHTML = "";

        querySnapshot.forEach((document) => {

            const data = document.data();

                // 防止資料缺少發布時間
            if (!data.createdAt) {
                return;
            }

            const createdAt =
                data.createdAt.toDate();

            // 超過 48 小時就不顯示
            if (isExchangeExpired(createdAt)) {
                return;
            }

            const exchange = {
                id: document.id,

                uid: data.uid,
                playerName: data.playerName,
                server: data.server,

                petType: data.petType,
                collection: data.collection,

                ownedPetId: data.ownedPetId,
                wantedPetId: data.wantedPetId,

                note: data.note,
                socialLink: data.socialLink,

                authorUid: data.authorUid,

                createdAt: createdAt
            };

            renderExchange(exchange);
        });

        applyFilters();

        console.log(
            "Firestore 交換資料讀取完成：",
            querySnapshot.size
        );

    } catch (error) {

        console.error(
            "Firestore 讀取失敗：",
            error
        );

    }
}

function closeExchangeDetailModal() {
    exchangeDetailModal.classList.remove("show");
}


closeExchangeDetail.addEventListener(
    "click",
    closeExchangeDetailModal
);

// =========================
// Pet Image Path
// =========================

function getPetImagePath(pet) {

    // 根據款式決定圖片資料夾
    const collectionFolder =
        pet.collection === "classic"
            ? "pet_r"
            : "pet_sr";

    return `./images/${collectionFolder}/${pet.type}/${pet.id}.png`;
}
function applyFilters() {

    const items =
        document.querySelectorAll(".exchange-item");

    items.forEach(item => {

        // -------------------------
        // 種類
        // -------------------------
        const matchPetType =
            currentPetType === "all" ||
            item.dataset.petType === currentPetType;


        // -------------------------
        // 伺服器
        // -------------------------
        const matchServer =
            currentServer === "all" ||
            item.dataset.server === currentServer;


        // -------------------------
        // 款式
        // -------------------------
        const matchCollection =
            currentCollection === "all" ||
            item.dataset.collection === currentCollection;


        // -------------------------
        // 我有
        //
        // 我有 A
        // → 找「對方想要 A」
        // -------------------------
        const matchOwnedPet =
            !currentOwnedPet ||
            item.dataset.wantedPetId === currentOwnedPet;


        // -------------------------
        // 我想換
        //
        // 我想換 B
        // → 找「對方有 B」
        // -------------------------
        const matchWantedPet =
            !currentWantedPet ||
            item.dataset.ownedPetId === currentWantedPet;


        // 全部條件都符合才顯示
        const isMatch =
            matchPetType &&
            matchServer &&
            matchCollection &&
            matchOwnedPet &&
            matchWantedPet;


        item.style.display =
            isMatch ? "" : "none";
    });
}

applyFilterButton.addEventListener(
    "click",
    function () {

        // Server
        const selectedServer =
            document.querySelector(
                'input[name="filterServer"]:checked'
            );

        currentServer =
            selectedServer
                ? selectedServer.value
                : "all";


        // Type
        currentPetType =
            filterPetType.value;


        // Collection
        currentCollection =
            filterCollection.value;


        // 我有
        currentOwnedPet =
            filterOwnedPet.value;


        // 我想換
        currentWantedPet =
            filterWantedPet.value;


        // 執行搜尋
        applyFilters();


        // 關閉篩選視窗
        closeFilterForm();
    }
);
clearFilterButton.addEventListener(
    "click",
    function () {

        // Server → 全部
        const allServer =
            document.querySelector(
                'input[name="filterServer"][value="all"]'
            );

        if (allServer) {
            allServer.checked = true;
        }


        // 種類 / 款式
        filterPetType.value = "all";
        filterCollection.value = "all";


        // 重新建立萌寵選單
        updateFilterPetOptions();


        // Preview
        showFilterPetPreview(
            filterOwnedPreview,
            ""
        );

        showFilterPetPreview(
            filterWantedPreview,
            ""
        );
    }
);

// =========================
// Publish Exchange
// =========================

function createExchange() {

    const createdAt = new Date();

    const expiresAt = new Date(
        createdAt.getTime() + 48 * 60 * 60 * 1000
    );

    const exchange = {
        uid: playerUid.value.trim(),
        playerName: playerName.value.trim(),
        server: server.value,

        petType: petType.value,
        collection: petCollection.value,

        ownedPetId: ownedPet.value,
        wantedPetId: wantedPet.value,

        note: exchangeNote.value.trim(),
        socialLink: socialLink.value.trim(),

        createdAt: createdAt,
        expiresAt: expiresAt,

        // Firebase 匿名帳號 UID
        authorUid: auth.currentUser.uid
    };

    return exchange;
}



publishForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    try {

        // 確認 Firebase 匿名登入完成
        if (!auth.currentUser) {

            console.error(
                "尚未完成 Firebase 匿名登入"
            );

            showMessage(
                "目前無法發布",
                "系統尚未完成連線，請稍後再試一次。"
            );

            return;
        }

        const exchange = createExchange();

        // =========================
// Form Validation
// =========================

        // UID：9～10 位數字
            if (!/^\d{9,10}$/.test(exchange.uid)) {

                showMessage(
                    "UID 格式有誤",
                    "UID 必須為 9～10 位數字。"
                );

                return;
            }


            // 玩家名稱不能為空
            if (!exchange.playerName) {

                showMessage(
                    "資料填寫有誤",
                    "請輸入玩家名稱。"
                );

                return;
            }


            // 玩家名稱禁止 < >
            if (/[<>]/.test(exchange.playerName)) {

                showMessage(
                    "玩家名稱格式有誤",
                    "玩家名稱不能包含 < 或 > 符號。"
                );

                return;
            }


            // 備註禁止 < >
            if (/[<>]/.test(exchange.note)) {

                showMessage(
                    "備註格式有誤",
                    "備註不能包含 < 或 > 符號。"
                );

                return;
            }


            // 社群連結禁止 < >
            if (/[<>]/.test(exchange.socialLink)) {

                showMessage(
                    "連結格式有誤",
                    "社群連結不能包含 < 或 > 符號。"
                );

                return;
            }


            // 社群連結只允許 http / https
            if (
                exchange.socialLink &&
                !/^https?:\/\/.+/i.test(exchange.socialLink)
            ) {

                showMessage(
                    "連結格式有誤",
                    "社群連結請使用 http:// 或 https:// 開頭。"
                );

                return;
            }


        // 48 小時後自動過期
        const expiresAt = new Date(
            Date.now() + 48 * 60 * 60 * 1000
        );
        
        // Firestore 使用的資料
        const firestoreExchange = {
            uid: exchange.uid,
            playerName: exchange.playerName,
            server: exchange.server,

            petType: exchange.petType,
            collection: exchange.collection,

            ownedPetId: exchange.ownedPetId,
            wantedPetId: exchange.wantedPetId,

            note: exchange.note,
            socialLink: exchange.socialLink,

            createdAt: serverTimestamp(),

            // 48 小時後的過期時間
            expiresAt: expiresAt,

            authorUid: auth.currentUser.uid
        };

        const docRef = await addDoc(
            collection(db, "exchanges"),
            firestoreExchange
        );

        console.log(
            "Firestore 發布成功：",
            docRef.id
        );

        await loadExchanges();

        closePublishForm();

    } catch (error) {

        console.error(
            "Firestore 發布失敗：",
            error
        );

    }

});

// =========================
// Pet Preview
// =========================

function showPetPreview(previewElement, petId) {

    // 尚未選擇萌寵
    if (!petId) {
        previewElement.textContent = "選擇後顯示圖片";
        return;
    }

    // 根據 ID 找到對應萌寵
    const pet = pets.find(pet =>
        pet.id === petId &&
        pet.collection === petCollection.value
    );
    // 找不到資料時避免程式繼續執行
    if (!pet) {
        previewElement.textContent = "找不到萌寵資料";
        return;
    }

    const imagePath = getPetImagePath(pet);

    previewElement.innerHTML = `
        <img
            src="${imagePath}"
            alt="${pet.name}"
            class="pet-preview-image"
        >

        <span class="pet-preview-name">
            ${pet.name}
        </span>
    `;
}
// 根據類型與款式更新萌寵選單
function updatePetOptions() {

    const selectedType = petType.value;
    const selectedCollection = petCollection.value;

    // 尚未選完整
    if (!selectedType || !selectedCollection) {

        ownedPet.innerHTML =
            '<option value="">請先選擇類型與款式</option>';

        wantedPet.innerHTML =
            '<option value="">請先選擇類型與款式</option>';

        return;
    }

    // 找出符合目前條件的萌寵
    const filteredPets = pets.filter(pet =>
        pet.type === selectedType &&
        pet.collection === selectedCollection
    );

    // 重設選單
    ownedPet.innerHTML =
        '<option value="">請選擇你擁有的萌寵</option>';

    wantedPet.innerHTML =
        '<option value="">請選擇你想要的萌寵</option>';

        showPetPreview(ownedPetPreview, "");
        showPetPreview(wantedPetPreview, "");

    // 將萌寵加入兩個下拉選單
    filteredPets.forEach(pet => {

        const ownedOption = document.createElement("option");
        ownedOption.value = pet.id;
        ownedOption.textContent = pet.name;
        ownedOption.dataset.type = pet.type;
        ownedOption.dataset.collection = pet.collection;

        const wantedOption = document.createElement("option");
        wantedOption.value = pet.id;
        wantedOption.textContent = pet.name;

        ownedPet.appendChild(ownedOption);
        wantedPet.appendChild(wantedOption);
    });
}



// =========================
// Prevent Same Pet Exchange
// =========================

// 更新「我想要」的禁用選項
function updateWantedPetDisabled() {

    const ownedPetId = ownedPet.value;

    Array.from(wantedPet.options).forEach(option => {

        // 第一個提示選項不處理
        if (!option.value) {
            return;
        }

        option.disabled = option.value === ownedPetId;
    });

    // 如果兩邊剛好已經選到同一隻
    if (wantedPet.value === ownedPetId) {
        wantedPet.value = "";
    }
}


// 更新「我有」的禁用選項
function updateOwnedPetDisabled() {

    const wantedPetId = wantedPet.value;

    Array.from(ownedPet.options).forEach(option => {

        if (!option.value) {
            return;
        }

        option.disabled = option.value === wantedPetId;
    });

    // 如果兩邊剛好已經選到同一隻
    if (ownedPet.value === wantedPetId) {
        ownedPet.value = "";
    }
}

//監聽抓
ownedPet.addEventListener("change", function () {

    // 防止選到相同萌寵
    updateWantedPetDisabled();

    // 顯示我有的萌寵
    showPetPreview(
        ownedPetPreview,
        ownedPet.value
    );
});


wantedPet.addEventListener("change", function () {

    // 防止選到相同萌寵
    updateOwnedPetDisabled();

    // 顯示我想要的萌寵
    showPetPreview(
        wantedPetPreview,
        wantedPet.value
    );
});

//監聽器
petType.addEventListener("change", updatePetOptions);

petCollection.addEventListener("change", updatePetOptions);


// =========================
// Publish Modal
// =========================

// 取得需要操作的 HTML 元素
const publishButton = document.getElementById("publishButton");
const publishModal = document.getElementById("publishModal");
const closePublishModal = document.getElementById("closePublishModal");
const cancelPublish = document.getElementById("cancelPublish");


// 開啟發布表單
function openPublishModal() {
    // 每次開啟發布表單時重設內容
    document.getElementById("publishForm").reset();

    // 重設萌寵選單
    ownedPet.innerHTML =
        '<option value="">請先選擇類型與款式</option>';

    wantedPet.innerHTML =
        '<option value="">請先選擇類型與款式</option>';

    showPetPreview(ownedPetPreview, "");
    showPetPreview(wantedPetPreview, "");
    // 顯示 Modal
    publishModal.classList.add("show");
}


// 關閉發布表單
function closePublishForm() {
    publishModal.classList.remove("show");
}


// 點擊「＋發布」
publishButton.addEventListener("click", openPublishModal);

// 點擊右上角「×」
closePublishModal.addEventListener("click", closePublishForm);

// 點擊「取消」
cancelPublish.addEventListener("click", closePublishForm);

// =========================
// Exchange Rules Modal
// =========================

const rulesButton =
    document.getElementById("rulesButton");

const rulesModal =
    document.getElementById("rulesModal");

const closeRulesModal =
    document.getElementById("closeRulesModal");

const confirmRules =
    document.getElementById("confirmRules");


// Open rules modal
function openRulesModal() {
    rulesModal.classList.add("show");
}


// Close rules modal
function closeRulesModalWindow() {
    rulesModal.classList.remove("show");
}


// Click "交換規則"
rulesButton.addEventListener(
    "click",
    openRulesModal
);


// Click ×
closeRulesModal.addEventListener(
    "click",
    closeRulesModalWindow
);


// Click "我知道了！"
confirmRules.addEventListener(
    "click",
    closeRulesModalWindow
);