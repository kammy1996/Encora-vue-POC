import { createStore } from 'vuex'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_API_KEY);

const store = createStore({
    state: {
        quizList: [],
      // Define your state properties here
    },
    mutations: {
        storeQuizList(state, payload) { 
            state.quizList = payload;
        }
    },
    actions: {
        getQuizList : async (context) => { 
            try {
                const { data }= await supabase
                .from('quiz_list')
                .select('*')

                if(data) { 
                    context.commit(`storeQuizList`,data)
                    return data;
                }
            } catch (error) {
                console.log("🚀 ~ file: store.js:23 ~ getQuizList: ~ error:", error)
            }
        },
        addQuiz : async(context,payload) => { 
            try {
                const { status } = await supabase
                .from('quiz_list')
                .insert([payload])
                return status;
               
            } catch (error) {
                console.log("🚀 ~ file: store.js:27 ~ addQuiz:async ~ error:", error)   
            }
        }
      // Define your actions here
    },

    getters: {
      getQuizList : (state) => { 
        return state.quizList;
      }
    }
    
  })

export default store;