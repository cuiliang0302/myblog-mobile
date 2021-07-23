import {createStore} from 'vuex'
import mutations from '@/store/mutations'
import action from '@/store/action'
import module from '@/store/module'
import state from "@/store/state";
import createVuexAlong from 'vuex-along'

export default createStore({
	state,
	mutations,
	action,
	module,
	plugins: [
		createVuexAlong({
			local: {
				list: ["font", "dark", "userLocal", "keepLogin"],
			},
			session: {
				list: ["userSession", "nextPath", "themeStyle"],
			}
		})
	]
})
