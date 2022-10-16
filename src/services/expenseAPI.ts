import axios from "axios"

const getAll = async () => {
    const response = await axios.get("http://localhost:3010/notes");
    return response.data
}

export default {getAll}