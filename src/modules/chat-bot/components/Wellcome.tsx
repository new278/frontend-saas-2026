import { BsBroadcast } from "react-icons/bs";

export const WelcomeHeader = () => (
  <div className="mb-4 flex flex-col items-start justify-center gap-4 rounded-t-lg bg-primary p-10 text-base-100">
    <div className="flex items-end space-x-2">
      <BsBroadcast />
      <h1 className="text-lg font-bold text-base-100">Hello,</h1>
    </div>
    <h2 className="text-base text-base-100">
      Hello, Welcome to our live chat! If you need to talk to us, you can get a
      quick response through the Live Chat feature. Its fast and secure, and the
      team is available 24/7.
    </h2>
  </div>
);
