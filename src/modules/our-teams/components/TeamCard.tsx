"use client";

import FormatDate from "@/src/utils/FormatDate";


function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.5 22V13.5h2.5l.4-3.2h-2.9V8.3c0-.9.25-1.5 1.55-1.5h1.65V4.1c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.92 1.42-3.92 4.03v2.25H9.5V13.5h2V22h2z" fill="white" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="0" aria-hidden="true">
      <path d="M6.94 9.5H4.94v8.5h2V9.5zM5.94 7.95a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1zM20 18.5h-2v-4.25c0-2.15-2.75-1.98-2.75 0V18.5h-2v-8.5h2v1.1c.93-1.72 4.75-1.85 4.75 1.64V18.5z" fill="white" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="0" aria-hidden="true">
      <path d="M20 7.5c-.55.25-1.13.42-1.75.5.63-.38 1.12-.98 1.35-1.7-.6.36-1.27.63-1.98.78C17.17 6.2 16.26 5.75 15.25 5.75c-1.47 0-2.66 1.2-2.66 2.66 0 .21.02.42.07.62-2.22-.11-4.19-1.18-5.51-2.8-.23.38-.36.82-.36 1.29 0 .9.46 1.69 1.16 2.16-.48-.02-.93-.15-1.33-.37v.04c0 1.29.92 2.36 2.14 2.61-.22.06-.45.09-.69.09-.17 0-.34-.02-.5-.05.34 1.06 1.33 1.83 2.51 1.84C9.3 15.9 8 16.5 6.57 16.5c-.27 0-.53-.02-.79-.05 1.5.96 3.28 1.52 5.2 1.52 6.24 0 9.65-5.17 9.65-9.65v-.44c.66-.48 1.23-1.08 1.68-1.76-.6.27-1.25.46-1.92.54z" fill="white" />
    </svg>
  );
}

export default function TeamCard({
  firstName,
  lastName,
  position,
  department,
  bio,
  photoUrl,
  linkedinUrl,
  employeeId,
  salary,
  hireDate,
  createdAt,
  updatedAt,
}: {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  bio: string;
  photoUrl: string | null;
  linkedinUrl: string;
  employeeId: string;
  salary: string;
  hireDate: string | null;
  createdAt: string;
  updatedAt: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-gray-600">{position || department}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">{bio}</p>

        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p><strong>Email:</strong> {employeeId}</p>
          <p><strong>Salary:</strong> ${salary}</p>
          {hireDate && <p><strong>Hire Date:</strong> {hireDate}</p>}
          <p><strong>Created At:</strong> {FormatDate(createdAt)}</p>
          <p><strong>Updated At:</strong> {FormatDate(updatedAt)}</p>
        </div>

        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:underline text-sm"
          >
            View LinkedIn Profile
          </a>
        )}
      </div>
    </div>
  );
}
