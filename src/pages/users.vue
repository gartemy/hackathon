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
      :hide-bottom="data.length > 0"
      no-data-label="Данные о пользователях не найдены"
      :rows-per-page-options="[0]"
      wrap-cells
    >
	    <template v-slot:body-cell-number="props">
		    <q-td :props="props">
			    {{ props.rowIndex + 1 }}
		    </q-td>
	    </template>
    </q-table>

    <q-dialog v-model="isVisiblUser" @before-hide="closeUserDialog">
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
	          v-model="message.userFio"
	          label="ФИО пользователя"
	          class="q-mb-md"
          />
          <q-input
	          v-model="message.userEmail"
	          label="Email пользователя"
	          class="q-mb-md"
          />
	        
          <q-input
	          v-model="message.userPhone"
	          label="Номер телефона"
	          mask="+7 (###) ###-##-##"
	          fill-mask
	          class="q-mb-lg"
          />
	        
          <q-btn
	          color="orange"
	          text-color="black"
	          label="Добавить пользователя"
	          class="full-width"
	          @click="addUser"
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
        '1', '2', '3', '4', '5',
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
          name: 'userFio',
          label: 'ФИО пользователя',
          align: 'center',
          field: 'userFio',
	      headerStyle: 'font-size: 1rem; font-weight: 700;',
	      style: 'font-size: 1rem;',
        },
        {
          name: 'userPhone',
          label: 'Номер телефона',
          align: 'center',
          field: 'userPhone',
	      headerStyle: 'font-size: 1rem; font-weight: 700;',
	      style: 'font-size: 1rem;'
        },
        {
          name: 'userEmail',
          label: 'Email',
          align: 'center',
          field: 'userEmail',
	      headerStyle: 'font-size: 1rem; font-weight: 700;',
	      style: 'font-size: 1rem;'
        },
      ],
      data: [],
      message: {
        userFio: null,
        userPhone: null,
        userEmail: null,
      },
    }
  },
  methods: {
    closeUserDialog() {
      this.message.userFio = null
      this.message.userPhone = null
      this.message.userEmail = null
    },
    async addUser() {
      const request = {
        ...this.message,
      };
      try {
        const response = await this.$axios.post('/users/create', request);
        this.data.push({
          ...this.message,
          userId: response.data.message.userId,
        });
        this.isVisiblUser = false;
        this.closeUserDialog();
      }
      catch(error) {
        console.error('ERROR ADD USER');
      }
    },
    async getUsers() {
      try {
        const response = await this.$axios.get('/users/show')
        this.data = response.data.message;
        console.log(response.data.message);
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
