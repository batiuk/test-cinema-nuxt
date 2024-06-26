import {API_BASE_URL} from "~/config";

export const useCinemaAPI: typeof useFetch = (request, opts?) => {
    return useFetch(request, { baseURL: API_BASE_URL, ...opts })
}
