<template>
  <v-app>
    <v-app-bar app dark color="purple">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ $t("сurrencyConverter") }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" text icon color="red lighten-2" @click="changeLang">
        <v-icon>mdi-flag</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="goToPage('Converter')">
            <v-list-item-title>{{ $t("converter") }}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="goToPage('Сurrencies')">
            <v-list-item-title>{{ $t("currencies") }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    goToPage(name) {
      this.$router.push({ name });
    },
    changeLang() {
      if (this.$i18n.locale === "ru") {
        this.$i18n.locale = "en";
        return;
      }
      this.$i18n.locale = "ru";
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style>
.v-app-bar-title__content {
  width: 500px;
}
</style>
