import { createStore } from "vuex";
import axios from "axios";


const savedState = localStorage.getItem('vuexState');
localStorage.removeItem('vuexState');
const state = savedState ? JSON.parse(savedState) : {
    questions: [],
    searchisLoading: false,
    tempQuestion: {},
    questionisLoading: false
};

const getters = {
}

const mutations = {
    setQuestions(state, questions) {
        state.questions = questions
    },
    setTempQuestion(state, question) {
        state.tempQuestion = question
    },
    setSearchisLoading(state, isLoading) {
        state.searchisLoading = isLoading
    }

}

const actions = {
    async search({ commit }, searchData) {
        commit("setSearchisLoading", true);
        await axios
            .post("/search/", searchData)
            .then((res) => {
                console.log(res);
                commit("setQuestions", res.data);
                showMessage(res, true)
            })
            .catch((err) => {
                console.log("actions.search error")
                console.log(err);
            });
        commit("setSearchisLoading", false);
    },
    async getQuestion({ commit }, id) {
        commit("setSearchisLoading", true);
        await axios
            .post("/question/getquestion/",{"questionId":id})
            .then((res) => {
                console.log(res);
                commit("setTempQuestion", res.data[0]);
                showMessage(res, true)
            })
            .catch((err) => {
                console.log("actions.getQuestion error")
                console.log(err);
            });
        commit("setSearchisLoading", false);
    }


}





const store = createStore({
    state,
    getters,
    mutations,
    actions
})

// window.addEventListener('beforeunload', () => {
//     localStorage.setItem('vuexState', JSON.stringify(store.state));
//     store.commit('setQuestions', []);
// });

export default store