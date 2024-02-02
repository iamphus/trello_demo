<template>
    <div class="my-board flex m-0">
        <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="board flex-1 rounded p-3 mx-3"
            @drop="drop(columnIndex)" @dragover.prevent="allowDrop">
            <h2 class="text-lg font-semibold mb-2">{{ column.title }}</h2>
            <MyCard v-for="(card, cardIndex) in column.cards" :key="cardIndex" :card="card"
                @add-task="addTask(columnIndex, cardIndex)" @delete-task="deleteTask(columnIndex, cardIndex)"
                @drag-start="dragStart(card, columnIndex)" :addingCard="column.addingCard" 
                @edit-card="handleEditCard(columnIndex, cardIndex)"/>
            <div class="mx-4">
                <div v-if="column.addingCard">
                    <input v-model="column.newCardTitle" placeholder="" class="border border-gray-300 p-2 rounded my-3" />
                    <button @click="saveNewCard(columnIndex)" class="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                    <button @click="cancelAddCard(columnIndex)" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                        Cancel
                    </button>
                </div>
                <font-awesome-icon v-else :icon="['fas', 'plus']" @click="toggleAddingCard(columnIndex)"
                    class="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" />


            </div>
        </div>
    </div>
</template>

<script>
import MyCard from "./MyCard.vue";


export default {
    data() {
        return {
            columns: JSON.parse(localStorage.getItem("columns")) || [
                { title: "To-Do", cards: [], addingCard: false, newCardTitle: "" },
                { title: "Research", cards: [], addingCard: false, newCardTitle: "" },
                {
                    title: "In Progress",
                    cards: [],
                    addingCard: false,
                    newCardTitle: "",
                },
                { title: "Review", cards: [], addingCard: false, newCardTitle: "" },
                { title: "Done", cards: [], addingCard: false, newCardTitle: "" },
            ],
            draggedCard: null,
        };
    },
    components: {
        MyCard,
    },
    methods: {
        toggleAddingCard(columnIndex) {
            this.columns[columnIndex].addingCard = true;
        },
        saveNewCard(columnIndex) {
            const { newCardTitle } = this.columns[columnIndex];
            if (newCardTitle.trim() !== "") {
                const newCard = { title: newCardTitle, tasks: [] };
                this.columns[columnIndex].cards.push(newCard);
                this.columns[columnIndex].newCardTitle = "";
                this.columns[columnIndex].addingCard = false;
                this.saveToLocalStorage();
            }
        },
        cancelAddCard(columnIndex) {
            this.columns[columnIndex].newCardTitle = "";
            this.columns[columnIndex].addingCard = false;
        },
        addTask(columnIndex, cardIndex, taskTitle) {
            if (taskTitle !== null) {
                this.columns[columnIndex].cards[cardIndex].tasks.push({
                    title: taskTitle,
                });
                this.saveToLocalStorage();
            }
        },
        deleteTask(columnIndex, cardIndex, taskIndex) {
            this.columns[columnIndex].cards[cardIndex].tasks.splice(taskIndex, 1);
            this.saveToLocalStorage();
        },
        dragStart(card, columnIndex) {
            this.draggedCard = { card, columnIndex };
        },
        allowDrop(event) {
            event.preventDefault();
        },
        drop(columnIndex) {
            if (this.draggedCard) {
                const { card, columnIndex: originalColumnIndex } = this.draggedCard;
                this.columns[originalColumnIndex].cards = this.columns[
                    originalColumnIndex
                ].cards.filter((c) => c !== card);
                this.columns[columnIndex].cards.push(card);
                this.draggedCard = null;
                this.saveToLocalStorage();
            }
        },
        handleEditCard(columnIndex,cardIndex){
            return({newTitle}) => {
                this.columns[columnIndex].card[cardIndex].title = newTitle;
                this.saveToLocalStorage();
            }
        },
        saveToLocalStorage() {
            localStorage.setItem("columns", JSON.stringify(this.columns));
        },
    },
};
</script>

<style scoped>
.my-board {
    display: flex;
}

.column {
    flex: 1;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.board {
    margin-top: 2rem;
    background-color: lavender;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    max-height: 100%;
    flex-direction: column;
    align-self: start;
    padding-bottom: 8px;
    position: relative;
    scroll-margin: 8px;
    white-space: normal;
    width: 272px;
    box-sizing: border-box;
    vertical-align: top;
}
</style>
