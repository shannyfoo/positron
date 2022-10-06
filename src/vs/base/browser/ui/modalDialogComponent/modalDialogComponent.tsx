/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RStudio, PBC.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./modalDialogComponent';
const React = require('react');
import { useCallback, useEffect } from 'react';

/**
 * Grossness.
 */
interface DocumentKeyboardEvent extends globalThis.KeyboardEvent { }

/**
 * ModalDialogComponentProps interface.
 */
export interface ModalDialogComponentProps {
	width: number;
	height: number;
	enter?: () => void;
	escape?: () => void;
}

/**
 * ModalDialogComponent component.
 * @param props A ModalDialogComponentProps that contains the modal dialog component properties.
 */
export function ModalDialogComponent<T>(props: ModalDialogComponentProps & { children: React.ReactNode }) {
	// Memoize the keydown event handler.
	const keydownHandler = useCallback((event: DocumentKeyboardEvent) => {
		// Eat all keydown events.
		event.preventDefault();
		event.stopPropagation();

		// Handle the event.
		switch (event.key) {
			case 'Enter':
				props.enter?.();
				break;
			case 'Escape':
				props.escape?.();
				break;
		}
	}, []);

	// Add the keydown event listener.
	useEffect(() => {
		const KEYDOWN = 'keydown';
		document.addEventListener(KEYDOWN, keydownHandler, false);
		return () => {
			document.removeEventListener(KEYDOWN, keydownHandler, false);
		};
	}, []);

	// Render.
	return (
		<div className='monaco-modal-dialog-shadow-container'>
			<div className='monaco-modal-dialog-box' role='dialog' tabIndex={-1}>
				<div className='monaco-modal-dialog-box-frame' style={{ width: props.width, height: props.height }}>
					{props.children}
				</div>
			</div>
		</div>
	);
}
