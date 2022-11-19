<template>
  <div id="config">
    <div class="container wrap-padding">
      <div class="row">
        <aside>
          <ul class="config-aside mr-3">
            <li>
              <RouterLink to="/config/signs" class="btn-menu menu-big mb-2">
                簽名
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/config/tags" class="btn-menu menu-big">
                標籤
              </RouterLink>
            </li>
          </ul>
        </aside>
        <div class="config-content">
          <RouterView />
        </div>
      </div>
      <div class="config-cotent"></div>
    </div>
  </div>
</template>
