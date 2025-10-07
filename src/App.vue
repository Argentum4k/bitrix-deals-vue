<script setup>
import { ref, onMounted } from "vue";
import { NLayout, NLayoutHeader, NLayoutContent, NDataTable } from "naive-ui";
import { getBitrixAuth, callRest } from "./bitrix.js";
import { BX24 } from 'bx24';
const bx24 = new BX24(window, parent);
// bx24.getAuth().then(function(auth) {   console. log(auth); });

const loading = ref(true);
const deals = ref([]);
// const auth = getBitrixAuth();
// const auth = {}//await bx24.getAuth();// если тут раскоментить то не работает
// console.log(auth);

const pagination = {
  pageSize: 20
};

const columns = [
  { title: "ID", key: "ID", width: 80, sorter: 'default' },
  { title: "Название", key: "TITLE" },
  { title: "Стадия", key: "STAGE_ID" },
  { title: "Сумма", key: "OPPORTUNITY" },
  { title: "Ответственный", key: "ASSIGNED_BY_ID" },
];


onMounted(async () => {
  console.log("onMounted");
  const auth = await bx24.getAuth();
  console.log(auth);
  const res = await callRest("crm.deal.list",
      { select: ["ID", "TITLE", "STAGE_ID", "OPPORTUNITY", "ASSIGNED_BY_ID"], order: { ID: "DESC" } }, auth);
  deals.value = res.result || [];
  loading.value = false;
});
</script>


<template>
  <n-layout>
    <n-layout-header bordered>
      <h2 style="margin: 0; padding: 8px;">CRM сделки</h2>
    </n-layout-header>

    <n-layout-content style="padding: 16px;">
      <n-data-table
          :columns="columns"
          :data="deals"
          :pagination="pagination"
          :loading="loading"
          bordered
          striped
      />
    </n-layout-content>
  </n-layout>
</template>