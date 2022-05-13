import axios from "axios";

export const api = {
	parseNames: () => {
		return axios.get('names.json');
	}
}
