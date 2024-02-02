<template>
    <div class="my-card" draggable="true" @dragstart="dragStart">
        <div class="options">
            <button class="options-button" @click="toggleOptions" v-if="!editing">
                <font-awesome-icon :icon="['fas', 'ellipsis']" />
            </button>
            <div v-if="showOptions && !editing" class="options-menu z-40">
                <button @click="toggleEditing">
                     Edit
                </button>
                <button @click="deleteCard">
                     Delete
                </button>
            </div>
        </div>
        <h3>{{ card.title }}</h3>
        <div v-if="editing">
            <input v-model="editedTitle" placeholder="New card title"
                class="border border-gray-300 p-2 rounded my-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
            <button @click="saveEdit" class="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            <button @click="cancelEdit" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        card: Object,
    },
    data() {
        return {
            editing: false,
            editedTitle: '',
            showOptions: false,
        };
    },
    methods: {
        toggleEditing() {
            this.editing = !this.editing;
            this.showOptions = this.editing;
        },
        saveEdit() {
            if (this.editedTitle.trim() !== '') {
                this.$emit('edit-card', { card: this.card, newTitle: this.editedTitle });
                this.editing = false;
                this.showOptions = false;
            }
        },
        cancelEdit() {
            this.editing = false;
            this.showOptions = false;
        },
        deleteCard() {
            this.$emit('delete-card', this.card);
            this.showOptions = false;
        },
        dragStart() {
            this.$emit('drag-start');
        },
        toggleOptions() {
            this.showOptions = !this.showOptions;
        },
    },
};
</script>
  
<style scoped>
.my-card {
    position: relative;
    margin: 10px;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: white;
    transition: border-color 0.3s ease;
}

.my-card:hover {
    border-color: skyblue;
}

.options {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
}

.options-button {
    background: none;
    border: none;
    cursor: pointer;
}

.options-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: none;

}

.my-card:hover .options-menu {
    display: flex;
}

.options-menu button {
    padding: 8px;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
}

.options-menu button:hover {
    background-color: #f0f0f0;
}
</style>
  