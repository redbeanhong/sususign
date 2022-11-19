<template>
  <div id="document">
    <div class="container wrap-padding">
      <div class="doc-head row mb-2">
        <ul>
          <li class="btn-menu mr-3">已建立(0)</li>
          <li class="btn-menu mr-3">已簽核(0)</li>
          <li class="btn-menu unselect">已完成(0)</li>
        </ul>
        <div>
          <input accept=".pdf" type="file" id="uploadPDF" hidden />
          <label for="uploadPDF" class="btn-add">
            <img src="@/assets/img/icon/iconAdd.png" alt="add" />
            <p>新增</p>
          </label>
        </div>
      </div>
      <div class="doc-filters row mb-2">
        <ul class="filter-tags">
          <li class="tag mr-2 active">全部</li>
          <li class="tag mr-2">即將到期</li>
          <li class="tag">KOL合作</li>
        </ul>
        <div class="doc-tool">
          <input
            type="text"
            id="input-search"
            placeholder="搜尋"
            class="mr-2"
          />
          <label for="input-search">
            <img
              class="icon"
              src="@/assets/img/icon/iconSearch.png"
              alt="search"
            />
          </label>
          <div>
            <img
              class="icon"
              src="@/assets/img/icon/iconHorizontal.png"
              alt="horizontal"
            />
          </div>
        </div>
      </div>
      <ul class="row">
        <li class="doc mb-2">
          <div class="doc-head">
            <img class="mr-2" src="@/assets/img/Mask group.png" alt="test" />
            <div class="doc-head-content">
              <h3 class="mb-1">Ima Made 今時日製</h3>
              <p class="mb-1"><small>2022 - 10 - 26</small></p>
              <ul>
                <li class="tag disabled mr-2">即將到期</li>
                <li class="tag disabled">KOL合作</li>
              </ul>
            </div>
          </div>
          <ul class="doc-status">
            <li class="doc-status-tag">上傳檔案</li>
            <li class="doc-status-tag active">簽核中</li>
            <li class="doc-status-tag last">完成!</li>
          </ul>
          <div class="btn-edit">
            <img class="icon" src="@/assets/img/icon/iconEdit.png" alt="edit" />
            編輯
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
