import { Contact, IContact } from "../models/contact.model";

export interface CreateContactDTO {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
}

export class ContactService {
  public static async createInquiry(data: CreateContactDTO): Promise<IContact> {
    const contact = new Contact({
      name: data.name,
      email: data.email,
      company: data.company || "",
      projectType: data.projectType,
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

  public static async getInquiriesWithStats(
    statusFilter?: string,
    limit = 100,
    skip = 0
  ): Promise<{
    inquiries: IContact[];
    stats: {
      total: number;
      new: number;
      contacted: number;
      inProgress: number;
      archived: number;
    };
  }> {
    const query = statusFilter && statusFilter !== "all" ? { status: statusFilter } : {};

    const [inquiries, total, newCount, contactedCount, inProgressCount, archivedCount] =
      await Promise.all([
        Contact.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        Contact.countDocuments(),
        Contact.countDocuments({ status: "new" }),
        Contact.countDocuments({ status: "contacted" }),
        Contact.countDocuments({ status: "in-progress" }),
        Contact.countDocuments({ status: "archived" }),
      ]);

    return {
      inquiries,
      stats: {
        total,
        new: newCount,
        contacted: contactedCount,
        inProgress: inProgressCount,
        archived: archivedCount,
      },
    };
  }

  public static async updateStatus(
    id: string,
    status: "new" | "contacted" | "in-progress" | "completed" | "archived"
  ): Promise<IContact | null> {
    return await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).exec();
  }

  public static async deleteInquiry(id: string): Promise<boolean> {
    const result = await Contact.findByIdAndDelete(id).exec();
    return result !== null;
  }
}