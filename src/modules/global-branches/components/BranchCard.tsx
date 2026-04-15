"use client";

// lucide-react icons not used in this component — keep inline svgs for social icons

function IconFacebook() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="0" aria-hidden="true">
      <path d="M13.5 22V13.5h2.5l.4-3.2h-2.9V8.3c0-.9.25-1.5 1.55-1.5h1.65V4.1c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.92 1.42-3.92 4.03v2.25H9.5V13.5h2V22h2z" fill="currentColor" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="0" aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM18.5 6.4a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" fill="currentColor" />
    </svg>
  )
}

function IconTwitter() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="0" aria-hidden="true">
      <path d="M20 7.5c-.55.25-1.13.42-1.75.5.63-.38 1.12-.98 1.35-1.7-.6.36-1.27.63-1.98.78C17.17 6.2 16.26 5.75 15.25 5.75c-1.47 0-2.66 1.2-2.66 2.66 0 .21.02.42.07.62-2.22-.11-4.19-1.18-5.51-2.8-.23.38-.36.82-.36 1.29 0 .9.46 1.69 1.16 2.16-.48-.02-.93-.15-1.33-.37v.04c0 1.29.92 2.36 2.14 2.61-.22.06-.45.09-.69.09-.17 0-.34-.02-.5-.05.34 1.06 1.33 1.83 2.51 1.84C9.3 15.9 8 16.5 6.57 16.5c-.27 0-.53-.02-.79-.05 1.5.96 3.28 1.52 5.2 1.52 6.24 0 9.65-5.17 9.65-9.65v-.44c.66-.48 1.23-1.08 1.68-1.76-.6.27-1.25.46-1.92.54z" fill="currentColor" />
    </svg>
  )
}

function IconYoutube() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="0" aria-hidden="true">
      <path d="M21.6 7.2s-.2-1.6-.82-2.3c-.78-.84-1.66-.84-2.06-.9C15.5 3.6 12 3.6 12 3.6s-3.5 0-6.72.36c-.4.06-1.28.06-2.06.9C2.6 5.6 2.4 7.2 2.4 7.2S2 9 2 10.8v2.4C2 16 2.4 17.8 2.4 17.8s.2 1.6.82 2.3c.78.84 1.8.81 2.26.9 1.64.18 6.34.36 6.34.36s3.5 0 6.72-.36c.4-.06 1.28-.06 2.06-.9.62-.68.82-2.3.82-2.3s.4-1.8.4-3.6v-2.4c0-1.8-.4-3.6-.4-3.6z" fill="currentColor" />
    </svg>
  )
}

export default function BranchCard({
  branchName,
  address,
  phone,
  emailAddress,
  workingHours,
  services,
}: {
  branchName: string;
  address: string;
  phone: string;
  emailAddress: string | null;
  workingHours: string;
  services: string[];
}) {
  return (
    <div className="bg-blue-50 rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{branchName}</h3>
        <p className="text-sm text-gray-600 mb-4">{address}</p>

        <div className="text-sm text-gray-700 space-y-2">
          <p><span className="font-semibold">Phone:</span> {phone}</p>
          {emailAddress && <p><span className="font-semibold">Email:</span> {emailAddress}</p>}
          <p><span className="font-semibold">Working Hours:</span> {workingHours}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Services:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </div>

   
    </div>
  );
}
