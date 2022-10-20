<template>
  <h4>Posts</h4>
  <button @click="unlink">Unlink</button>
  <pre>{{ posts }}</pre>
</template>

<script setup>
import { computed } from "vue";
import { useRepo } from "pinia-orm";

import { Post, Comment } from "./models.js";

const posts = computed(() => useRepo(Post).query().withAllRecursive(1).get());

useRepo(Post).save({
  id: 1,
  user: {
    id: 1,
    username: "wanda",
  },
  body: "Hello wanda",
});
useRepo(Comment).save({
  id: 1,
  user: {
    id: 1,
    username: "wanda",
  },
  post: {
    id: 1,
  },
});

function unlink() {
  useRepo(Comment).save({
    id: 1,
    post: null,
  });

  // The expected behavior here is if `post` is null on save, pinia-orm should not retain the `postId`.
  // The current undesired behavior is `postId` is still 1, causing pinia-orm to show the relationship still exists.
  console.log(JSON.stringify(useRepo(Comment).find(1), null, 2));
}
</script>
