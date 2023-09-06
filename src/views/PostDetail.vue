<template>
    <div>
        <h2>View Post</h2>
        <div v-if="loading">Loading...</div>
        <div v-if="post">
            <h3>[ID: {{ post.id }}]</h3>
            <div>{{ post.text }}</div>
            <button v-on:click="removePost(post.id)">Delete</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"

const router = useRouter();
const route = useRoute();
const store = useStore();

const loading = ref(false);
const post = computed(() => store.state.modulePost.post);

onBeforeMount(() => {
    fetchData();
});
const removePost = (id: number) => {
    console.log('-----------------removePost' + id)
    store.dispatch("modulePost/removePost", id);
    router.push("/posts");
};
const fetchData = () => {
    loading.value = true;
    if (route.params.id) {
        store.dispatch("modulePost/loadPost", { id: +route.params.id }).then(() => {
            loading.value = false;
        });
    }
};

// route.params.id 값이 변경되는 것을 watch 한다
watch(() => route.params.id, fetchData)

</script>

<style scoped>
button {
    margin: 1rem 0;
}
</style>    