/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Posit Software, PBC. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./activityErrorMessage';
import * as React from 'react';
import { OutputLines } from 'vs/workbench/contrib/positronConsole/browser/components/outputLines';
import { ActivityItemErrorMessage } from 'vs/workbench/services/positronConsole/common/classes/activityItemErrorMessage';

// ActivityErrorProps interface.
export interface ActivityErrorMessageProps {
	activityItemErrorMessage: ActivityItemErrorMessage;
}

/**
 * ActivityErrorMessage component.
 * @param props An ActivityErrorMessageProps that contains the component properties.
 * @returns The rendered component.
 */
export const ActivityErrorMessage = (props: ActivityErrorMessageProps) => {
	// Render.
	return (
		<div className='activity-error-message'>
			<OutputLines outputLines={props.activityItemErrorMessage.messageOutputLines} />
			{props.activityItemErrorMessage.tracebackOutputLines.length > 0 &&
				<div className='traceback-lines'>
					<OutputLines outputLines={props.activityItemErrorMessage.tracebackOutputLines} />
				</div>
			}
		</div>
	);
};