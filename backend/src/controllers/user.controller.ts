import { getHMCOrganization } from "../models/organization.model";
import { Users } from "../models/user.model";

export async function getOrCreateUser(id: string, displayName: string, email: string) {
  let user = await Users.findOne({ googleId: id });

  if (!user) {
    user = new Users({
      googleId: id,
      displayName: displayName,
      email: email,
      organization: await getHMCOrganization()
    });
    await user.save();
  } else {
    // Update the user if necessary
    user.displayName = displayName;
    user.email = email;
    await user.save();
  }

  return user;
}

export async function getUserById(userId: string) {
  return Users.findById(userId);
}
