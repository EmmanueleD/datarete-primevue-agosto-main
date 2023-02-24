<template>
  <div>
    <Card v-if="currentState == 'view'" class="mb-4 pt-2">
      <template #header>
        <h4 class="ml-2">{{ tmpQuestion.question }}</h4>
      </template>
      <template #content>
        <div v-if="tmpQuestion.answers.length > 0">
          <div
            v-for="answer of tmpQuestion.answers"
            :key="answer.id"
            class="mb-2 w-full"
          >
            {{ answer.answer }}
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-content-end">
          <Button
            @click="deleteDomanda"
            icon="pi pi-trash"
            class="p-button-danger p-button-rounded mr-2"
          ></Button>
          <Button
            @click="switchToEditMode"
            icon="pi pi-pencil"
            class="p-button-rounded"
          ></Button>
        </div>
      </template>
    </Card>
    <Card v-else-if="currentState == 'edit'" class="mb-4 pt-2">
      <template #header>
        <div class="flex flex-column ml-2">
          <div class="w-full flex justify-content-between align-center">
            <label>Domanda</label>
            <div>
              <Checkbox
                class="mr-2"
                v-model="rispostaAperta"
                :binary="true"
              ></Checkbox>
              <label>Domanda a risposta aperta</label>
            </div>
          </div>
          <InputText
            @change="eventEditQuestion"
            v-model="tmpQuestion.question"
          ></InputText>
        </div>
      </template>
      <template #content>
        <div v-if="tmpQuestion.answers.length > 0 && !rispostaAperta">
          <label calss="mb-2">Risposte</label>

          <div v-for="(answer, index) of tmpQuestion.answers" :key="index">
            <div v-if="!answer.delete" class="mb-2 w-full">
              <div class="flex justify-content-between">
                <i
                  v-if="!rispostaAperta"
                  @click="deleteOption(index)"
                  role="button"
                  class="pi pi-trash mt-3 mr-2"
                ></i>
                <InputText
                  @change="eventEditQuestion"
                  :placeholder="answer.answer"
                  v-model="answer.answer"
                  class="w-full"
                ></InputText>
              </div>
            </div>
          </div>
        </div>

        <Button
          v-if="!rispostaAperta"
          @click="addOption"
          icon="pi pi-plus"
          class="p-button-rounded p-button-outlined mt-2"
        ></Button>
      </template>
      <template #footer>
        <div class="flex justify-content-end">
          <Button
            @click="switchToViewMode"
            icon="pi pi-undo"
            class="p-button-secondary p-button-rounded mr-2"
          ></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { emit } from "process";
import { ref, watch } from "vue";
// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  question: Object,
  questionIndex: Number,
});

const rispostaAperta = ref(false);
watch(rispostaAperta, (newValue, oldValue) => {
  if (newValue) {
    tmpQuestion.value.answers = [
      {
        aperta: true,
        answer: "",
        delete: false,
      },
    ];
  }
  eventEditQuestion();
  return;
});

// eslint-disable-next-line no-undef
const emits = defineEmits(["deleteDomanda", "eventEditQuestion"]);

const tmpQuestion = ref();
tmpQuestion.value = JSON.parse(JSON.stringify(props.question));

const currentState = ref("view");

function switchToViewMode() {
  currentState.value = "view";
  tmpQuestion.value = { ...props.question };
}

function switchToEditMode() {
  currentState.value = "edit";
}

function addOption() {
  tmpQuestion.value.answers.push({
    answer: "",
    delete: false,
    tmpId: Date.now(),
  });
  eventEditQuestion();
}

function deleteDomanda() {
  let id = null;
  if (tmpQuestion.value.id) {
    id = tmpQuestion.value.id;
  } else {
    id = tmpQuestion.value.tmpId;
  }
  emits("deleteDomanda", id);
}

function deleteOption(index) {
  tmpQuestion.value.answers[index].delete = true;
  eventEditQuestion();
}

function eventEditQuestion() {
  tmpQuestion.value.questionIndex = props.questionIndex;

  if (tmpQuestion.value.answers.length > 0) {
    emits("eventEditQuestion", tmpQuestion.value);
  } else {
    tmpQuestion.value.answers = [
      {
        id: -1,
        answer: "",
        delete: false,
      },
    ];
    emits("eventEditQuestion", tmpQuestion.value);
  }
}
</script>