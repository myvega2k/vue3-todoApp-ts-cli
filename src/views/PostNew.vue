<template>
    <div>
        <h2>New Post</h2>
        <form @submit.prevent="onSubmit">
            <textarea cols="30" rows="10" :value="inputTxt" 
                @input="handleInput" :disabled="disabled">
            </textarea>
            <br />
            <input type="submit" :value="btnTxt" :disabled="disabled" />
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()
const isSaving = ref(false)
const inputTxt = ref('')
const emit = defineEmits(["input:post"])

const btnTxt = computed(() => isSaving.value ? 'Saving...' : 'Save')
const disabled = computed(() => isSaving.value)

const handleInput = (event: InputEvent) => {
    const value = (event.target as HTMLInputElement).value
    if (!value) return
    emit("input:post", value)
    inputTxt.value = value
}

const onSubmit = () => {
    isSaving.value = true
    const postObj = { text: inputTxt.value };
    store.dispatch('modulePost/addPost', postObj).then(() => {
        isSaving.value = false;
        inputTxt.value = '';
        router.push('/posts');
    });
}
</script>

<style scoped>
input {
    margin: 1rem 0;
}
</style>