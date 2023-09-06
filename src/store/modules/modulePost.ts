import { Module } from "vuex"
import { RootState } from "../index"
import Post from "@/types/Post"
import http from "@/common/http-common"

export interface ModulePostState {
    posts: Post[]
    post: Post
}

export const modulePost: Module<ModulePostState, RootState> = {
    namespaced: true,
    state: () => ({
        posts: [],
        post: { id: 0, text: '' }
    }),
    mutations: {
        setPosts(state: ModulePostState, items: Post[]) {
            state.posts = items;
        },
        setPost(state: ModulePostState, item: Post) {
            state.post = item;
        },
    }, //mutations
    getters: {
        getPosts(state: ModulePostState) {
            return state.posts;
        },
        getPost(state: ModulePostState) {
            return state.post;
        },
    }, //getters
    actions: {
        loadPosts({ commit }) {
            http
                .get(`/posts`)
                .then((res) => res.data)
                .then((items) => commit("setPosts", items))
                .catch((err) => console.error(err));
        },
        loadPost({ commit }, payload: Post) {
            http
                .get(`/posts/${payload.id}`)
                .then((res) => res.data)
                .then((item) => commit("setPost", item))
                .catch((err) => console.error(err));
        },
        removePost({ commit }, id: number) {
            http
                .delete(`/posts/${id}`)
                .then((res) => res.data)
                .then((items) => commit("setPosts", items))
                .catch((err) => console.error(err));
        },
        addPost({ commit }, payload: Post) {
            http
                .post(`/posts`, payload)
                .then((res) => res.data)
                .then((items) => commit("setPosts", items))
                .catch((err) => console.error(err));
        },
    } //actions
}