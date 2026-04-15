import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";

export const ChatHeader = ({
  onMinimize,
  onClose,
}: {
  onMinimize: () => void;
  onClose: () => void;
}) => (
  <div className="flex items-center justify-between rounded-t-lg bg-primary p-3">
    <div className="relative flex items-center gap-2">
      <Image
        src="/images/user.png"
        height={40}
        width={40}
        className="rounded-full border-2 border-[#FFB200]"
        alt="User"
      />
      <span className="absolute right-[108px] top-0 h-3 w-3 rounded-full bg-[#08D304]"></span>
      <span className="font-semibold text-base-100">Richard Poon</span>
    </div>
    <div className="flex items-center justify-center gap-2">
      <VscChromeMinimize
        onClick={onMinimize}
        className="cursor-pointer text-2xl font-bold text-base-100"
      />
      <button
        onClick={onClose}
        className="rounded-full text-base-100 cursor-pointer hover:border border-base-200 p-2"
        aria-label="Close chat"
      >
        <IoClose size={24} />
      </button>
    </div>
  </div>
);
