<template>
  <q-page class="q-pa-md">
    <q-btn color="orange" text-color="black" label="Добавить пользователя" class="q-ma-md" @click="isVisiblUser = !isVisiblUser"/>

    <q-table
      title="Пользователи"
      :data="data"
      :columns="columns"
      row-key="name"
      :hide-bottom="data.length > 0"
      :rows-per-page-options="[0]"
    />  

    <q-dialog v-model="isVisiblUser">
      <q-card style="width: 500px; max-width: 90vw;" class="bg-white">
        <q-card-section class="row items-center">
          <div class="col text-h5">Добавление пользователя</div> 
          
          <div class="col-auto">
            <q-btn
              v-close-popup
              icon="close"
              color="dark"
              flat
            />
          </div>
          
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input v-model="message.name" placeholder="ФИО"/>
          <q-input v-model="message.email_telephone" placeholder="Email/телефон"/>
          <div style="display: flex" class="q-ma-md">
            <q-select
            filled
            multiple
            :options="options"
            label="Датчики"
            style="width: 250px"
            v-model="message.sensors"
            /> 
            <q-btn color="orange" text-color="black" label="Добавить" class="q-ml-md"/>
          </div>
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
      message: {
        name: null,
        email_telephone: null,
        sensors: null,
      },
      options: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'
      ],
      columns: [
        {
          name: 'number',
          label: 'Номер',
          align: 'left',
          field: 'number',
          style: 'width: 1%',
        },
        {
          name: 'subject',
          required: true,
          label: 'Фио',
          align: 'left',
          field: 'subject',
          style: 'width: 30%',
        },
        {
          name: 'body',
          required: true,
          label: 'Номер телефона',
          align: 'left',
          field: 'body',
          style: 'width: 40%',
        },
        {
          name: 'sensors',
          required: true,
          label: 'Email',
          align: 'left',
          field: 'sensors',
        }
      ],
      data: [
        {
          number: 1,
          subject: "wdf", 
          body: "шапгыр",
          sensors: "sensors"
        },
        {
          number: 2,
          subject: "wdf", 
          body: "шапгыр",
          sensors: "sensors"
        },
        {
          number: 3,
          subject: "wdf", 
          body: "шапгыр",
          sensors: "sensors"
        },
        {
          number: 4,
          subject: "wdf", 
          body: "шапгыр",
          sensors: "sensors"
        },
      ]
    }
  },
  methods: {
    closeMessageDialog() {
      this.message.subject = null
      this.message.body = null
      this.message.sensors = null
    },
    addMessage() {
      this.data.push({
        number: this.data.length + 1,
        ...this.message,
      })
      this.isVisibl = false
      this.closeMessageDialog()
    }
  }
}
</script>
