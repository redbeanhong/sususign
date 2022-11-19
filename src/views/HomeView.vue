<template>
  <div id="home">
    <div class="container wrap-padding">
      <div class="row home-content">
        <ul class="col-12 col-xl-6">
          <li class="card">
            <img src="@/assets/img/home/step1.png" alt="step1" />
            <p>
              Step 1. <br /><br />
              上傳需要添加簽名的PDF或JPG檔案。
            </p>
          </li>
          <li class="card">
            <img src="@/assets/img/home/step2.png" alt="step1" />
            <p>
              Step 2.<br /><br />
              利用數速簽線上簽名，手寫、打字輸入及圖片的方式完成。
            </p>
          </li>
          <li class="card">
            <img src="@/assets/img/home/step3.png" alt="step1" />
            <p>
              Step 3. <br /><br />
              簽名完成！即可立即下載，傳送檔案給對方。
            </p>
          </li>
        </ul>
        <div class="col-12 col-xl-6">
          <div class="upload">
            <img src="@/assets/img/home/upload.png" alt="upload" />
            <input accept=".pdf" type="file" id="uploadPDF" hidden />
            <label for="uploadPDF" class="btn btn-primary mb-1">選取檔案</label>
            <p>拖曳上傳</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
