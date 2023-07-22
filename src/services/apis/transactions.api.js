import axiosApi from "./axoisApiConfiguratins";

export const GetTransactions = async () => {
    const { data } = await axiosApi.get('/transactions')
    console.log("returned data",data)
    return data
}
export const DeleteTransaction = async (id) => {
    await axiosApi.delete(`/transactions/${id}`)
} 

export const EditTransaction = async (id,newData) => {
    await axiosApi.put(`/transactions/${id}`,newData)
} 
export const PostTransaction = async (newData) => {
    await axiosApi.post(`/transactions`,newData)
} 

