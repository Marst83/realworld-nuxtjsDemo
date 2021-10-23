<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li v-if="user" class="nav-item">
                  <nuxt-link
                    :class="{ active: tab === 'your_feed' }"
                    class="nav-link"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'your_feed',
                      },
                    }"
                    exact
                    >Your Feed</nuxt-link
                  >
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 'global_feed' }"
                    :to="{
                      name: 'home',
                    }"
                    exact
                    >Global Feed</nuxt-link
                  >
                </li>
                <li v-if="tag" class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 'tag' }"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'tag',
                        tag: tag,
                      },
                    }"
                    exact
                  >
                    # {{ tag }}</nuxt-link
                  >
                </li>
              </ul>
            </div>

            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
                    class="author"
                    >{{ article.author.username }}</nuxt-link
                  >
                  <span class="date">{{
                    article.createdAt | date("MMM DD, YYYY")
                  }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{ active: article.favorited }"
                  @click="onfavarite(article)"
                  :disabled="article.favoriteDisabled || !user"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
            <nav>
              <ul class="pagination">
                <li
                  class="page-item"
                  :class="{ active: item === page }"
                  v-for="item in totalPage"
                  :key="item"
                >
                  <nuxt-link
                    class="page-link"
                    :to="{
                      name: 'home',
                      query: {
                        page: item,
                        tag: $route.query.tag,
                        tab: tab,
                      },
                    }"
                    >{{ item }}</nuxt-link
                  >
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>
              <div class="tag-list">
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      tag: item,
                      tab: 'tag',
                    },
                  }"
                  class="tag-pill tag-default"
                  v-for="item in tags"
                  :key="item"
                  >{{ item }}</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getYourFeedArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  name: "HomePage",
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 50;
    const tag = query.tag;
    const tab = query.tab || "global_feed";
    const loadArticles =
      store.state.user && tab === "your_feed"
        ? getYourFeedArticles
        : getArticles;
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    articles.forEach((article) => (article.favoriteDisabled = false));
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"]),
  },
  methods: {
    async onfavarite(article) {
      article.favoriteDisabled = true; // 禁用点击
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false; // 允许点击
    },
  },
};
</script>

<style></style>
