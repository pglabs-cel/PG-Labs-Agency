import { Contact, IContact } from "../models/contact.model";

export interface CreateContactDTO {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export class ContactService {
  public static async createInquiry(data: CreateContactDTO): Promise<IContact> {
    const contact = new Contact({
      name: data.name,
      email: data.email,
      company: data.company || "",
      projectType: data.projectType,
      budget: data.budget || "",
      message: data.message,
      status: "new",
    });

    return await contact.save();
  }

  public static async getAllInquiries(limit = 50, skip = 0): Promise<IContact[]> {
    return await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}