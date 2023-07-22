import axiosApi from "./axoisApiConfiguratins";

export const GetCategories = async () => {
    const { data } = await axiosApi.get('/categories')
    // console.log(data)
    return data
}
