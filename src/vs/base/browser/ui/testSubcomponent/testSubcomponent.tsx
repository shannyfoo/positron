/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RStudio, PBC.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./testSubcomponent';
const React = require('react');
import { useEffect, useState } from 'react';

// TestSubcomponentProps interface.
interface TestSubcomponentProps {
	message: string;
}

// TestSubcomponent component.
const TestSubcomponent = (props: TestSubcomponentProps) => {
	// Hooks.
	const [time, setTime] = useState<string>('Loading time...');
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleString());
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	// Render.
	return (
		<div className='test-subcomponent' >
			<div>
				TestSubcomponent
			</div>
			<div>
				Message: {props.message} Time: {time}
			</div>
		</div>
	);
};

// Export the TestSubcomponent component.
export default TestSubcomponent;
