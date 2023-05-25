<template>
    <q-page class="q-pa-lg">
      <q-table
      title="Статистика"
      :data="data"
      :columns="columns"
      row-key="name"
      :hide-bottom="data.length > 0"
      :rows-per-page-options="[0]"
      wrap-cells
      >
	      <template v-slot:body-cell-isSms="props">
		      <q-td :props="props">
			      <q-icon
				      :name="props.value ? 'fas fa-circle-check' : 'fas fa-circle-minus'"
				      :color="props.value ? 'positive' : 'negative'"
				      size="sm"
			      />
		      </q-td>
	      </template>
	      
	      <template v-slot:body-cell-isEmail="props">
		      <q-td :props="props">
			      <q-icon
				      :name="props.value ? 'fas fa-circle-check' : 'fas fa-circle-minus'"
				      :color="props.value ? 'positive' : 'negative'"
				      size="sm"
			      />
		      </q-td>
	      </template>
      </q-table>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'PageStatistic',
    methods: {

    },
    created: {
      
    },
    data() {
      return {
        columns: [
          {
            name: 'date',
            label: 'Дата отправки',
            align: 'center',
            field: 'date',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;'
          },
          {
            name: 'mans',
            label: 'Пользователи',
	        align: 'center',
            field: 'mans',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;'
          },
          {
            name: 'team',
            label: 'Тема сообщения',
	        align: 'center',
            field: 'team',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;'
          },
          {
            name: 'messages',
            label: 'Сообщение',
	        align: 'center',
            field: 'messages',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;'
          },
          {
            name: 'isEmail',
            label: 'Отправлено Email',
	        align: 'center',
            field: 'isEmail',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;'
          },
          {
            name: 'isSms',
            label: 'Отправлено SMS',
            align: 'center',
            field: 'isSms',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;'
          }
        ],
        data: [
          {
            date: '25.05.23',
            mans: "Баталин Дмитрий Андреевич", 
            team: "Поломка",
            messages: "Сломалось все, переделывай ",
            email: "email@vk.com",
            telephoneNumber: "89222222222",
          },
        ]
      }
    }
  }
  </script>
  