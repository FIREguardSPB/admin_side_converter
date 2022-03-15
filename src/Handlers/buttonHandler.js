import {createJsonFile} from "../Controllers/createJsonFile";

export const buttonHandler = async (data) => {
  return async (e) => {
    e.preventDefault()
    await createJsonFile(data)
  }
}