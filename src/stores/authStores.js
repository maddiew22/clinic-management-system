import {create} from "zustand";
import axios from "axios";

const authStores = create((set) => ({

    loggedIn: null,

    login: {
        email: '',
        password: '',
    },

    updateLogin: (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        set((state) => {
            return {
                login: {
                    ...state.login,
                    [name]: value,
                },
            };
        });
    },

    submitLogin: async(e) => {
        e.preventDefault();
        const {login} = authStores.getState()
        await axios.post('/login', login, {withCredentials: true});
        set({loggedIn: true});
    },

    logout: async() => {
        await axios.get('/logout', {withCredentials: true});
        set({loggedIn: false});
    },

    checkAuth: async () => {
        try {
            await axios.get('/check-auth', {withCredentials: true});
            set({loggedIn:true}); 
        } catch(err) {
            set({loggedIn: false});
        }

    }

}));

export default authStores;
