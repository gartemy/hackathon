<template>
    <q-page class="q-pa-lg">
      <q-table
      title="Статистика"
      :loading="isLoadingStatistic"
      :data="data"
      :columns="columns"
      :hide-bottom="data.length > 0"
      :rows-per-page-options="[0]"
      no-data-label="Нет данных об отправленных сообщениях"
      wrap-cells
      >
	      <template v-slot:loading>
		      <q-inner-loading
		        color="orange"
		        showing
		      />
	      </template>
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
		async getStatistic() {
			try {
				this.isLoadingStatistic = true;
				const response = await this.$axios.get('/messages/show');
				this.data = response.data.message;
			}
			catch(error) {
				console.error('ERROR GET STATISTIC');
			}
			finally {
				this.isLoadingStatistic = false;
			}
		},
	    generateUserFio(userFio) {
		    let usersList = '';
		    for (let i = 0; i < userFio.length; i++) {
			    if (i === userFio.length - 1) {
				    usersList += `${ userFio[i] } `;
			    }
			    else {
				    usersList += `${ userFio[i] }; `;
			    }
		    }
		    return usersList;
	    },
    },
    async created() {
      await this.getStatistic();
    },
    data() {
      return {
        columns: [
          {
            name: 'messageDate',
            label: 'Дата отправки',
            align: 'center',
            field: 'messageDate',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;',
            format: value => value ? new Date(value).toLocaleString() : 'Не указана',
          },
          {
            name: 'userFio',
            label: 'Кому отправлено',
	        align: 'center',
            field: 'userFio',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;',
	        format: value => this.generateUserFio(value),
          },
          {
            name: 'messageTitle',
            label: 'Тема сообщения',
	        align: 'center',
            field: 'messageTitle',
	        style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;'
          },
          {
            name: 'messageText',
            label: 'Сообщение',
	        align: 'center',
            field: 'messageText',
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
        data: [],
        isLoadingStatistic: false,
      }
    }
  }
  </script>
  