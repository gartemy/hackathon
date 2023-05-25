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
      wrap-cells
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
	    @before-show="getUsersForSelect"
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
		      v-model="message.userId"
		      :options="users"
		      option-value="userId"
		      option-label="userFio"
		      multiple
		      label="Пользователи"
		      class="q-mb-md"
	      >
		      <template v-slot:no-option>
			      <q-item>
				      <q-item-section>
					      <q-item-label class="text-grey-5">
						      Пользователи не найдены
					      </q-item-label>
				      </q-item-section>
			      </q-item>
		      </template>
	      </q-select>
	        
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
        sensorId:     null,
	    userId:       null,
        isSms:        false,
        isEmail:      false,
      },
      options: [
        '1', '2', '3', '4', '5'
      ],
      users: [],
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
		      name: 'userFio',
		      label: 'Пользователи',
		      align: 'center',
		      field: 'userFio',
		      style: 'font-size: 1rem; font-weight: 700px;',
		      headerStyle: 'font-size: 1rem; font-weight: 700px;',
		      format: value => value ? this.generateUsersList(value) : '',
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
	  request.userId = this.message.userId.map((user) => user.userId);
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
		for (let i = 0; i < sensors.length; i++) {
			if (i === sensors.length - 1) {
				sensorsList += `№${sensors[i]} `;
			}
			else {
				sensorsList += `№${sensors[i]}; `;
			}
		}
		return sensorsList;
	},
	generateUsersList(users) {
		let usersList = '';
		for (let i = 0; i < users.length; i++) {
			if (i === users.length - 1) {
				usersList += `${users[i]} `;
			}
			else {
				usersList += `${users[i]}; `;
			}
		}
		return usersList;
	},
    async getMessages() {
		try {
			const response = await this.$axios.post('/template/show');
			this.data = response.data.message;
		}
		catch(error) {
			console.error('ERROR GET MESSAGES');
		}
    },
    async getUsersForSelect() {
		try {
			const response = await this.$axios.get('/users/show');
			this.users = response.data.message;
		}
		catch(error) {
			console.error('ERROR GET USERS');
		}
    },
  },
  async created() {
	  await this.getMessages();
  },
}
</script>
