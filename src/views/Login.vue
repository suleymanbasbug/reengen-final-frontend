<template>
  <v-app>
    <v-main>
      <section class="grey lighten-4 py-12">
        <v-container>
          <v-row>
            <v-col class="d-flex justify-center mb-6">
              <v-card flat outlined>
                <v-tabs
                  v-model="tab"
                  active-class="white"
                  height="40"
                  background-color="grey lighten-2"
                  fixed-tabs
                  hide-slider
                  color="darken-1"
                >
                  <v-tab>{{ $t("login.login") }}</v-tab>
                  <v-tab>{{ $t("login.signup") }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item :value="0">
                    
                    <v-card flat outlined>
                      <v-card-text>
                        <h1
                          class="headline font-weight-bold grey--text text--darken-3"
                        >
                          {{ $t("login.allreadyacc") }}
                        </h1>
                        
                      </v-card-text>
                      <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                          <v-text-field
                            prepend-icon="mdi-email"
                            validate-on-blur
                            clearable
                            dense
                            outlined
                            v-model="email"
                            :rules="[rules.emailRequired, rules.email]"
                            v-bind:label="$t('login.entermail')"
                            type="email"
                            required
                            color="darken-1"
                          />
                          <v-text-field
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.passwordRequired, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            counter
                            @click:append="show1 = !show1"
                            prepend-icon="mdi-lock"
                            dense
                            outlined
                            v-model="password"
                            v-bind:label="$t('login.enterpass')"
                            required
                            color="darken-1"
                          />
                          <v-checkbox
                            v-model="rememberMe"
                            v-bind:label="$t('login.rememberme')"
                            color="darken-1"
                            hide-details
                          ></v-checkbox>
                          <v-row
                            align="center"
                            justify="space-around"
                            class="mt-3"
                          >
                            <v-btn depressed dark @click="login">{{
                              $t("login.login")
                            }}</v-btn>
                          </v-row>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item :value="1">
                    <form>
                      <v-card-text>
                        <v-text-field
                          v-model="name"
                          :counter="365"
                          v-bind:label="$t('login.name')"
                          required
                          color="darken-1"
                        ></v-text-field>
                        <v-text-field
                          dense
                          outlined
                          label="Email"
                          type="email"
                          v-model="registeremail"
                          color="darken-1"
                        />
                        <v-text-field
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.passwordRequired, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          counter
                          @click:append="show1 = !show1"
                          prepend-icon="mdi-lock"
                          dense
                          outlined
                          v-model="registerpassword"
                          v-bind:label="$t('login.enterpass')"
                          required
                          color="darken-1"
                        />
                        <v-checkbox
                          v-model="isAdmin"
                          v-bind:label="$t('login.isadmin')"
                          color="dark"
                          hide-details
                        ></v-checkbox>
                        <v-row
                          align="center"
                          justify="space-around"
                          class="mt-3"
                        >
                          <v-btn dark depressed @click="register">{{
                            $t("login.createacc")
                          }}</v-btn>
                        </v-row>
                      </v-card-text>
                    </form>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<script>
import validator from "@/mixins/validator";
export default {
  mixins: [validator],
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },

  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      if (this.rememberMe) {
        localStorage.setItem("email", this.email);
        localStorage.setItem("password", this.password);
      }
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/");
        });
    },

    register(){
      this.$store
        .dispatch("auth/register", {
          name: this.name,
          email: this.registeremail,
          password: this.registerpassword,
          isAdmin: this.isAdmin,
        })
        .then(() => {
          this.$router.push("/");
        });
    }
  },
  data: () => ({
    loading: false,
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,

    name: "",
    email: localStorage.getItem("email") || "sede@sede.com",
    password: localStorage.getItem("password") || "94390243Abc.",
    registeremail: "",
    registerpassword: "",
    verify: "",
    isAdmin: true,
    rememberMe: true,
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
};
</script>

<style></style>
