<template>
    <div>
        <h1>Posts</h1>
        <div v-if="loadingStatus">Loading...</div>
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
import { onMounted, computed } from "vue"

const store = useStore()

const posts = computed(() => store.state.modulePost.posts)
const loadingStatus = computed(() => store.state.modulePost.loadingStatus)

onMounted(async () => {
    try {
        await fetchData();
    } catch (error) {
        console.log(error)
    } 
});

const fetchData = () => {
    store.dispatch("modulePost/loadPosts")
};

const summary = (val: string) => {
    if (typeof val === "string") {
        return val.substring(0, 20) + "...";
    }
    return val;
};
</script>