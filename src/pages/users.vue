<template>
  <q-page class="q-pa-lg">
    <q-btn
	    text-color="black"
	    label="Добавить пользователя"
	    class="q-mb-lg bg-accent"
	    @click="isVisiblUser = !isVisiblUser"
    />

    <q-table
      title="Пользователи"
      :data="data"
      :columns="columns"
      row-key="name"
      :hide-bottom="data.length > 0"
      no-data-label="Данные о пользователях не найдены"
      :rows-per-page-options="[0]"
    >
	    <template v-slot:body-cell-number="props">
		    <q-td :props="props">
			    {{ props.rowIndex + 1 }}
		    </q-td>
	    </template>
    </q-table>

    <q-dialog v-model="isVisiblUser">
      <q-card style="width: 500px; max-width: 90vw;" class="bg-white">
        <q-card-section class="row items-center">
          <div class="col text-h5">Добавление пользователя</div> 
          
          <div class="col-auto">
            <q-btn
              v-close-popup
              icon="fas fa-times"
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
	          v-model="message.name"
	          label="ФИО пользователя"
	          class="q-mb-md"
          />
          <q-input
	          v-model="message.email"
	          label="Email пользователя"
	          class="q-mb-md"
          />
	        
          <q-input
	          v-model="message.telephoneNumber"
	          label="Номер телефона"
	          class="q-mb-md"
          />
	        
          <q-select
            v-model="message.sensors"
            :options="options"
            multiple
            label="Датчики"
            class="q-mb-lg"
          />
	        
          <q-btn
	          color="orange"
	          text-color="black"
	          label="Добавить пользователя"
	          class="full-width"
	          @click="addMessage()"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
  
<script>
export default {
  name: 'PageUsers',
  data() {
    return {
      isVisiblUser: false,
      options: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'
      ],
      columns: [
        {
          name: 'number',
          label: 'Номер',
          align: 'center',
          field: 'number',
          headerStyle: 'font-size: 1rem; font-weight: 700;',
          style: 'font-size: 1rem;'
        },
        {
          name: 'name',
          required: true,
          label: 'ФИО пользователя',
          align: 'center',
          field: 'name',
	      headerStyle: 'font-size: 1rem; font-weight: 700;',
	      style: 'font-size: 1rem;'
        },
        {
          name: 'telephoneNumber',
          required: true,
          label: 'Номер телефона',
          align: 'center',
          field: 'telephoneNumber',
	      headerStyle: 'font-size: 1rem; font-weight: 700;',
	      style: 'font-size: 1rem;'
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'center',
          field: 'email',
	      headerStyle: 'font-size: 1rem; font-weight: 700;',
	      style: 'font-size: 1rem;'
        },
        {
          name: "sensors",
          label: "Датчики",
          align: "center",
          field: "sensors",
	      headerStyle: 'font-size: 1rem; font-weight: 700;',
	      style: 'font-size: 1rem;'
        },
      ],
      data: [],
      message: {
        name: null,
        telephoneNumber: null,
        email: null,
        sensors: null
      },
    }
  },
  methods: {
    closeMessageDialog() {
      this.message.subject = null
      this.message.body = null
      this.message.sensors = null
    },
    async addMessage() {
	  const request = {
		  ...this.message,
	  };
	  try {
		  const response = await this.$axios.post('/');
		  this.data.push({
			  ...this.message,
			  userId: response.data.message.userId,
		  });
		  this.isVisibl = false;
		  this.closeMessageDialog();
	  }
	  catch(error) {
		  console.error('ERROR ADD USER');
	  }
    },
    async getUsers() {
		try {
			const response = await this.$axios.post('/')
			this.data = response.data.message;
		}
		catch(error) {
			console.error('ERROR GET USERS');
		}
    },
  },
  async created() {
	  await this.getUsers();
  },
}
</script>
