<template>
  <v-data-table
    :headers="headers"
    :items="factories"
    sort-by="calories"
    class="elevation-1"
    @click:row="selectFactory"
    v-if="units.length == 0"
  ><template v-slot:item.special_member="{ item }">
        <v-simple-checkbox
          v-model="item.special_member"
          disabled
        ></v-simple-checkbox> </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{$t("factory.factories")}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark depressed v-bind="attrs" v-on="on">
              {{$t("factory.new")}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      v-bind:label="$t('factory.name')"
                      color="darken-1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-dialog
                      color="darken-1"
                      ref="membership_exp_dialog"
                      v-model="exp_date_modal"
                      :return-value.sync="editItem.membership_expiration_date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          color="darken-1"
                          v-model="editedItem.membership_expiration_date"
                          v-bind:label="$t('factory.membership_exp_date')"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.membership_expiration_date"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="dark"
                          @click="exp_date_modal = false"
                        >
                          {{$t("modal.close")}}
                        </v-btn>
                        <v-btn
                          text
                          color="darken-1"
                          @click="
                            $refs.membership_exp_dialog.save(
                              editedItem.membership_expiration_date
                            )
                          "
                        >
                          {{$t("modal.save")}}
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-dialog
                      ref="membership_dialog"
                      v-model="date_modal"
                      :return-value.sync="editItem.membership_date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          color="darken-1"
                          v-model="editedItem.membership_date"
                          v-bind:label="$t('factory.membership_date')"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.membership_date"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="dark" @click.stop="date_modal = false">
                          {{$t("modal.close")}}
                        </v-btn>
                        <v-btn
                          text
                          color="dark"
                          @click.stop="
                            $refs.membership_dialog.save(
                              editedItem.membership_date
                            )
                          "
                        >
                          {{$t("modal.save")}}
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      color="darken-1"
                      v-model="editedItem.number_of_employees"
                      v-bind:label="$t('factory.number_of_employees')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      color="dark"
                      v-model="editedItem.special_member"
                      v-bind:label="$t('factory.special_member')"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="darken-1" text @click.stop="close"> {{$t("modal.close")}} </v-btn>
              <v-btn color="darken-1" text @click.stop="save"> {{$t("modal.save")}} </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >{{$t("modal.deleteitem")}}</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="darken-1" text @click.stop="closeDelete"
                >{{$t("modal.close")}}</v-btn
              >
              <v-btn color="darken-1" text @click.stop="deleteItemConfirm"
                >{{$t("modal.delete")}}</v-btn
              >
              
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click.stop="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click.stop="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import FactoryService from "../services/Factory";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    exp_date_modal: false,
    date_modal: false,
    membership_exp_dialog: false,
    membership_dialog: false,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      membership_expiration_date: null,
      membership_date: null,
      number_of_employees: null,
      special_member: false,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? this.$t('factory.new') : this.$t('factory.edit');
    },
    headers() {
      return [
        {
          text: this.$t('factory.name'),
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: this.$t('factory.membership_exp_date'), value: "membership_expiration_date" },
        { text: this.$t('factory.membership_date'), value: "membership_date" },
        { text: this.$t('factory.number_of_employees'), value: "number_of_employees" },
        { text: this.$t('factory.special_member'), value: "special_member" },
        { text: this.$t('factory.actions'), value: "actions", sortable: false },
      ];
    },
    ...mapGetters({factories: "factory/factories", units: "unit/units"}),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.$store.dispatch("factory/getFactories");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.factories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.factories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      FactoryService.deleteFactory(this.editedItem.id)
        .then(() => {
          this.closeDelete();
          this.$store.dispatch("factory/getFactories");
        })
        .catch((err) => {
          console.log(err);
        });
      this.factories.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        FactoryService.editFactory(this.editedItem)
          .then(() => {
            
          })
          .catch((err) => {
            console.log(err);
          });
          Object.assign(this.factories[this.editedIndex], this.editedItem);
      } else {
        FactoryService.createFactory(this.editedItem)
          .then((res) => {
            this.factories.push(res);
          })
          .catch((err) => console.log(err));
      }
      this.close();
    },

    selectFactory(factory) {
      this.$store.dispatch("unit/getUnits", factory.id);
      this.$store.state.factory.selectedFactory = factory;
    },
  },
};
</script>

<style></style>
