import mongoose from "mongoose";
import { TOrganization } from "shared/types/organization";

export const Organization = new mongoose.Schema<TOrganization>({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
});

export const Organizations = mongoose.model<TOrganization>("Organization", Organization);

export async function getHMCOrganization() {
  const existingOrg = await Organizations.findOne({ uuid: "hmc-org" });
  if (existingOrg) {
    return existingOrg;
  }
  const newOrg = new Organizations({
    uuid: "hmc-org",
    name: "HMC Organization",
  });
  return newOrg.save();
}
