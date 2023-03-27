/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Posit Software, PBC. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./consoleInstanceMenuButton';
import * as React from 'react';
import { IAction } from 'vs/base/common/actions';
import { ActionBarMenuButton } from 'vs/platform/positronActionBar/browser/components/actionBarMenuButton';
import { usePositronConsoleContext } from 'vs/workbench/contrib/positronConsole/browser/positronConsoleContext';

/**
 * ConsoleInstanceMenuButton component.
 * @returns The rendered component.
 */
export const ConsoleInstanceMenuButton = () => {
	// Hooks.
	const positronConsoleContext = usePositronConsoleContext();

	// Builds the actions.
	const actions = () => {
		// Build the actions for the available console repl instances.
		const actions: IAction[] = [];
		positronConsoleContext.positronConsoleInstances.map(positronConsoleInstance => {
			actions.push({
				id: positronConsoleInstance.runtime.metadata.runtimeId,
				label: `${positronConsoleInstance.runtime.metadata.runtimeName} ${positronConsoleInstance.runtime.metadata.languageVersion}`,
				tooltip: '',
				class: undefined,
				enabled: true,
				run: () => {
					positronConsoleContext.languageRuntimeService.activeRuntime =
						positronConsoleInstance.runtime;
				}
			});
		});

		// Done. Return the actions.
		return actions;
	};

	// Render.
	return (
		<ActionBarMenuButton
			text={positronConsoleContext.activePositronConsoleInstance?.runtime.metadata.languageName ?? 'None'}
			actions={actions}
		/>
	);
};