<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages" v-if="errors">
            <div v-for="(value, field) in errors" :key="field">
              <li v-for="error in value" :key="error">
                {{ field }} {{ error }}
              </li>
            </div>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                  required
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.prevent="handleSubmit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { updateUser } from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "Settings",
  middleware: "authenticated",
  data() {
    return {
      user: {
        bio: "",
        email: "",
        image: "",
        password: "",
        username: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapState({ storeUser: "user" }),
  },

  mounted() {
    this.user.bio = this.storeUser.bio;
    this.user.email = this.storeUser.email;
    this.user.image = this.storeUser.image;
    this.user.password = this.storeUser.password;
    this.user.username = this.storeUser.username;
  },

  methods: {
    async handleSubmit() {
      try {
        const { data } = await updateUser({
          user: this.user,
        });
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        this.$router.push(`/profile/${data.user.username}`);
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    },
    logout() {
      this.$store.commit("setUser", null);
      Cookie.set("user", null);
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
