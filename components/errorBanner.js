import React from "react";

export const ErrorBanner = (props) => (
<div className="bg-red-600">
  <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between flex-wrap">
      <div className="w-0 flex-1 flex items-center">
        <p className="ml-3 font-medium text-white truncate">
          <span>
            Error: {props.errorText}
          </span>
        </p>
      </div>
      <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
        <button onClick={() => props.resetLocation()} type="button" className="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
          <span className="sr-only">Dismiss</span>
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
);

export default ErrorBanner;
