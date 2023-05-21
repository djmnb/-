import { createStore } from "vuex";
import axios from "axios";



const savedState = localStorage.getItem('vuexState');
localStorage.removeItem('vuexState');
const state = savedState ? JSON.parse(savedState) : {
    searchQuestions: [],
    isLoading: false,
    singelQuestion: [],
    allQuestions: [],
    myQuestions: [],
    searchHistoryList: [],
    allQuestionTotal: 0,
    myQuestionTotal: 0,
    historyTotal: 0,
    userInfo:null,

};

const getters = {
}

const mutations = {

    setIsLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setSearchQuestions(state, searchQuestions) {
        state.searchQuestions = searchQuestions
    },
    setSingelQuestion(state, singelQuestion) {
        state.singelQuestion = singelQuestion
    },
    setAllQuestions(state, allQuestions) {
        state.allQuestions = allQuestions
    },
    setMyQuestions(state, myQuestions) {
        state.myQuestions = myQuestions
    },
    setSearchHistoryList(state, searchHistoryList) {
        state.searchHistoryList = searchHistoryList
    },
    setAllQuestionTotal(state, allQuestionTotal) {
        state.allQuestionTotal = allQuestionTotal
    },
    setMyQuestionTotal(state, myQuestionTotal) {
        state.myQuestionTotal = myQuestionTotal
    },
    setHistoryTotal(state, historyTotal) {
        state.historyTotal = historyTotal
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
    


}


const actions = {
    async search({ commit }, searchData) {
        commit("setIsLoading", true);
        await axios
            .post("/search/", searchData)
            .then((res) => {
                console.log(res);
                commit("setSearchQuestions", res.data);
                showMessage(res, true)
            })
            .catch((err) => {
                console.log("actions.search error")
                console.log(err);
            });
        commit("setIsLoading", false);
    },
    async uploadQuestion({ commit }, questionData) {
        commit("setIsLoading", true);
        await axios.post("/question/uploadquestion/", questionData).then((res) => {
            showMessage(res)
        }).catch((err) => {
            console.log("actions.addQuestion error")
            console.log(err);
        });
        commit("setIsLoading", false);
    },
    async getQuestion({ commit }, data) {
        commit("setIsLoading", true);
        await axios
            .post("/question/getquestion/", data)
            .then((res) => {
                console.log(res);
                switch (res.getType) {
                    case "ALL_QUESTION":
                        commit("setAllQuestions", res.data);
                        commit("setAllQuestionTotal", res.total);
                        break;
                    case "MY_QUESTION":
                        commit("setMyQuestions", res.data);
                        commit("setMyQuestionTotal", res.total);
                        break;
                    case "SINGEL_QUESTION":
                        commit("setSingelQuestion", res.data);
                        break;
                    default:
                        break;
                }

                showMessage(res, true)
            })
            .catch((err) => {
                console.log("actions.getQuestion error")
                console.log(err);
            });
        commit("setIsLoading", false);
    },
    async getHistory({ commit }, data) {
        commit("setIsLoading", true);
        await axios
            .post("/question/gethistory/", data)
            .then((res) => {
                console.log(res);
                commit("setSearchHistoryList", res.data);
                commit("setHistoryTotal", res.total);
                showMessage(res, true)
            })
            .catch((err) => {
                console.log("actions.getHistory error")
                console.log(err);
            });
        commit("setIsLoading", false);
    },
    async getUserInfo({ commit }, data) {
        commit("setIsLoading", true);
        await axios
            .post("/user/getuserinfo/", data)
            .then((res) => {
                console.log(res);
                commit("setUserInfo", res.data);
                showMessage(res, true)
            })
            .catch((err) => {
                console.log("actions.getUserInfo error")
                console.log(err);
            });
        commit("setIsLoading", false);
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