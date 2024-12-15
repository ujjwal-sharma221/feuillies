import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AnimatedAtSignIcon from "@/components/animated-at-sign";
import { Separator } from "@/components/ui/separator";

export function Inbox() {
  return (
    <ClientSideSuspense
      fallback={
        <Button disabled variant="ghost" size="icon" className="relative">
          <AnimatedAtSignIcon className="size-5" />
        </Button>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
}

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <AnimatedAtSignIcon className="size-5" />
            {inboxNotifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                ></InboxNotification>
              ))}
            </InboxNotificationList>
          ) : (
            <div className="text-center text-sm text-zinc-500">
              No notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 bg-zinc-400" />
    </>
  );
};
