<template>
  <div>
    <div class="col-xs-12 col-md-8 offset-md-2">
      <p style="display: inherit">
        <nuxt-link to="/login">Sign in</nuxt-link> or
        <nuxt-link to="/register">sign up</nuxt-link> to add comments on this
        article.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleUnlogin",
};
</script>