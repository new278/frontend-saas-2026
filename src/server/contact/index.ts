import envConfig from "@/src/config";
import { ContactForm } from "@/src/modules/shared/ContactModal";
import axios from "axios";


type AxiosLikeError = { response?: { data?: { message?: string } } };

export const createContact = async (formData: ContactForm): Promise<unknown> => {
  try {
    const { data } = await axios.post(`${envConfig.backendURL}/platform-service/contact-us`, formData);
    return data;
  } catch (error: unknown) {
    const msg = (error as AxiosLikeError)?.response?.data?.message ?? String(error) ?? "Failed to create contact";
    throw new Error(msg);
  }
};
