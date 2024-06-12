/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Posit Software, PBC. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';

export type ValidatorFn = (value: string | number) => (string | undefined) | Promise<string | undefined>;

/**
 * A hook to debounce the validation of input values.
 * @param validator The function to validate the input value. Can be synchronous or asynchronous.
 */
export function useDebouncedValidator({ validator, value, debounceDelayMs = 100 }: { validator?: ValidatorFn; value: string | number; debounceDelayMs?: number }) {
	const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);

	const callbackTimeoutRef = React.useRef<NodeJS.Timeout | undefined>();

	const clearCallbackTimeout = React.useCallback(() => {
		if (!callbackTimeoutRef.current) { return; }
		clearTimeout(callbackTimeoutRef.current);
	}, []);

	React.useEffect(() => {
		if (!validator) { return; }

		clearCallbackTimeout();
		// Variable to track if the currently running validation is disposed or no-longer-needed and
		// thus should be ignored once it completes.
		let isDisposed = false;

		callbackTimeoutRef.current = setTimeout(() => {
			const res = validator(value);
			if (res instanceof Promise) {
				res.then((msg) => {
					// Dont set the error message if the component is disposed.
					if (isDisposed) { return; }
					setErrorMsg(msg);
				});
			} else {
				setErrorMsg(res);
			}
		}, debounceDelayMs);

		return () => {
			isDisposed = true;
			clearCallbackTimeout();
		};
	}, [clearCallbackTimeout, validator, value, debounceDelayMs]);

	return errorMsg;
}
