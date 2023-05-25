<template>
  <q-page class="q-pa-md">

    <q-btn
	    color="orange"
	    text-color="black"
	    label="Добавить сообщение"
	    class="q-my-md"
	    @click="isVisibl = !isVisibl"
    />

    <q-table
      title="Шаблоны сообщений"
      :data="data"
      :columns="columns"
      row-key="name"
      no-data-label="Шаблоны сообщений не найдены"
      :hide-bottom="data.length > 0"
      :rows-per-page-options="[0]"
    >
	    <template v-slot:body-cell-number="props">
		    <q-td :props="props">
			    {{ props.rowIndex + 1 }}
		    </q-td>
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

    <q-dialog
	    v-model="isVisibl"
	    @before-hide="closeMessageDialog"
    >
      <q-card style="width: 500px; max-width: 90vw;" class="bg-white">
        <q-card-section class="row items-center">
          <div class="col text-h5">Добавление сообщения</div> 
          
          <div class="col-auto">
            <q-btn
              v-close-popup
              icon="close"
              color="dark"
              flat
              dense
              round
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input
	          v-model="message.messageTitle"
	          label="Тема сообщения"
	          class="q-mb-md"
          />
	        
          <q-input
	          v-model="message.messageText"
	          label="Сообщение"
	          autogrow
	          class="q-mb-md"
          />
	        
	       <q-select
		       v-model="message.sensorId"
		       multiple
		       :options="options"
		       label="Датчики"
		       class="q-mb-md"
	       />
	        
	        <div class="row items-center q-col-gutter-md q-mb-md">
		        <div>
			        <q-checkbox
				        v-model="message.isSms"
				        label="Отправить Sms"
			        />
		        </div>
		        
		        <div>
			        <q-checkbox
				        v-model="message.isEmail"
				        label="Отправить на Email"
			        />
		        </div>
	        </div>
	        
	        <q-btn
		        color="orange"
		        text-color="black"
		        label="Добавить"
		        class="full-width"
		        @click="addMessage"
	        />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data() {
    return {
      message: {
        messageTitle: null,
        messageText:  null,
        sensorId:      null,
        isSms:        false,
        isEmail:      false,
      },
      options: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'
      ],
      isVisibl: false,
      columns: [
          {
            name: 'number',
            label: 'Номер',
            align: 'center',
            field: 'number',
            style: 'font-size: 1rem; font-weight: 700px;',
            headerStyle: 'font-size: 1rem; font-weight: 700px;',
          },
          {
            name: 'messageTitle',
            label: 'Тема',
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
            name: 'sensorId',
            label: 'Датчики',
            align: 'center',
            field: 'sensorId',
            style: 'font-size: 1rem; font-weight: 700px;',
	        headerStyle: 'font-size: 1rem; font-weight: 700px;',
            format: value => value ? this.generateSensorsList(value) : '',
          },
	      {
		      name: 'isSms',
		      label: 'Отправка SMS',
		      align: 'center',
		      field: 'isSms',
		      style: 'font-size: 1rem; font-weight: 700px;',
		      headerStyle: 'font-size: 1rem; font-weight: 700px;'
	      },
	      {
		      name: 'isEmail',
		      label: 'Отправка Email',
		      align: 'center',
		      field: 'isEmail',
		      style: 'font-size: 1rem; font-weight: 700px;',
		      headerStyle: 'font-size: 1rem; font-weight: 700px;'
	      },
      ],
      data: [],
    }
  },
  methods: {
    closeMessageDialog() {
      for (const field in this.message) {
		  this.message[field] = null;
      }
	  this.message.isSms = false;
	  this.message.isEmail = false;
    },
    async addMessage() {
	  const request = {
		  ...this.message,
	  };
	  try {
		  const response = await this.$axios.post('/template/add', request);
		  this.data.push({
			  ...this.message,
			  messageId: response.data.message.messageTemplateId,
		  });
		  this.isVisibl = false;
		  this.closeMessageDialog();
	  }
	  catch(error) {
		  console.error('ERROR ADD MESSAGE');
	  }
    },
	generateSensorsList(sensors) {
		let sensorsList = '';
		sensors.map((sensor, index) => {
			if (index !== sensors.length - 1) {
				sensorsList += `№${sensor}; `;
			}
			else {
				sensorsList += `№${sensor}`;
			}
		});
		
		return sensorsList;
	},
    async getMessages() {
		try {
			const response = await this.$axios.post('/template/show');
			this.data = response.data.message;
		}
		catch(error) {
			console.error('ERROR GET MESSAGES');
		}
    }
  },
  async created() {
	  await this.getMessages();
  },
}
</script>
