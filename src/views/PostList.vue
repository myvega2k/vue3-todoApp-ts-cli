<template>
    <div>
        <h1>Posts</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-for="post in posts" :key="post.id">
                <router-link :to="{ name: 'post', params: { id: post.id } }">
                    [ID: {{ post.id }}] {{ summary(post.text) }}
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex"
import { ref, onMounted, computed } from "vue"

const store = useStore()
const loading = ref(true)

const posts = computed(() => store.state.modulePost.posts)

onMounted(async () => {
    try {
        loading.value = true;
        await fetchData();
    } catch (error) {
        console.log(error)
    } finally {
        setTimeout(() => {
            loading.value = false;
        }, 1000);

    }
});

const fetchData = () => {
    store.dispatch("modulePost/loadPosts")
    // .then(() => {
    //     loading.value = false;
    // });
};

const summary = (val: string) => {
    if (typeof val === "string") {
        return val.substring(0, 20) + "...";
    }
    return val;
};
</script>