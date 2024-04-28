import { getCourseDetails , getCoursesRelated} from "./funcs/shared.js";

window.addEventListener('load', () => {
    getCourseDetails();
    getCoursesRelated().then(data => {
        console.log(data)
    })
})