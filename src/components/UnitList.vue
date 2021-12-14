<template>
  <div v-if="selectedFactory">
    <v-data-table
      :headers="headers"
      :items="units"
      sort-by="calories"
      class="elevation-1"
      v-if="units.length > 0"
      ><template v-slot:item.discounted_price="{ item }">
        <v-simple-checkbox
          v-model="item.discounted_price"
          disabled
        ></v-simple-checkbox>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{$t("unit.units")}}</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="darken-1" class="mr-3" @click="back">{{$t("modal.back")}}</v-btn>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark depressed class="mb-2" v-bind="attrs" v-on="on">
                {{$t("unit.new")}}
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
                        color="darken-1"
                        v-model="editedUnit.name"
                        v-bind:label="$t('unit.name')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-dialog
                        ref="start_date_dialog"
                        v-model="start_date_modal"
                        :return-value.sync="editUnit.start_date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            color="darken-1"
                            v-model="editedUnit.start_date"
                            v-bind:label="$t('unit.start_date')"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedUnit.start_date"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="dark"
                            @click="start_date_modal = false"
                          >
                            {{$t("modal.close")}}
                          </v-btn>
                          <v-btn
                            text
                            color="dark"
                            @click="
                              $refs.start_date_dialog.save(
                                editedUnit.start_date
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
                        ref="end_date_dialog"
                        v-model="end_date_modal"
                        :return-value.sync="editUnit.end_date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            color="darken-1"
                            v-model="editedUnit.end_date"
                            v-bind:label="$t('unit.end_date')"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedUnit.end_date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="dark"
                            @click.stop="end_date_modal = false"
                          >
                            {{$t("modal.close")}}
                          </v-btn>
                          <v-btn
                            text
                            color="dark"
                            @click.stop="
                              $refs.end_date_dialog.save(editedUnit.end_date)
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
                        v-model="editedUnit.usage_free"
                        v-bind:label="$t('unit.usage_fee')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox
                        color="dark"
                        v-model="editedUnit.discounted_price"
                        v-bind:label="$t('unit.discounted_price')"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click.stop="close">
                  {{$t("modal.close")}}
                </v-btn>
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
        <v-icon small class="mr-2" @click.stop="editUnit(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click.stop="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <div v-else>
      {{ selectedFactory.name }} {{$t("unit.not_found")}}
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark depressed class="mb-2" v-bind="attrs" v-on="on">
            {{$t("unit.new")}}
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
                    v-model="editedUnit.name"
                    v-bind:label="$t('unit.name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-dialog
                    ref="start_date_dialog"
                    v-model="start_date_modal"
                    :return-value.sync="editUnit.start_date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedUnit.start_date"
                        v-bind:label="$t('unit.start_date')"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedUnit.start_date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="start_date_modal = false"
                      >
                        {{$t("modal.close")}}
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.start_date_dialog.save(editedUnit.start_date)
                        "
                      >
                        {{$t("modal.save")}}
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-dialog
                    ref="end_date_dialog"
                    v-model="end_date_modal"
                    :return-value.sync="editUnit.end_date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedUnit.end_date"
                        v-bind:label="$t('unit.end_date')"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedUnit.end_date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click.stop="end_date_modal = false"
                      >
                        {{$t("modal.close")}}
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click.stop="
                          $refs.end_date_dialog.save(editedUnit.end_date)
                        "
                      >
                        {{$t("modal.save")}}
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedUnit.usage_free"
                    v-bind:label="$t('unit.usage_fee')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-checkbox
                    v-model="editedUnit.discounted_price"
                    v-bind:label="$t('unit.discounted_price')"
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UnitService from "../services/Unit";
import { calculateDay } from "../plugins/utils";
export default {
  data: () => ({
    start_date_modal: false,
    end_date_modal: false,
    start_date_dialog: false,
    end_date_dialog: false,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedUnit: {
      name: "",
      start_date: null,
      end_date: null,
      usage_free: null,
      discounted_price: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? this.$t('unit.new') : this.$t('unit.edit');
    },
    headers(){
      return [
        {
          text: this.$t('unit.name'),
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: this.$t('unit.start_date'), value: "start_date" },
        { text: this.$t('unit.end_date'), value: "end_date" },
        { text: this.$t('unit.days'), value: "day", sortable: true },
        { text: this.$t('unit.usage_fee'), value: "usage_free" },
        { text: this.$t('unit.discounted_price'), value: "discounted_price" },
        { text: this.$t('unit.actions'), value: "actions", sortable: false },
      ];  
    },
    ...mapGetters({
      units: "unit/units",
      selectedFactory: "factory/selectedFactory",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editUnit(item) {
      this.editedIndex = this.units.indexOf(item);
      this.editedUnit = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      UnitService.deleteUnit(item.id).then(() => {});
      this.editedUnit = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.units.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedUnit = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedUnit = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        UnitService.editUnit(this.editedUnit)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
        Object.assign(
          this.units[this.editedIndex],
          calculateDay(this.editedUnit)
        );
      } else {
        this.editedUnit.factory_id = this.selectedFactory.id;
        UnitService.createUnit(this.editedUnit)
          .then((res) => {
            calculateDay(res);
            this.units.push(res);
          })
          .catch((err) => console.log(err));
      }
      this.close();
    },

    back() {
      this.$store.state.unit.units = [];
      this.$store.state.factory.selectedFactory = null;
    },
  },
};
</script>

<style></style>
