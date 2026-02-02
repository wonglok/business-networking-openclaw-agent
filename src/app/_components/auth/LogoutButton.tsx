import { auth } from "@/server/better-auth";
import { DoorOpen } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export function LogoutButton() {
  return (
    <>
      <form>
        <button
          className="flex cursor-pointer rounded-full"
          formAction={async () => {
            "use server";
            await auth.api.signOut({
              headers: await headers(),
            });
            redirect("/");
          }}
        >
          <DoorOpen></DoorOpen>
        </button>
      </form>
    </>
  );
}

//

//
