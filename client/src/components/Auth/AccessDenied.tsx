import { useSearchParams } from 'react-router-dom';
import { ThemeSelector } from '@librechat/client';
import { useLocalize } from '~/hooks';

function AccessDenied() {
  const localize = useLocalize();
  const [searchParams] = useSearchParams();
  const blockedIp = searchParams.get('ip') || '';

  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <div className="mt-6 h-10 w-full bg-cover">
        <img
          src="assets/logo.svg"
          className="h-full w-full object-contain"
          alt="LibreChat"
        />
      </div>
      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>

      <div className="flex flex-grow items-center justify-center">
        <div className="w-authPageWidth overflow-hidden bg-white px-6 py-4 dark:bg-gray-900 sm:max-w-md sm:rounded-lg">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                className="h-8 w-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
            <h1
              className="mb-4 text-center text-3xl font-semibold text-black dark:text-white"
              style={{ userSelect: 'none' }}
            >
              {localize('com_access_denied_title')}
            </h1>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {localize('com_access_denied_message')}
            </p>
            {blockedIp && (
              <p className="mb-4 rounded-md bg-gray-100 px-4 py-2 font-mono text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {localize('com_access_denied_ip', blockedIp)}
              </p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {localize('com_access_denied_contact')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-2 text-[10px] text-gray-600 dark:text-gray-400 md:pb-0">
        <a
          href="https://librechat.ai"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          LibreChat
        </a>
      </div>
    </div>
  );
}

export default AccessDenied;
