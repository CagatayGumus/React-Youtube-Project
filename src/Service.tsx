import axios from "axios";

const url = 'AIzaSyApDRj_CwHppPkjKxyzT5Md0bWrDPfyFh8'

const service = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',   

    

})

export function getYoutube(text:string) {
    const params = {
        key:url,
        part:'snippet',
        q: text,
        type: "video"
    }
    return service.get("search", {params:params})
}