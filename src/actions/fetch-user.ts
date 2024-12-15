"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function fetchUser() {
  const { sessionClaims } = await auth();
  const clek = await clerkClient();

  console.log(sessionClaims);

  const res = await clek.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  console.log(res);

  const users = res.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));

  return users;
}
