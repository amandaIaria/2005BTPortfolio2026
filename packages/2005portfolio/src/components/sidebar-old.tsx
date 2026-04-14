import { cn, ScrollArea } from '@general/components';
import {
  GithubLogo,
  LinkedinLogo,
  Butterfly,
  Globe,
  Envelope,
} from '@phosphor-icons/react';

export function SidebarOld({
  className,
  ...props
}: React.ComponentProps<'aside'>) {
  return (
    <aside
      data-component="sidebar-old"
      className={cn('grid grid-rows-[auto_1fr] gap-4 h-full border p-4', className)}
      {...props}
    >
      <div className="overflow-hidden">
        <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:3nnvzjziqrrgrsyts2wa6djt/bafkreia4a5x25cq4x5usyciqvuknxmw2ovpkrb3kwxyjidktvstorjowcq" alt="" className="w-full h-auto object-cover aspect-square border" />
      </div>
      <ScrollArea className="-mx-4 ">
        <div className="px-4 -mx-4">
          <div className="px-4 bg-accent py-2 uppercase  ">Stats</div>
          <ul className="grid gap-2 mt-2 text-sm px-4">
            <li><strong>Name</strong> Alex</li>
            <li><strong>Name</strong> Alex</li>
            <li><strong>Name</strong> Alex</li>
            <li><strong>Name</strong> Alex</li>
            <li><strong>Name</strong> Alex</li>
            <li><strong>Name</strong> Alex</li>
            <li><strong>Name</strong> Alex</li>

          </ul>
        </div>
        <div className="px-4 -mx-4 mt-4">
          <div className="bg-accent  py-2 uppercase px-4">Socials</div>
          <ul className="grid gap-2 px-4 mt-2 text-sm">
            <li className="flex items-center gap-2"><GithubLogo fill='true' size={16} /> GitHub</li>
            <li className="flex items-center gap-2"><LinkedinLogo size={16} /> LinkedIn</li>
            <li className="flex items-center gap-2"><Butterfly size={16} /> Bluesky</li>
            <li className="flex items-center gap-2"><Globe size={16} /> Website</li>
            <li className="flex items-center gap-2"><Envelope size={16} /> Email</li>
          </ul>
        </div>
      </ScrollArea>
    </aside>
  );
}
